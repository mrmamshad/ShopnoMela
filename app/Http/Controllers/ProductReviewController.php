<?php

namespace App\Http\Controllers;

use App\Models\ProductReview;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ProductReviewController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->hasFile('image'));
        $imagePath = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time().'_'.$image->getClientOriginalName();
            $image->move(public_path('product_review_images'), $imageName);
            $imagePath = 'product_review_images/' . $imageName;
        }
    
        $customerProfile = \App\Models\CustomerProfile::where('user_id', auth()->id())->first();
        // dd($customerProfile);

    // dd($request->all());
        ProductReview::create([
            'description' => $request->description,
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'image' => $imagePath,
        ]);
    
        return back()->with('success', 'Review added successfully.');
    }

}
