<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductCart; // Import ProductCart model
use App\Models\CustomerProfile; // Import CustomerProfile model
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();

        // Load the whole cart (all items with their products) — user or guest session
        $query = ProductCart::with('product');
        if ($user) {
            $query->where('user_id', $user->id);
        } else {
            $query->where('session_id', session()->getId());
        }
        $cartItems = $query->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart')->with('error', 'Your cart is empty. Please add products first.');
        }

        $customerProfile = $user ? CustomerProfile::where('user_id', $user->id)->first() : null;

        $shippingDetails = $customerProfile ? [
            'name' => $customerProfile->cus_name,
            'phone' => $customerProfile->cus_phone,
            'address' => $customerProfile->ship_add,
            'city' => $customerProfile->ship_city,
            'state' => $customerProfile->ship_state,
        ] : [
            'name' => $user?->name ?? '',
            'phone' => $user?->phone ?? 'Not provided',
            'address' => 'No address available',
            'city' => null,
            'state' => null,
        ];

        $shippingFee = 150;

        $subtotal = $cartItems->sum(function ($item) {
            return $item->price * $item->qty;
        });

        $totalAmount = $subtotal + $shippingFee;

        return Inertia::render('Checkout/Index', [
            'cartItems' => $cartItems,
            'shippingDetails' => $shippingDetails,
            'shippingFee' => $shippingFee,
            'subtotal' => $subtotal,
            'totalAmount' => $totalAmount,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            // Billing fields
            'cus_name'  => 'required|string|max:255',
            'cus_phone' => 'required|string|max:20',
    
            // Shipping fields
            'ship_name' => 'required|string|max:255',
            'ship_add'  => 'required|string|max:255',
            'ship_city' => 'required|string|max:255',
            'ship_state'=> 'required|string|max:255',
        ]);
    
        CustomerProfile::updateOrCreate(
            ['user_id' => Auth::id()],
            array_merge($validated, ['user_id' => Auth::id()])
        );
    
        return redirect()->back()->with('success', 'Address saved successfully.');
    }
    
}
