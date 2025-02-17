<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ProductWish;

class WishlistController extends Controller
{
    public function saveToWishlist(Request $request)
    {
        ProductWish::firstOrCreate([
            'user_id' => Auth::id(), // Correct usage of Auth
            'product_id' => $request->product_id,
        ]);
    
        return back()->with('success', 'Product added to wishlist.');
    }
    
}