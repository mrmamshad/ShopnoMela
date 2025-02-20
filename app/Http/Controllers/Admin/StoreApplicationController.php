<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Store;
use App\Notifications\MerchantApplicationStatus;

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
        // Send notification to the user
        $user->notify(new MerchantApplicationStatus('approved'));

        return redirect()->back()->with([
            'success' => 'Merchant application approved!',
            'notification' => 'Your merchant application has been approved!'
        ]);
    }

    public function reject(Store $store)
    {

        $user = $store->user;
        $store->delete(); // Remove the application
        $user->notify(new MerchantApplicationStatus('rejected'));
        return redirect()->back()->with([
            'success' => 'Merchant application rejected!',
            'notification' => 'Your merchant application has been rejected.'
        ]);
    
    }
}
