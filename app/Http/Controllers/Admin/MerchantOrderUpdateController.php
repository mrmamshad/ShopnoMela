<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;

class MerchantOrderUpdateController extends Controller
{
    public function index(): Response
    {
        // Fetch orders where the user has the 'merchant' role
        $orders = Order::with(['user', 'product','product.user'])
            ->whereHas('user.roles', function ($query) {
                $query->where('name', 'merchant');
            })
            ->latest()
            ->get();

        $merchantUserIds = $orders->pluck('product.user_id')->unique();
        $stores = Store::whereIn('user_id', $merchantUserIds)->get();

        // dd($stores);

        //   dd($orders);   

        return Inertia::render('Admin/MerchantOrdersUpdate', [
            'orders' => $orders,
            'stores' => $stores
        ]);
    }
}
