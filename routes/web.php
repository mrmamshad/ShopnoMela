<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GoogleAuth;
use App\Http\Controllers\MarchantController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SslCommerzPaymentController;
use App\Http\Controllers\OfferController;
use App\Models\Category;
use Inertia\Inertia;

Route::get('/', function () {
   
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'user' => auth()->user(),
        'category' => Category::all()
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/contact-us', function (){ return Inertia::render('ContactUs');  } )->name('contact-us');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/category-details', [CategoryController::class, 'index'])->name('category');
Route::get('/product-details', [CategoryController::class, 'product'])->name('product');
Route::get('/cart', [CategoryController::class, 'cart'])->name('cart');
Route::get('/wishlist', [CategoryController::class, 'wishlist'])->name('wishlist');
Route::get('/checkout', [CategoryController::class, 'checkout'])->name('checkout');
Route::get('/payments', [CategoryController::class, 'payments'])->name('payments');



// Admin only
Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class.':admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');
});

// Admin and Merchant
Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class.':admin,merchant'])->group(function () {
    Route::get('/marchant', [MarchantController::class, 'index'])->name('marchant');
});
// Route::middleware(['auth'])->group(function () {
//     Route::middleware('role:admin')->group(function () {
//         Route::get('/admin', [AdminController::class, 'index'])->name('admin');
//         Route::get('/marchant', [MarchantController::class, 'index'])->name('marchant');
//     });

//     Route::middleware('role:merchant')->group(function () {
//         Route::get('/marchant', [MarchantController::class, 'index'])->name('marchant');
//     });
// });

// Route::get('/offers', [OfferController::class, 'index'])->name('offers');



// SSLCOMMERZ payment Gateway Routes -  Start
Route::get('/example1', [SslCommerzPaymentController::class, 'exampleEasyCheckout']);
Route::get('/example2', [SslCommerzPaymentController::class, 'exampleHostedCheckout']);

Route::post('/pay', [SslCommerzPaymentController::class, 'index']);
Route::post('/pay-via-ajax', [SslCommerzPaymentController::class, 'payViaAjax']);

Route::post('/success', [SslCommerzPaymentController::class, 'success']);
Route::post('/fail', [SslCommerzPaymentController::class, 'fail']);
Route::post('/cancel', [SslCommerzPaymentController::class, 'cancel']);

Route::post('/ipn', [SslCommerzPaymentController::class, 'ipn']);


// Route::get('/category-details', CategoryController::class , 'index')->name('category-details');

Route::get('google-login', [GoogleAuth::class, 'googleLogin'])->name('auth.google');
Route::get('auth/google/callback', [GoogleAuth::class, 'googleLoginCallback'])->name('auth.google.callback');


Route::get('/offers', [OfferController::class, 'index']);
Route::post('/offers', [OfferController::class, 'store']);
Route::put('/offers/{offer}', [OfferController::class, 'update']);
Route::delete('/offers/{offer}', [OfferController::class, 'destroy']);

require __DIR__ . '/auth.php';
