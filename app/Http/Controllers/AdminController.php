<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Commission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Compute the earnings breakdown for a single merchant.
     *
     * Commission is charged on every non-cancelled order (matching the app's
     * existing revenue definition). We also expose a "settled" view based on
     * Delivered orders so a merchant can see confirmed earnings vs. in-flight.
     *
     * @return array{rate: float, order_count: int, total_sales: float, commission: float, net: float, delivered_sales: float, delivered_commission: float, delivered_net: float}
     */
    private function merchantEarnings(int $merchantId): array
    {
        $rate = (float) (Commission::where('merchant_id', $merchantId)->value('rate') ?? 0);

        $productIds = Product::where('user_id', $merchantId)->pluck('id');

        $base = Order::whereIn('product_id', $productIds)
            ->whereNotIn('status', ['Cancelled', 'cancelled']);

        $orderCount = (clone $base)->count();
        $totalSales = (float) (clone $base)->sum('amount');
        $commission = round($totalSales * $rate / 100, 2);
        $net = round($totalSales - $commission, 2);

        $deliveredSales = (float) (clone $base)
            ->whereIn('status', ['Delivered', 'delivered'])
            ->sum('amount');
        $deliveredCommission = round($deliveredSales * $rate / 100, 2);

        return [
            'rate' => $rate,
            'order_count' => $orderCount,
            'total_sales' => round($totalSales, 2),
            'commission' => $commission,
            'net' => $net,
            'delivered_sales' => round($deliveredSales, 2),
            'delivered_commission' => $deliveredCommission,
            'delivered_net' => round($deliveredSales - $deliveredCommission, 2),
        ];
    }

    public function index()
    {
        $now = now();

        // Revenue only from completed/relevant orders (exclude cancelled)
        $paidOrders = Order::whereNotIn('status', ['Cancelled', 'cancelled']);
        $totalRevenue = (clone $paidOrders)->sum('amount');
        $lastMonthRevenue = (clone $paidOrders)
            ->whereBetween('created_at', [$now->copy()->subMonths(2), $now->copy()->subMonth()])
            ->sum('amount');
        $thisMonthRevenue = (clone $paidOrders)
            ->where('created_at', '>=', $now->copy()->subMonth())
            ->sum('amount');

        $totalMerchants = User::whereHas('roles', fn($q) => $q->where('name', 'merchant'))->count();
        $totalCustomers = User::whereHas('roles', fn($q) => $q->where('name', 'customer'))->count();
        $totalOrders = Order::count();
        $ordersLastHour = Order::where('created_at', '>=', $now->copy()->subHour())->count();

        // Monthly sales for the last 6 months (chart)
        $salesChart = collect(range(5, 0))->map(function ($i) use ($now) {
            $month = $now->copy()->subMonths($i);
            $value = Order::whereNotIn('status', ['Cancelled', 'cancelled'])
                ->whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->sum('amount');
            return ['name' => $month->format('M'), 'value' => round($value, 2)];
        })->values();

        // Recent activity = latest orders
        $recentActivities = Order::with('product')
            ->latest()
            ->take(6)
            ->get()
            ->map(fn($o) => [
                'user' => $o->name ?: ($o->email ?: 'Guest'),
                'action' => 'Ordered ' . ($o->product->title ?? $o->product_name ?? 'a product'),
                'time' => $o->created_at?->diffForHumans(),
            ]);

        $pct = fn($cur, $prev) => $prev > 0 ? round((($cur - $prev) / $prev) * 100, 1) : ($cur > 0 ? 100 : 0);

        return Inertia::render('Admin/Index', [
            'stats' => [
                'totalRevenue' => round($totalRevenue, 2),
                'revenueChange' => $pct($thisMonthRevenue, $lastMonthRevenue),
                'totalMerchants' => $totalMerchants,
                'totalCustomers' => $totalCustomers,
                'totalOrders' => $totalOrders,
                'ordersLastHour' => $ordersLastHour,
            ],
            'salesChart' => $salesChart,
            'recentActivities' => $recentActivities,
        ]);
    }
    public function marchantlist(Request $request)
    {
        $q = $request->input('q');

        $merchants = User::with('commission')
            ->whereHas('roles', function ($query) {
                $query->whereIn('name', ['merchant']);
            })
            ->when($q, function ($query) use ($q) {
                $query->where(function ($sub) use ($q) {
                    $sub->where('name', 'like', "%{$q}%")
                        ->orWhere('email', 'like', "%{$q}%");
                });
            })
            ->get()
            ->map(function ($merchant) {
                $earnings = $this->merchantEarnings($merchant->id);
                $merchant->commission_rate = $earnings['rate'];
                $merchant->earnings = $earnings;
                return $merchant;
            });

        // Platform-wide commission earned across all merchants
        $totalCommission = $merchants->sum(fn($m) => $m->earnings['commission']);
        $totalMerchantSales = $merchants->sum(fn($m) => $m->earnings['total_sales']);

        return Inertia::render('Admin/MarchantList', [
            'merchants' => $merchants,
            'filters' => ['q' => $q],
            'summary' => [
                'total_commission' => round($totalCommission, 2),
                'total_sales' => round($totalMerchantSales, 2),
            ],
        ]);
    }

    public function userlist(Request $request)
    {
        $q = $request->input('q');

        $users = User::whereHas('roles', function ($query) {
            $query->whereIn('name', ['customer']);
        })
            ->when($q, function ($query) use ($q) {
                $query->where(function ($sub) use ($q) {
                    $sub->where('name', 'like', "%{$q}%")
                        ->orWhere('email', 'like', "%{$q}%");
                });
            })
            ->get();

        return Inertia::render('Admin/UserList', [
            'users' => $users,
            'filters' => ['q' => $q],
        ]);
    }

    public function assignMerchant($id)
    {
        $user = User::findOrFail($id);

        // Check if user already has merchant role
        if ($user->hasRole('merchant')) {
            return back()->with('error', 'User is already a merchant.');
        }

        // Remove customer role and assign merchant role
        $user->removeRole('customer');
        $user->assignRole('merchant');

        return back()->with('success', 'User has been assigned the Merchant role.');
    }
    // Admin creates a new merchant account directly
    public function storeMerchant(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
        ]);

        $user->assignRole('merchant');

        // Optionally set an initial commission rate for this merchant
        $rate = $request->input('commission_rate');
        if ($rate !== null && $rate !== '') {
            Commission::updateOrCreate(
                ['merchant_id' => $user->id],
                ['rate' => round((float) $rate, 2)]
            );
        }

        return back()->with('success', 'Merchant account created successfully.');
    }

    // Admin sets or updates a merchant's commission rate
    public function setCommission(Request $request, $id)
    {
        $validated = $request->validate([
            'rate' => 'required|numeric|min:0|max:100',
        ]);

        $user = User::findOrFail($id);

        if (!$user->hasRole('merchant')) {
            return back()->with('error', 'Commission can only be set for merchants.');
        }

        Commission::updateOrCreate(
            ['merchant_id' => $user->id],
            ['rate' => round((float) $validated['rate'], 2)]
        );

        return back()->with('success', 'Commission rate updated.');
    }

    // Admin resets a merchant's password
    public function resetMerchantPassword(Request $request, $id)
    {
        $validated = $request->validate([
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = User::findOrFail($id);

        if (!$user->hasRole('merchant')) {
            return back()->with('error', 'This user is not a merchant.');
        }

        $user->password = Hash::make($validated['password']);
        $user->save();

        return back()->with('success', 'Merchant password has been reset.');
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        // Safety: never allow deleting an admin account from here
        if ($user->hasRole('admin')) {
            return back()->with('error', 'Admin accounts cannot be deleted.');
        }

        $user->delete();

        return back()->with('success', 'User has been deleted.');
    }

    public function takeOverMerchantRole($id)
    {
        // dd($id);
        $user = User::findOrFail($id);

        if (!$user->hasRole('merchant')) {
            return response()->json(['message' => 'User is not a merchant.'], 400);
        }

        // Remove merchant role & assign customer role
        $user->syncRoles(['customer']);

        return back()->with('success', 'Merchant role removed, user is now a customer.');
    }
    public function allorders()
    { $orders = Order::with(['product.merchant'])
        ->latest()
        ->get();
      
    //   dd($orders);
    return Inertia::render('Admin/AllOrders', [
        'orders' => $orders
    ]);
    }

    // Category management (admin)
    public function categories()
    {
        return Inertia::render('Admin/Categories', [
            'categories' => Category::latest()->get(),
        ]);
    }

    public function storeCategory(Request $request)
    {
        $request->validate([
            'categoryName' => 'required|string|max:255',
            'categoryImg' => $request->hasFile('categoryImg')
                ? 'nullable|image|mimes:jpeg,jpg,png,webp|max:1024'
                : 'nullable|string|max:500',
        ]);

        $imagePath = $request->input('categoryImg');
        if ($request->hasFile('categoryImg')) {
            $file = $request->file('categoryImg');
            $name = 'category_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('categories'), $name);
            $imagePath = 'categories/' . $name;
        }

        Category::create([
            'categoryName' => $request->categoryName,
            'categoryImg' => $imagePath,
        ]);

        return redirect()->back()->with('success', 'Category added successfully.');
    }

    public function destroyCategory(Category $category)
    {
        $category->delete();
        return redirect()->back()->with('success', 'Category deleted successfully.');
    }

    // Single merchant details (admin)
    public function merchantDetails($id)
    {
        $merchant = User::with(['store'])
            ->whereHas('roles', function ($q) { $q->where('name', 'merchant'); })
            ->findOrFail($id);

        $products = Product::where('user_id', $id)->get();
        $productIds = $products->pluck('id');
        $orders = Order::whereIn('product_id', $productIds)->with('product')->latest()->get();

        return Inertia::render('Admin/MerchantDetails', [
            'merchant' => $merchant,
            'store' => $merchant->store,
            'products' => $products,
            'orders' => $orders,
            'productCount' => $products->count(),
            'orderCount' => $orders->count(),
            'totalSales' => $orders->sum('amount'),
            // Commission breakdown for this merchant (same figures the
            // merchant sees in their own panel).
            'earnings' => $this->merchantEarnings((int) $id),
        ]);
    }

    // Product reports (admin)
    public function productReports()
    {
        $products = Product::with('user')->get();

        $orderStats = Order::selectRaw('product_id, COUNT(*) as order_count, SUM(amount) as revenue')
            ->groupBy('product_id')
            ->get()
            ->keyBy('product_id');

        $products = $products->map(function ($p) use ($orderStats) {
            $p->order_count = $orderStats[$p->id]->order_count ?? 0;
            $p->revenue = $orderStats[$p->id]->revenue ?? 0;
            return $p;
        })->sortByDesc('revenue')->values();

        $merchantCounts = $products->groupBy('user_id')->map->count();

        return Inertia::render('Admin/ProductReports', [
            'products' => $products,
            'totalProducts' => $products->count(),
            'merchantCounts' => $merchantCounts,
            'totalRevenue' => $products->sum('revenue'),
            'totalOrders' => Order::count(),
        ]);
    }
}
