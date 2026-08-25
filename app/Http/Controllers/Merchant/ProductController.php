<?php

namespace App\Http\Controllers\Merchant;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductDetail;
use App\Models\ProductReview;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $merchant = auth()->user(); // Get logged-in merchant
        $q = $request->input('q');

        $products = Product::where('user_id', $merchant->id)
            ->with('category', 'brand', 'details') // Load relations
            ->when($q, fn($query) => $query->where('title', 'like', "%{$q}%"))
            ->latest()
            ->get();

        return Inertia::render('Marchant/Products/Index', [
            'products' => $products,
            'filters' => ['q' => $q],
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
                ? 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120'
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

    // Merchant reports (their products, orders, revenue)
    public function reports()
    {
        $merchantId = auth()->id();
        $products = Product::where('user_id', $merchantId)->get();
        $productIds = $products->pluck('id');
        $orders = Order::whereIn('product_id', $productIds)->get();

        $topProducts = $orders->groupBy('product_id')->map(function ($o) {
            $p = Product::find($o->first()->product_id);
            return [
                'title' => $p?->title ?? 'Unknown',
                'count' => $o->count(),
                'revenue' => $o->sum('amount'),
            ];
        })->sortByDesc('count')->take(5)->values();

        return Inertia::render('Marchant/Reports', [
            'productCount' => $products->count(),
            'orderCount' => $orders->count(),
            'revenue' => $orders->sum('amount'),
            'byStatus' => $orders->groupBy('status')->map->count(),
            'topProducts' => $topProducts,
        ]);
    }

    // Reviews for the merchant's products
    public function reviews()
    {
        $merchantId = auth()->id();
        $productIds = Product::where('user_id', $merchantId)->pluck('id');
        $reviews = ProductReview::with(['user', 'product'])
            ->whereIn('product_id', $productIds)
            ->latest()
            ->get();

        return Inertia::render('Marchant/Reviews', ['reviews' => $reviews]);
    }

    // Merchant help page
    public function help()
    {
        return Inertia::render('Marchant/Help');
    }

    public function store(Request $request)
    {
        $merchant = auth()->user();

        $validated = $request->validate([
            'title' => 'required|string',
            'short_des' => 'required|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'image' => 'required|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:5120',
            'star' => 'nullable|numeric|min:0|max:5',
            'status' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'des' => 'required|string',
            'color' => 'nullable|array',
            'size' => 'nullable|array',
            'attributes' => 'nullable|array',
            'attributes.*.name' => 'required_with:attributes|string|max:50',
            'attributes.*.values' => 'nullable|array',
            'attributes.*.values.*.label' => 'nullable|string|max:50',
            'attributes.*.values.*.price' => 'nullable|numeric|min:0',
            'img1' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:5120',
            'img2' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:5120',
            'img3' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:5120',
            'img4' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:5120',
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

        // Clean up dynamic attributes: keep only those with a name and at least one
        // labelled option. Each option carries its own price adjustment (extra
        // amount added on top of the base product price).
        $attributes = collect($validated['attributes'] ?? [])
            ->map(function ($attr) {
                $name = trim($attr['name'] ?? '');
                $values = collect($attr['values'] ?? [])
                    ->map(function ($opt) {
                        $label = trim($opt['label'] ?? '');
                        $price = isset($opt['price']) && $opt['price'] !== ''
                            ? round((float) $opt['price'], 2)
                            : 0;
                        return ['label' => $label, 'price' => $price];
                    })
                    ->filter(fn($opt) => $opt['label'] !== '')
                    ->values()
                    ->all();
                return ['name' => $name, 'values' => $values];
            })
            ->filter(fn($attr) => $attr['name'] !== '' && count($attr['values']) > 0)
            ->values()
            ->all();

        // Remove blank color/size entries (e.g. [""]) before persisting.
        // Empty optional variants must remain [] so customer pages do not show
        // blank swatches or empty selection sections.
        $colors = collect($validated['color'] ?? [])
            ->map(fn($value) => is_string($value) ? trim($value) : '')
            ->filter()
            ->unique()
            ->values()
            ->all();
        $sizes = collect($validated['size'] ?? [])
            ->map(fn($value) => is_string($value) ? trim($value) : '')
            ->filter()
            ->unique()
            ->values()
            ->all();

        ProductDetail::create([
            'product_id' => $product->id,
            'des' => $validated['des'],
            'color' => $colors,
            'size' => $sizes,
            'attributes' => $attributes,
            'img1' => $storedImages['img1'],
            'img2' => $storedImages['img2'],
            'img3' => $storedImages['img3'],
            'img4' => $storedImages['img4'],
        ]);

        return redirect()->route('merchant.products.index')->with('success', 'Product created successfully!');
    }

    public function edit(int $id)
    {
        $product = Product::with('details')
            ->where('user_id', auth()->id())
            ->findOrFail($id);

        $categories = Category::all();
        $brands = Brand::where(function ($query) {
            $query->where('user_id', auth()->id())->orWhereNull('user_id');
        })->get();

        return Inertia::render('Marchant/Products/Create', [
            'category' => $categories,
            'brands' => $brands,
            'product' => $product,
        ]);
    }

    public function update(Request $request, int $id)
    {
        $product = Product::with('details')
            ->where('user_id', auth()->id())
            ->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'short_des' => 'required|string',
            'price' => 'required|numeric|min:0',
            'discount' => 'nullable|numeric|min:0|max:100',
            'image' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:5120',
            'star' => 'nullable|numeric|min:0|max:5',
            'status' => 'required|in:active,inactive',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'des' => 'required|string',
            'color' => 'nullable|array',
            'size' => 'nullable|array',
            'attributes' => 'nullable|array',
            'attributes.*.name' => 'required_with:attributes|string|max:50',
            'attributes.*.values' => 'nullable|array',
            'attributes.*.values.*.label' => 'nullable|string|max:50',
            'attributes.*.values.*.price' => 'nullable|numeric|min:0',
            'img1' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:5120',
            'img2' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:5120',
            'img3' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:5120',
            'img4' => 'nullable|file|mimetypes:image/jpeg,image/jpg,image/png,image/gif,image/bmp,image/svg+xml,image/webp,image/avif,image/heic,image/heif|max:5120',
        ]);

        $productData = [
            'title' => $validated['title'],
            'short_des' => $validated['short_des'],
            'price' => $validated['price'],
            'discount' => $validated['discount'] ?? 0,
            'star' => $validated['star'] ?? 0,
            'status' => $validated['status'],
            'category_id' => $validated['category_id'],
            'brand_id' => $validated['brand_id'],
        ];

        if ($request->hasFile('image')) {
            $imageName = time() . '_' . $request->file('image')->getClientOriginalName();
            $request->file('image')->move(public_path('product_images'), $imageName);
            $this->deletePublicProductImage($product->image);
            $productData['image'] = 'product_images/' . $imageName;
        }

        $product->update($productData);

        $detail = $product->details ?: new ProductDetail(['product_id' => $product->id]);
        $detailImages = [];
        foreach (['img1', 'img2', 'img3', 'img4'] as $field) {
            if ($request->hasFile($field)) {
                $imageName = time() . '_' . $request->file($field)->getClientOriginalName();
                $request->file($field)->move(public_path('product_images'), $imageName);
                $this->deletePublicProductImage($detail->{$field});
                $detailImages[$field] = 'product_images/' . $imageName;
            } else {
                $detailImages[$field] = $detail->{$field};
            }
        }

        $colors = collect($validated['color'] ?? [])
            ->map(fn($value) => is_string($value) ? trim($value) : '')
            ->filter()->unique()->values()->all();
        $sizes = collect($validated['size'] ?? [])
            ->map(fn($value) => is_string($value) ? trim($value) : '')
            ->filter()->unique()->values()->all();
        $attributes = collect($validated['attributes'] ?? [])
            ->map(function ($attribute) {
                $name = trim($attribute['name'] ?? '');
                $values = collect($attribute['values'] ?? [])
                    ->map(fn($option) => [
                        'label' => trim($option['label'] ?? ''),
                        'price' => round((float) ($option['price'] ?? 0), 2),
                    ])
                    ->filter(fn($option) => $option['label'] !== '')
                    ->values()->all();

                return ['name' => $name, 'values' => $values];
            })
            ->filter(fn($attribute) => $attribute['name'] !== '' && count($attribute['values']) > 0)
            ->values()->all();

        $detail->fill(array_merge([
            'des' => $validated['des'],
            'color' => $colors,
            'size' => $sizes,
            'attributes' => $attributes,
        ], $detailImages));
        $detail->save();

        return redirect()->route('merchant.products.index')
            ->with('success', 'Product updated successfully!');
    }

    private function deletePublicProductImage(?string $path): void
    {
        if (!$path || !str_starts_with(ltrim($path, '/'), 'product_images/')) {
            return;
        }

        $absolutePath = public_path(ltrim($path, '/'));
        if (is_file($absolutePath)) {
            @unlink($absolutePath);
        }
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
