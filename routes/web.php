<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FlashSaleController;
use App\Http\Controllers\GoogleAuth;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\MarchantController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SslCommerzPaymentController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductReviewController;
use App\Http\Controllers\WishlistController;
use App\Models\Category;
use App\Models\FlashSale;
use App\Models\Offer;
use App\Models\Product;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/contact-us', function () {
    return Inertia::render('ContactUs');
})->name('contact-us');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// category routes 
Route::get('/category-details', [CategoryController::class, 'index'])->name('category');
Route::get('/category/{id}', [ProductController::class, 'categoryProducts'])->name('category.products');

// product-details route 
Route::get('/product-details', [CategoryController::class, 'product'])->name('product');
Route::get('/product/{id}', [ProductController::class, 'show'])->name('product.show');


Route::post('/reviews', [ProductReviewController::class, 'store'])->name('reviews.store')->middleware('auth');

Route::get('/cart', [CategoryController::class, 'cart'])->name('cart')->middleware('auth');
Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.store');

Route::get('/wishlist', [CategoryController::class, 'wishlist'])->name('wishlist');
Route::post('/wishlist/save', [WishlistController::class, 'saveToWishlist'])->name('wishlist.store');
Route::delete('/wishlist/{id}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');


Route::get('/checkout', [CategoryController::class, 'checkout'])->name('checkout');
Route::get('/payments', [CategoryController::class, 'payments'])->name('payments');



// Admin only
Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');
});

// Admin and Merchant
Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':admin,merchant'])->group(function () {
    Route::get('/marchant', [MarchantController::class, 'index'])->name('marchant');
});



Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/offers', [OfferController::class, 'index'])->name('admin.offers');
    Route::post('/admin/offers', [OfferController::class, 'store']);
    Route::delete('/admin/offers/{id}', [OfferController::class, 'destroy']);

    Route::get('/admin/flash-sales', [FlashSaleController::class, 'index'])->name('admin.flash_sales');
    Route::post('/admin/flash-sales', [FlashSaleController::class, 'store']);
    Route::delete('/admin/flash-sales/{id}', [FlashSaleController::class, 'destroy']);

    Route::get('/admin/categories', [CategoryController::class, 'index'])->name('admin.categories');
});


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
