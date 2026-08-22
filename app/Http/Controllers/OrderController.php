<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Order;
use App\Models\ProductCart;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function index()
    {
        // Fetch orders for the authenticated user, including product and product details
$orders = Order::with('product') // Eager load product
    ->where('user_id', auth()->id()) 
    ->orderBy('created_at', 'desc') 
    ->get();



        //   dd($orders);
        return Inertia::render('Order/Index', [
            'orders' => $orders,
        ]);
    }
    public function storeCOD(Request $request)
    {
        $query = ProductCart::with('product');
        if (auth()->check()) {
            $query->where('user_id', auth()->id());
        } else {
            $query->where('session_id', session()->getId());
        }

        $cartItems = $query->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart')->with('error', 'Your cart is empty.');
        }

        // Auto-create the user from the checkout details if they are not logged in
        $userId = auth()->id();
        $newUser = null;
        if (!$userId) {
            $newUser = $this->findOrCreateUser(
                $request->cus_email,
                $request->cus_name,
                $request->cus_phone,
                $request->cus_password // optional password set by the user at checkout
            );
            $userId = $newUser->id;
            // Log the new user in so they can see their orders
            Auth::login($newUser);
        }

        foreach ($cartItems as $item) {
            Order::create([
                'user_id' => $userId,
                'product_id' => $item->product_id,
                'product_name' => $item->product->title,
                'product_quantity' => $item->qty,
                'product_color' => $item->color,
                'product_size' => $item->size,
                'amount' => $item->price * $item->qty,
                'payment_method' => 'Cash on Delivery',
                'status' => 'Pending',
                'name' => $request->cus_name,
                'phone' => $request->cus_phone,
                'address' => $request->ship_add,
                'currency' => 'BDT',
                'email' => $request->cus_email ?? auth()->user()?->email,
            ]);
        }

        // Clear the whole cart (user or guest session) after ordering
        if (auth()->check()) {
            ProductCart::where('user_id', auth()->id())->delete();
        } else {
            ProductCart::where('session_id', session()->getId())->delete();
        }

        // Save shipping profile so the fields are pre-filled on next checkout
        if (auth()->check()) {
            \App\Models\CustomerProfile::updateOrCreate(
                ['user_id' => auth()->id()],
                [
                    'cus_name' => $request->cus_name,
                    'cus_phone' => $request->cus_phone,
                    'ship_name' => $request->cus_name,
                    'ship_add' => $request->ship_add,
                    'ship_city' => 'Dhaka',
                    'ship_state' => 'Dhaka',
                ]
            );
        }

        return redirect()->route('orders')
            ->with('success', 'Your order has been placed! Your account was created with the email you provided.')
            ->with('guest_account', $request->cus_email);
    }

    // Find existing user by email, otherwise create one with the checkout details
    protected function findOrCreateUser($email, $name, $phone = null, $password = null)
    {
        $email = $email ?: 'guest@shopnomela.com';
        $phone = $phone ? preg_replace('/\D+/', '', $phone) : null;

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name ?: 'ShopnoMela User',
                'phone' => $phone,
                'password' => Hash::make($password ?: Str::random(16)),
            ]
        );

        // Update phone if it was missing
        if ($user->phone !== $phone) {
            $user->update(['phone' => $phone]);
        }

        if (!$user->hasAnyRole(['customer', 'merchant', 'admin'])) {
            $user->assignRole('customer');
        }

        return $user;
    }
}
