<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ProductCart;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $isGuest = !Auth::check();
        $userId = Auth::id();
        $sessionId = $isGuest ? session()->getId() : null;

        $cartData = [
            'user_id' => $userId,
            'session_id' => $sessionId,
            'product_id' => $request->product_id,
            'qty' => $request->qty ?? 1,
            'price' => $request->price,
        ];

        if ($request->filled('color')) {
            $cartData['color'] = $request->color;
        }

        // Prefer the full variant summary (color, size + custom attributes like
        // "RAM: 16GB") when provided so the chosen options are visible in the
        // cart, checkout and order. Fall back to the plain size value.
        if ($request->filled('variant')) {
            $cartData['size'] = $request->variant;
        } elseif ($request->filled('size')) {
            $cartData['size'] = $request->size;
        }

        // Match on user_id (logged in) or session_id (guest)
        $match = $isGuest
            ? ['session_id' => $sessionId, 'product_id' => $request->product_id]
            : ['user_id' => $userId, 'product_id' => $request->product_id];

        ProductCart::updateOrCreate($match, $cartData);

        return back()->with('success', 'Product added to cart.');
    }
}
