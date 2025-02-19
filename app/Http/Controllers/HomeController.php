<?php

namespace App\Http\Controllers;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Models\Category;
use App\Models\FlashSale;
use App\Models\Offer;
use App\Models\Product;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    
    public function index()
    {
        $offers = Offer::where('valid_until', '>=', now())
        ->orderBy('created_at', 'desc') // Sort by newest first
        ->get();
    
        $flashSales = FlashSale::with('product')->latest()->get();
        // dd($flashSales);
        //    dd($offers);
        $userId = auth()->id();

        if ($userId) {

            $excludedProductIds = DB::table('product_wishes')
                ->where('user_id', $userId)
                ->pluck('product_id')
                ->merge(DB::table('product_carts')
                    ->where('user_id', $userId)
                    ->pluck('product_id'))
                ->toArray();

            $randomProducts = Product::whereNotIn('id', $excludedProductIds)
                ->inRandomOrder()
                ->limit(10)
                ->get();
        } else {

            $randomCategories = Category::inRandomOrder()->limit(3)->pluck('id');
            $randomProducts = Product::whereIn('category_id', $randomCategories)
                ->inRandomOrder()
                ->limit(10)
                ->get();
        }
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'user' => auth()->user(),
            'category' => Category::all(),
            'offers' => $offers,
            'flashSales' => $flashSales,
            'randomProducts' => $randomProducts
        ]);
    }
}
