<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\Commission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MarchantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::where('id', auth()->id())->whereHas('roles', function ($query) {
            $query->where('name', 'merchant');
        })->first();

        $now = now();
        $productIds = Product::where('user_id', auth()->id())->pluck('id');

        $ordersQuery = Order::whereIn('product_id', $productIds)
            ->whereNotIn('status', ['Cancelled', 'cancelled']);

        $totalRevenue = (clone $ordersQuery)->sum('amount');
        $lastMonthRevenue = (clone $ordersQuery)
            ->whereBetween('created_at', [$now->copy()->subMonths(2), $now->copy()->subMonth()])
            ->sum('amount');
        $thisMonthRevenue = (clone $ordersQuery)
            ->where('created_at', '>=', $now->copy()->subMonth())
            ->sum('amount');

        $totalProducts = $productIds->count();
        $totalOrders = Order::whereIn('product_id', $productIds)->count();
        $pendingOrders = Order::whereIn('product_id', $productIds)
            ->whereIn('status', ['Pending', 'pending'])
            ->count();

        // Monthly sales for the last 6 months (chart)
        $salesChart = collect(range(5, 0))->map(function ($i) use ($now, $productIds) {
            $month = $now->copy()->subMonths($i);
            $value = Order::whereIn('product_id', $productIds)
                ->whereNotIn('status', ['Cancelled', 'cancelled'])
                ->whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->sum('amount');
            return ['name' => $month->format('M'), 'value' => round($value, 2)];
        })->values();

        // Recent activity = latest orders for this merchant
        $recentActivities = Order::whereIn('product_id', $productIds)
            ->with('product')
            ->latest()
            ->take(6)
            ->get()
            ->map(fn($o) => [
                'user' => $o->name ?: ($o->email ?: 'Guest'),
                'action' => 'Ordered ' . ($o->product->title ?? $o->product_name ?? 'a product'),
                'time' => $o->created_at?->diffForHumans(),
            ]);

        $pct = fn($cur, $prev) => $prev > 0 ? round((($cur - $prev) / $prev) * 100, 1) : ($cur > 0 ? 100 : 0);

        // Commission breakdown: what the platform takes vs. what the merchant
        // keeps. Rate is set by the admin (0 if none configured yet).
        $commissionRate = (float) (Commission::where('merchant_id', auth()->id())->value('rate') ?? 0);
        $commissionAmount = round($totalRevenue * $commissionRate / 100, 2);
        $netEarnings = round($totalRevenue - $commissionAmount, 2);

        // Settled (Delivered) earnings for a confirmed view
        $deliveredRevenue = Order::whereIn('product_id', $productIds)
            ->whereIn('status', ['Delivered', 'delivered'])
            ->sum('amount');
        $deliveredCommission = round($deliveredRevenue * $commissionRate / 100, 2);

        return Inertia::render('Marchant/Index', [
            'marchantuser' => $user,
            'stats' => [
                'totalRevenue' => round($totalRevenue, 2),
                'revenueChange' => $pct($thisMonthRevenue, $lastMonthRevenue),
                'totalProducts' => $totalProducts,
                'totalOrders' => $totalOrders,
                'pendingOrders' => $pendingOrders,
            ],
            'commission' => [
                'rate' => $commissionRate,
                'total_sales' => round($totalRevenue, 2),
                'commission' => $commissionAmount,
                'net' => $netEarnings,
                'delivered_sales' => round($deliveredRevenue, 2),
                'delivered_commission' => $deliveredCommission,
                'delivered_net' => round($deliveredRevenue - $deliveredCommission, 2),
            ],
            'salesChart' => $salesChart,
            'recentActivities' => $recentActivities,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
