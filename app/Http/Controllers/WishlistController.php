<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ProductWish;

class WishlistController extends Controller
{
    public function saveToWishlist(Request $request)
    {
        // dd($request->all());
        ProductWish::firstOrCreate([
            'user_id' => Auth::id(), // Correct usage of Auth
            'product_id' => $request->product_id,
        ]);
    
        return back()->with('success', 'Product added to wishlist.');
    }
    public function destroy($id)
    {
        // Find the wishlist item
        $wishlistItem = ProductWish::where('id', $id)
            ->where('user_id', Auth::id()) // Ensure user owns the wishlist item
            ->first();

        if (!$wishlistItem) {
            return response()->json([
                'message' => 'Wishlist item not found'
            ], 404);
        }

        // Delete the item
        $wishlistItem->delete();

        return redirect()->back()->with('message', 'Wishlist item removed successfully!');
    }
    
}