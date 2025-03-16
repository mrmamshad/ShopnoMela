<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\ProductReview;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function categoryProducts($id)
    {
        $category = Category::findOrFail($id);
        $products = Product::where('category_id', $id)->get();

        return Inertia::render('Category/AllProducts', [
            'category' => $category,
            'products' => $products,
        ]);
    }

    // public function productDetails($id){
    //     return Inertia::render('Category/Product.jsx');
    // }

    public function show($id)
    {
        // Fetch all columns for the product by its ID
        $productdetails = ProductDetail::select('*')->where('id', $id)->firstOrFail();
        //  dd($productdetails);
        $product = Product::select('*')->where('id', $id)->firstOrFail();
        // dd($product);

        // Fetch related products in the same category, excluding the current product
        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $id) // Exclude the current product
            ->limit(6) // Limit to 6 related products (adjust as needed)
            ->get();
        // Fetch reviews with customer details
        $reviews = ProductReview::where('product_id', $id)
            ->with(['user', 'product']) // Eager loading
            ->latest()
            ->get();

        //    dd($reviews);
        return Inertia::render('Category/Product', [
            'singleproduct' => $product,
            'productdetails' => $productdetails,
            'relatedproducts' => $relatedProducts,
            'reviews' => $reviews,
        ]);
    }
    public function search(Request $request)
    {
        $query = strtolower(trim($request->input('query')));

        $products = Product::whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
            ->orWhereRaw('SOUNDEX(title) = SOUNDEX(?)', [$query]) // Approximate matching
            ->take(50)
            ->get();

        return Inertia::render('Productsearch/index', [
            'products' => $products,
            'query' => $request->input('query'),
        ]);
    }
    public function mobilesearch(Request $request)
    {
$query = strtolower(trim($request->input('query')));

    if (empty($query)) {
        return response()->json([]);
    }

    $products = Product::select('id', 'title')
        ->whereRaw('LOWER(title) LIKE ?', ["%{$query}%"])
        ->orderByRaw("CHAR_LENGTH(title)") // Shorter matches appear first
        ->limit(10)
        ->get();

    return response()->json($products);
    }
}
