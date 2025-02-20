<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Store;


class StoreApplicationController extends Controller
{
    /**
     * Show all store applications (pending, approved, rejected, or just pending).
     */
    public function index()
    {
        // dd('admin');
        // You can choose to show only pending, or all
        $stores = Store::with('user')
            ->where('application_status', 'pending') // or remove this if you want all
            ->get();

        // Return an Inertia page or a Blade view
        return inertia('Admin/MerchantApplications', [
            'stores' => $stores,
        ]);
    }

    /**
     * Approve a store application.
     */
    public function approve(Store $store)
    {
        $user = $store->user;

        if ($user) {
            // Assign 'merchant' role
            $user->assignRole('merchant');
            $store->update(['application_status' => 'approved']);
        }

        return redirect()->back()->with('success', 'Merchant approved successfully.');
    }

    public function reject(Store $store)
    {
        $store->delete(); // Remove the application

        return redirect()->back()->with('success', 'Merchant application rejected.');
    }
}

