<?php

namespace App\Http\Controllers\Merchant;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $merchant = auth()->user(); // Get logged-in merchant

        $products = Product::where('user_id', $merchant->id)
            ->with('category', 'brand', 'details') // Load relations
            ->latest()
            ->get();

        // dd($products); // ✅ Now it should return products!

        // dd($products->image);

        // Fetch products and pass to Inertia view
        return Inertia::render('Marchant/Products/Index', [
            'products' => $products, // Assuming a merchant-user relationship
        ]);
    }

    public function create()
    {
        $categories = Category::all();
        $brands = DB::table('brands')->get();
        // dd($brands);
        // dd($categories);
        return Inertia::render('Marchant/Products/Create', [
            'category' => $categories,
            'brands' => $brands,
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $merchant = auth()->user();

        $validated = $request->validate([
            'title' => 'required|string',
            'short_des' => 'required|string',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
            'image' => 'required|image',
            'star' => 'required|numeric|min:0|max:5',
            'status' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'des' => 'required|string',
            'color' => 'nullable|array',
            'size' => 'nullable|array',
            'img1' => 'nullable|image',
            'img2' => 'nullable|image',
            'img3' => 'nullable|image',
            'img4' => 'nullable|image',
        ]);

        // ✅ Move image to `public/product_images`
        $imageName = time() . '_' . $request->file('image')->getClientOriginalName();
        $request->file('image')->move(public_path('product_images'), $imageName);

        // ✅ Store the product with correct image path
        $product = Product::create([
            'title' => $validated['title'],
            'short_des' => $validated['short_des'],
            'price' => $validated['price'],
            'discount' => $validated['discount'] ?? 0,
            'image' => 'product_images/' . $imageName, // ✅ Save relative path
            'star' => $validated['star'],
            'status' => $validated['status'],
            'category_id' => $validated['category_id'],
            'brand_id' => $validated['brand_id'],
            'user_id' => $merchant->id, // ✅ Ensure merchant is assigned
        ]);

        // ✅ Handle additional product images
        $productDetailImages = ['img1', 'img2', 'img3', 'img4'];
        $storedImages = [];

        foreach ($productDetailImages as $imgField) {
            if ($request->hasFile($imgField)) {
                $imgName = time() . '_' . $request->file($imgField)->getClientOriginalName();
                $request->file($imgField)->move(public_path('product_images'), $imgName);
                $storedImages[$imgField] = 'product_images/' . $imgName;
            } else {
                $storedImages[$imgField] = null;
            }
        }

        // ✅ Store product details
        ProductDetail::create([
            'product_id' => $product->id,
            'des' => $validated['des'],
            'color' => json_encode($validated['color'] ?? []),
            'size' => json_encode($validated['size'] ?? []),
            'img1' => $storedImages['img1'],
            'img2' => $storedImages['img2'],
            'img3' => $storedImages['img3'],
            'img4' => $storedImages['img4'],
        ]);

        return redirect()->route('merchant.products.index')->with('success', 'Product created successfully!');
    }
    public function orders()
    {
        return Inertia::render('Marchant/Products/Orders');
    }

    public function destroy($id)
    {
        $product = Product::where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$product) {
            return back()->with('error', 'Product not found or unauthorized.');
        }

        // Delete product image from storage
        if ($product->image) {
            \Illuminate\Support\Facades\Storage::delete('public/' . $product->image);
        }

        $product->delete();

        return back()->with('success', 'Product deleted successfully.');
    }
}
