<?php

namespace App\Http\Controllers;

use App\Models\FlashSale;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FlashSaleController extends Controller
{
    public function index()
    {
        $flashSales = FlashSale::with('product')->get();
        $products = Product::all();
        
        return Inertia::render('Admin/flashsale', [
            'flashSales' => $flashSales,
            'products' => $products
        ]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'discount_percentage' => 'required|numeric|min:0|max:100',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);
    
        FlashSale::create($request->all());
        return redirect()->back();
    }
    
    public function destroy(FlashSale $flashSale)
    {
        $flashSale->delete();
        return redirect()->back();
    }
}
