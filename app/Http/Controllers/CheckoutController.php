<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\CustomerProfile; // Import CustomerProfile model
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function index(Request $request)
    {
        // dd($request->all());
        $user = Auth::user(); // Get the logged-in user

        // Fetch customer's shipping details
        $customerProfile = CustomerProfile::where('user_id', $user->id)->first();

        // Retrieve product details
        $product = Product::findOrFail($request->query('product_id'));

        // If no address is found, use default values
        $shippingDetails = $customerProfile ? [
            'name' => $customerProfile->cus_name,
            'phone' => $customerProfile->cus_phone,
            'address' => $customerProfile->ship_add, 
            'city' => $customerProfile->ship_city,
            'state' => $customerProfile->ship_state,
        ] : [
            'name' => $user->name,
            'phone' => 'Not provided',
            'address' => 'No address available',
        ];
          
        //  dd($shippingDetails);
        // Shipping Cost (Flat Rate)
        $shippingFee = 150;

        // Calculate total price
        $quantity = $request->query('quantity', 1);
        $productPrice = $request->query('price', $product->price);
        $totalAmount = ($productPrice * $quantity) + $shippingFee;

        return Inertia::render('Checkout/Index', [
            'product' => $product,
            'selectedColor' => $request->query('color'),
            'selectedSize' => $request->query('size'),
            'quantity' => $quantity,
            'price' => $productPrice,
            'shippingDetails' => $shippingDetails,
            'shippingFee' => $shippingFee,
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
