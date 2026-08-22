<?php

namespace App\Http\Controllers\Merchant;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $brands = Brand::where(function ($q) {
            $q->where('user_id', auth()->id())->orWhereNull('user_id');
        })->get();

        return Inertia::render('Marchant/Products/Create', [
            'category' => $categories,
            'brands' => $brands,
        ]);
    }

    // Create a brand owned by the logged-in merchant
    public function storeBrand(Request $request)
    {
        $request->validate([
            'brandName' => 'required|string|max:255',
            'brandImg' => $request->hasFile('brandImg')
                ? 'nullable|image|mimes:jpeg,jpg,png,webp|max:1024'
                : 'nullable|url',
        ]);

        $imagePath = $request->input('brandImg');
        if ($request->hasFile('brandImg')) {
            $file = $request->file('brandImg');
            $name = 'brand_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('brands'), $name);
            $imagePath = 'brands/' . $name;
        }

        Brand::create([
            'brandName' => $request->brandName,
            'brandImg' => $imagePath,
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Brand created successfully.');
    }

    // List brands owned by the logged-in merchant
    public function brands()
    {
        $brands = Brand::where('user_id', auth()->id())->latest()->get();

        return Inertia::render('Marchant/Brands', [
            'brands' => $brands,
        ]);
    }

    // Delete a brand owned by the logged-in merchant
    public function deleteBrand($id)
    {
        $brand = Brand::where('user_id', auth()->id())->findOrFail($id);
        $brand->delete();

        return redirect()->back()->with('success', 'Brand deleted successfully.');
    }

    public function store(Request $request)
    {
        $merchant = auth()->user();

        $validated = $request->validate([
            'title' => 'required|string',
            'short_des' => 'required|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'image' => 'required|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:1024',
            'star' => 'nullable|numeric|min:0|max:5',
            'status' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'des' => 'required|string',
            'color' => 'nullable|array',
            'size' => 'nullable|array',
            'img1' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:1024',
            'img2' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:1024',
            'img3' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:1024',
            'img4' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:1024',
        ]);

        // Move main image to `public/product_images`
        $imageName = time() . '_' . $request->file('image')->getClientOriginalName();
        $request->file('image')->move(public_path('product_images'), $imageName);

        $product = Product::create([
            'title' => $validated['title'],
            'short_des' => $validated['short_des'],
            'price' => $validated['price'],
            'discount' => $validated['discount'] ?? 0,
            'image' => 'product_images/' . $imageName,
            'star' => $validated['star'] ?? 0,
            'status' => $validated['status'],
            'category_id' => $validated['category_id'],
            'brand_id' => $validated['brand_id'],
            'user_id' => $merchant->id,
        ]);

        // Handle additional product images
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
        $merchantId = Auth::id(); // Get logged-in merchant ID

        $orders = Order::whereIn('product_id', function ($query) use ($merchantId) {
            $query->select('id')->from('products')->where('user_id', $merchantId);
        })
            ->with(['product', 'user']) // Load product and customer details
            ->get();

        // dd($orders);

        return Inertia::render('Marchant/Products/Orders', [
            'orders' => $orders,
        ]);
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
