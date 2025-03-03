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

use App\Http\Controllers\StoreController;
use App\Http\Controllers\Admin\StoreApplicationController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Merchant\ProductController as MerchantProductController;
use App\Http\Controllers\WishlistController;
use App\Http\Middleware\RoleMiddleware;
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


Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');


Route::post('/shipping/store', [CheckoutController::class, 'store'])->name('shipping.store');

Route::get('/payments', [CategoryController::class, 'payments'])->name('payments');



// Admin only
Route::middleware(['auth', RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');

    // Slider manage routes
    Route::get('/admin/sliders', [OfferController::class, 'index'])->name('offers.index');
    Route::post('/admin/offers', [OfferController::class, 'store'])->name('offers.store');
    Route::put('admin/offers/{offer}', [OfferController::class, 'update'])->name('offers.update');
    Route::delete('admin/offers/{offer}', [OfferController::class, 'destroy'])->name('offers.destroy');

    // flash sale manage routes 

    Route::get('/admin/flash-sales', [FlashSaleController::class, 'index'])->name('flash-sales.index');
    Route::post('/admin/flash-sales', [FlashSaleController::class, 'store'])->name('flash-sales.store');
    Route::delete('admin/flash-sales/{flashSale}', [FlashSaleController::class, 'destroy'])->name('flash-sales.destroy');

    // marchant manage routes
    Route::get('/admin/marchants', [AdminController::class, 'marchantlist'])->name('marchantlist');
    // all users manage routes
    Route::get('/admin/users', [AdminController::class, 'userlist'])->name('userlist');
    //  to give a user merchant role
    Route::post('/admin/users/{id}/assign-merchant', [AdminController::class, 'assignMerchant'])
        ->name('admin.assign-merchant');
    //  to take back marchant role from a user and give them normal customer role
    Route::post('/admin/users/{id}/take-over', [AdminController::class, 'takeOverMerchantRole'])

        ->name('admin.takeOverMerchant');

    //marchant applications     

    Route::get('/merchant-applications', [StoreApplicationController::class, 'index'])->name('merchant.applications.index');
    Route::post('/merchant-applications/{store}/approve', [StoreApplicationController::class, 'approve'])
        ->name('merchant.applications.approve');

    Route::post('/merchant-applications/{store}/reject', [StoreApplicationController::class, 'reject'])
        ->name('merchant.applications.reject');
});

// Admin and Merchant
Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':admin,merchant'])->group(function () {
    Route::get('/marchant', [MarchantController::class, 'index'])->name('marchant');
     // Show store profile
     Route::get('/marchant/profile', [StoreController::class, 'edit'])->name('merchant.store.edit');
     // Update store profile
     Route::post('/marchant/profile', [StoreController::class, 'update'])->name('merchant.store.update');
     Route::get('/marchant/products', [MerchantProductController::class, 'index'])->name('merchant.products.index');
     Route::get('/marchant/product/create', [MerchantProductController::class, 'create'])->name('merchant.products.create');
     Route::post('/marchant/product/store', [MerchantProductController::class, 'store'])->name('merchant.products.store'); // ⬅ Added this
     Route::delete('/merchant/products/{id}', [MerchantProductController::class, 'destroy'])
    ->name('merchant.products.destroy')
    ;

});


Route::middleware('auth')->group(function () {
    // Become a Seller: store creation
    Route::post('/merchant/store', [StoreController::class, 'store'])->name('merchant.store');
});

Route::middleware(['auth', 'role:admin'])->group(function () {});

Route::middleware(['auth', 'admin'])->group(function () {



    Route::get('/admin/categories', [CategoryController::class, 'index'])->name('admin.categories');
});


// Route::get('/offers', [OfferController::class, 'index'])->name('offers');



// SSLCOMMERZ Start
Route::get('/example1', [SslCommerzPaymentController::class, 'exampleEasyCheckout']);
Route::get('/example2', [SslCommerzPaymentController::class, 'exampleHostedCheckout']);

Route::post('/pay', [SslCommerzPaymentController::class, 'index'])->name('sslcommerz.index');
Route::post('/pay-via-ajax', [SslCommerzPaymentController::class, 'payViaAjax']);

Route::post('/success', [SslCommerzPaymentController::class, 'success']);
Route::post('/fail', [SslCommerzPaymentController::class, 'fail']);
Route::post('/cancel', [SslCommerzPaymentController::class, 'cancel']);

Route::post('/ipn', [SslCommerzPaymentController::class, 'ipn']);
//SSLCOMMERZ END


    // Route::get('/sslcommerz/example1', [SslCommerzPaymentController::class, 'exampleEasyCheckout']);
    // Route::get('/sslcommerz/example2', [SslCommerzPaymentController::class, 'exampleHostedCheckout']);

    // Route::post('/sslcommerz/pay', [SslCommerzPaymentController::class, 'index']);
    // Route::post('/sslcommerz/pay-via-ajax', [SslCommerzPaymentController::class, 'payViaAjax']);

    // Route::post('/sslcommerz/success', [SslCommerzPaymentController::class, 'success']);
    // Route::post('/sslcommerz/fail', [SslCommerzPaymentController::class, 'fail']);
    // Route::post('/sslcommerz/cancel', [SslCommerzPaymentController::class, 'cancel']);

    // Route::post('/sslcommerz/ipn', [SslCommerzPaymentController::class, 'ipn']);


// Route::get('/category-details', CategoryController::class , 'index')->name('category-details');

Route::get('google-login', [GoogleAuth::class, 'googleLogin'])->name('auth.google');
Route::get('auth/google/callback', [GoogleAuth::class, 'googleLoginCallback'])->name('auth.google.callback');


Route::get('/offers', [OfferController::class, 'index']);
Route::post('/offers', [OfferController::class, 'store']);
Route::put('/offers/{offer}', [OfferController::class, 'update']);
Route::delete('/offers/{offer}', [OfferController::class, 'destroy']);

require __DIR__ . '/auth.php';
