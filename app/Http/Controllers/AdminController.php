<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        // dd('admin');
        return Inertia::render('Admin/Index');
    }
    public function marchantlist()
    {
        $merchants = User::whereHas('roles', function ($query) {
            $query->whereIn('name', ['merchant']);
        })->get();
        // dd($merchants); 
        return Inertia::render('Admin/MarchantList', ['merchants' => $merchants]);
    }

    public function userlist()
    {
        $users = User::whereHas('roles', function ($query) {
            $query->whereIn('name', ['customer']);
        })->get();
        return Inertia::render('Admin/UserList', ['users' => $users]);
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
