<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        // dd('admin');
        return Inertia::render('Admin/Index');
    }
    public function marchantlist()
    {
        $merchants = User::whereHas('roles', function ($query) {
            $query->whereIn('name', ['merchant']);
        })->get();
        // dd($merchants); 
        return Inertia::render('Admin/MarchantList', ['merchants' => $merchants]);
    }

    public function userlist()
    {
        $users = User::whereHas('roles', function ($query) {
            $query->whereIn('name', ['customer']);
        })->get();
        return Inertia::render('Admin/UserList', ['users' => $users]);
    }

    public function assignMerchant($id)
    {
        $user = User::findOrFail($id);

        // Check if user already has merchant role
        if ($user->hasRole('merchant')) {
            return back()->with('error', 'User is already a merchant.');
        }

        // Remove customer role and assign merchant role
        $user->removeRole('customer');
        $user->assignRole('merchant');

        return back()->with('success', 'User has been assigned the Merchant role.');
    }
    public function takeOverMerchantRole($id)
    {
        // dd($id);
        $user = User::findOrFail($id);

        if (!$user->hasRole('merchant')) {
            return response()->json(['message' => 'User is not a merchant.'], 400);
        }

        // Remove merchant role & assign customer role
        $user->syncRoles(['customer']);

        return back()->with('success', 'Merchant role removed, user is now a customer.');
    }
}
