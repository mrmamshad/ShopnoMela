<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class MerchantOrderController extends Controller
{
   // Confirm Order
    public function confirmOrder($id)
    {
        $merchantId = Auth::id(); // Get the logged-in merchant ID
        
        $order = Order::whereHas('product', function ($query) use ($merchantId) {
            $query->where('user_id', $merchantId);
        })->findOrFail($id);

        $order->update(['status' => 'confirmed']);

        return Redirect::back()->with('success', 'Order confirmed successfully!');
    }

    // Delete Order
    public function deleteOrder($id)
    {
        $merchantId = Auth::id(); // Get the logged-in merchant ID

        $order = Order::whereHas('product', function ($query) use ($merchantId) {
            $query->where('user_id', $merchantId);
        })->findOrFail($id);

        $order->delete();

        return Redirect::back()->with('success', 'Order deleted successfully!');
    }
    public function sendForShipping($id)
{
    $order = Order::findOrFail($id);
    
    if ($order->status !== 'Shipped') { // Prevent re-updating shipped orders
        $order->status = 'Shipped';
        $order->save();
    }

    return redirect()->back()->with('success', 'Order marked as Shipped.');
}
}
