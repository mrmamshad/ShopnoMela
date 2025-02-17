<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ProductCart;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        // dd($request->all());
        // Allow nullable values for color and size
        $cartData = [
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
            'qty' => $request->qty ?? 1, // Ensure qty is at least 1
            'price' => $request->price,
        ];
    
        // Only add color and size if they exist
        if ($request->filled('color')) {
            $cartData['color'] = $request->color;
        }
        if ($request->filled('size')) {
            $cartData['size'] = $request->size;
        }
    
        // Create or update cart item
        ProductCart::updateOrCreate(
            ['user_id' => Auth::id(), 'product_id' => $request->product_id], // Matching condition (removed color & size)
            $cartData
        );
    
        return back()->with('success', 'Product added to cart.');
    }
    
}
