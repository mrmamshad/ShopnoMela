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
          ->select('orders.*', 'products.*', 'product_details.*') // Select specific columns
          ->get();
          // dd($orders);
      return Inertia::render('Order/Index', [
          'orders' => $orders,
      ]);
  }
  
  
}
