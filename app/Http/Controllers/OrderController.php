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
$orders = Order::with('product') // Eager load product
    ->where('user_id', auth()->id()) 
    ->orderBy('created_at', 'desc') 
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
