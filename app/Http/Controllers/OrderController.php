<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
class OrderController extends Controller
{
    public function index()
    {
        // Fetch orders for the authenticated user, including product and product details
        $orders = Order::where('orders.user_id', auth()->id()) // Specify table name for user_id
            ->leftJoin('products', 'orders.product_id', '=', 'products.id')
            ->leftJoin('product_details', 'products.id', '=', 'product_details.product_id')
            ->select('orders.*', 'products.id', 'products.user_id', 'products.title', 'products.price', 'products.image') // Select specific columns
            ->orderBy('orders.created_at', 'desc') // Order by latest orders first
            ->get();

        //   dd($orders);
        return Inertia::render('Order/Index', [
            'orders' => $orders,
        ]);
    }
    public function storeCOD(Request $request)
    {
        $order = Order::create([
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
            'product_name' => $request->product_name,
            'product_quantity' => $request->quantity,
            'quantity' => $request->quantity,
            'product_color' => $request->color,
            'product_size' => $request->size,
            'amount' => $request->amount,
            'payment_method' => 'Cash on Delivery',
            'status' => 'Pending',
            'name' => $request->cus_name,
            'phone' => $request->cus_phone,
            'address' => $request->ship_add,
            "currency" => "BDT",
            'email' => auth()->user()->email, 
        ]);

        return redirect()->route('orders')->with('success', 'Your order has been placed!');
    }
}
