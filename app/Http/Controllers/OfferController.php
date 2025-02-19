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
        // dd($request->all());
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|url',
            'discount' => 'required|numeric|min:0|max:100',
            'valid_until' => 'required|date',
        ]);

        Offer::create([
            'title' => $request->title,
            'image' => $request->image,
            'discount' => $request->discount,
            'valid_until' => $request->valid_until,
        ]);

        return redirect()->back()->with('success', 'Offer added successfully.');
    }

    // Update an offer
    public function update(Request $request, Offer $offer)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|url',
            'discount' => 'required|numeric|min:0|max:100',
            'valid_until' => 'required|date',
        ]);
    
        $offer->update($request->all());
    
        return redirect()->back()->with('success', 'Offer updated successfully.');
    }
    
    public function destroy(Offer $offer)
    {
        $offer->delete();
        return redirect()->back()->with('success', 'Offer deleted successfully.');
    }
    
}
