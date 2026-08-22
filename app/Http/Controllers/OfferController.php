<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Offer;
use Inertia\Inertia;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */ public function index()
    {

        return Inertia::render('Admin/slider', [
          'offers' => Offer::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'discount' => 'required|numeric|min:0|max:100',
            'types' => 'required|string',
            'valid_until' => 'required|date',
            'image' => $request->hasFile('image')
                ? 'required|image|mimes:jpeg,jpg,png,webp|max:2048'
                : 'required|url',
        ]);

        $imagePath = $request->input('image');
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $name = 'offer_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('offers'), $name);
            $imagePath = 'offers/' . $name;
        }

        Offer::create([
            'title' => $request->title,
            'image' => $imagePath,
            'discount' => $request->discount,
            'types' => $request->types,
            'valid_until' => $request->valid_until,
        ]);

        return redirect()->back()->with('success', 'Offer added successfully.');
    }

    // Update an offer
    public function update(Request $request, Offer $offer)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'discount' => 'required|numeric|min:0|max:100',
            'valid_until' => 'required|date',
        ]);

        $data = $request->only(['title', 'discount', 'types', 'valid_until']);

        if ($request->hasFile('image')) {
            $request->validate(['image' => 'image|mimes:jpeg,jpg,png,webp|max:2048']);
            $file = $request->file('image');
            $name = 'offer_' . time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('offers'), $name);
            $data['image'] = 'offers/' . $name;
        } elseif ($request->filled('image')) {
            $data['image'] = $request->input('image');
        }

        $offer->update($data);

        return redirect()->back()->with('success', 'Offer updated successfully.');
    }
    
    public function destroy(Offer $offer)
    {
        $offer->delete();
        return redirect()->back()->with('success', 'Offer deleted successfully.');
    }
    
}
