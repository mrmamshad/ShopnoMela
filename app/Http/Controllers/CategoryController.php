<?php

namespace App\Http\Controllers;

use App\Models\ProductCart;
use App\Models\ProductWish;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        return Inertia::render('Category/Index');
    }

    public function product()
    {
        return Inertia::render('Category/Product');
    }

    public function cart()
    {
        $cartItems = ProductCart::with('product')->where('user_id', auth()->id())->get();
        // dd($cartItems);
        return Inertia::render('Category/Cart', ['cartItems' => $cartItems]);
    }

    public function wishlist()
    {
        $userId = auth()->id();
    
        $wishlistItems = ProductWish::with(['product', 'productCarts' => function ($query) use ($userId) {
            $query->where('user_id', $userId);
        }])
        ->where('user_id', $userId)
        ->get();
        
        return Inertia::render('Category/Wishlist', ['wishlistItems' => $wishlistItems]);
    }
    
    public function checkout()
    {
        return Inertia::render('Category/Checkout');
    }

    // SSLCOMMERZ payment Gateway Routes -  Start
    //  payments selection page 
    public function payments()
    {
        return Inertia::render('Category/Payments');
    }

    public function admin()
    {
        dd('admin');
    }
}
