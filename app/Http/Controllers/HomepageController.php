<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HomepageSection;
use Inertia\Inertia;

class HomepageController extends Controller
{
    public function index()
    {
        $sections = HomepageSection::all();
        return Inertia::render('Admin/HomepageSections', ['sections' => $sections]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string',
        ]);

        HomepageSection::create($request->only('title', 'type'));

        return redirect()->back()->with('success', 'Section added successfully.');
    }

    public function destroy($id)
    {
        HomepageSection::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Section removed.');
    }
}
