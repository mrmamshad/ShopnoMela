<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Offer;


class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */ public function index()
    {
        return response()->json(Offer::where('valid_until', '>=', now())->orderByDesc('id')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'image' => 'required|string', // Image path (upload handling needed)
            'discount' => 'required|numeric|min:0|max:100',
            'valid_until' => 'required|date',
        ]);

        $offer = Offer::create($request->all());
        return response()->json($offer, 201);
    }

    public function update(Request $request, Offer $offer)
    {
        $request->validate([
            'title' => 'sometimes|string',
            'image' => 'sometimes|string',
            'discount' => 'sometimes|numeric|min:0|max:100',
            'valid_until' => 'sometimes|date',
        ]);

        $offer->update($request->all());
        return response()->json($offer);
    }

    public function destroy(Offer $offer)
    {
        $offer->delete();
        return response()->json(['message' => 'Offer deleted']);
    }
}
