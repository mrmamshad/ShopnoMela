<?php

namespace App\Http\Controllers;

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
      return Inertia::render('Category/Cart');
    }

    public function wishlist()
    {
      return Inertia::render('Category/Wishlist');
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

    public function admin(){
        dd('admin');
    }
}
