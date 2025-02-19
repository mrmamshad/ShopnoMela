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
        return Inertia::render(
            'Admin/flashsale',
            [
                'flashSales' => $flashSales,
                'products' => Product::all()
            ]
        );
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

        return redirect()->back()->with('success', 'Flash Sale added successfully!');
    }

    public function update(Request $request, FlashSale $flashSale)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'discount_percentage' => 'required|numeric|min:0|max:100',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
        ]);

        $flashSale->update($request->all());

        return redirect()->back()->with('success', 'Flash Sale updated successfully!');
    }

    public function destroy(FlashSale $flashSale)
    {
        $flashSale->delete();
        return redirect()->back()->with('success', 'Flash Sale deleted successfully!');
    }
}
