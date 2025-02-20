<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class StoreController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all());
        // Validate incoming data
        $request->validate([
            'store_name' => 'required|string|max:255',
            'cover_photo' => 'required|image|max:2048',
            'profile_photo' => 'required|image|max:2048',
            'description' => 'nullable|string',
            'contact_email' => 'required|email|max:255',
            'contact_phone' => 'required|string|max:20',
            'facebook' => 'nullable|url',
            'instagram' => 'nullable|url',
            'twitter' => 'nullable|url',
        ]);

        // Handle file uploads (cover_photo & profile_photo)
        $coverPhotoPath = $request->file('cover_photo')->store('stores/cover_photos', 'public');
        $profilePhotoPath = $request->file('profile_photo')->store('stores/profile_photos', 'public');

        // Create the store
        $store = Store::create([
            'user_id' => Auth::id(),
            'name' => $request->store_name,
            'cover_photo' => $coverPhotoPath,
            'profile_photo' => $profilePhotoPath,
            'description' => $request->description,
            'contact_email' => $request->contact_email,
            'contact_phone' => $request->contact_phone,
            'facebook' => $request->facebook,
            'instagram' => $request->instagram,
            'twitter' => $request->twitter,
        ]);

        // Optionally, if you want to assign the user a new role (e.g. 'seller'),
        // and you're using Spatie roles:
        // Auth::user()->assignRole('seller');

        // Redirect back or to a specific route with success message
        return redirect()->back()->with('success', 'Store created successfully!');
    }
}

