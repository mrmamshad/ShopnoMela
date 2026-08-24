<?php

use App\Http\Controllers\Admin\MerchantOrderUpdateController;
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
use App\Http\Controllers\MerchantOrderController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderPdfController;
use App\Http\Controllers\WishlistController;
use App\Http\Middleware\RoleMiddleware;
use App\Models\Category;
use App\Models\FlashSale;
use App\Models\Offer;
use App\Models\Product;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    $user = auth()->user();

    // Route users to the right place based on their role.
    if ($user) {
        if ($user->hasRole('admin')) {
            return redirect()->route('admin');
        }
        if ($user->hasRole('merchant')) {
            return redirect()->route('marchant');
        }
    }

    return redirect()->route('home');
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

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

Route::post('/reviews', [ProductReviewController::class, 'store'])
    ->name('reviews.store')
    ->middleware('auth');

Route::get('/cart', [CategoryController::class, 'cart'])
    ->name('cart');
Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.store');

Route::get('/wishlist', [CategoryController::class, 'wishlist'])->name('wishlist');
Route::post('/wishlist/save', [WishlistController::class, 'saveToWishlist'])->name('wishlist.store');
Route::delete('/wishlist/{id}', [WishlistController::class, 'destroy'])->name('wishlist.destroy');

Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');

Route::get('/orders', [OrderController::class, 'index'])
    ->middleware('auth')
    ->name('orders');
Route::post('/order/cod', [OrderController::class, 'storeCOD'])
    ->name('order.cod');
Route::get('/order-proof/{orderId}', [OrderPdfController::class, 'generatePDF'])->name('order.proof');


Route::post('/shipping/store', [CheckoutController::class, 'store'])->name('shipping.store');

Route::get('/payments', [CategoryController::class, 'payments'])->name('payments');

Route::get('/products/search', [ProductController::class, 'search'])->name('products.search');
Route::get('/products/mobilesearch', [ProductController::class, 'mobilesearch'])->name('products.mobilesearch');
Route::get('/products/filter', [ProductController::class, 'filterByType'])->name('products.filter');


// Route::get('/order/{id}', [OrderController::class, 'show'])->name('order.show');

// Admin only
Route::middleware(['auth', RoleMiddleware::class . ':admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin');

    // Slider manage routes
    Route::get('/admin/sliders', [OfferController::class, 'index'])->name('offers.index');
    Route::post('/admin/offers', [OfferController::class, 'store'])->name('offers.store');
    Route::put('admin/offers/{offer}', [OfferController::class, 'update'])->name('offers.update');
    Route::delete('admin/offers/{offer}', [OfferController::class, 'destroy'])->name('offers.destroy');

    // category manage routes (admin)
    Route::get('/admin/categories', [AdminController::class, 'categories'])->name('admin.categories');
    Route::post('/admin/categories', [AdminController::class, 'storeCategory'])->name('admin.categories.store');
    Route::delete('/admin/categories/{category}', [AdminController::class, 'destroyCategory'])->name('admin.categories.destroy');

    // flash sale manage routes

    Route::get('/admin/flash-sales', [FlashSaleController::class, 'index'])->name('flash-sales.index');
    Route::post('/admin/flash-sales', [FlashSaleController::class, 'store'])->name('flash-sales.store');
    Route::delete('admin/flash-sales/{flashSale}', [FlashSaleController::class, 'destroy'])->name('flash-sales.destroy');

    // marchant manage routes
    Route::get('/admin/marchants', [AdminController::class, 'marchantlist'])->name('marchantlist');
    // admin creates a new merchant account
    Route::post('/admin/marchants', [AdminController::class, 'storeMerchant'])->name('admin.merchants.store');
    // admin resets a merchant's password
    Route::post('/admin/marchants/{id}/reset-password', [AdminController::class, 'resetMerchantPassword'])->name('admin.merchants.reset-password');
    // admin sets/updates a merchant's commission rate
    Route::post('/admin/marchants/{id}/commission', [AdminController::class, 'setCommission'])->name('admin.merchants.commission');
    Route::get('/admin/marchants/{id}', [AdminController::class, 'merchantDetails'])->name('admin.merchant.details');
    Route::get('/admin/product-reports', [AdminController::class, 'productReports'])->name('admin.product-reports');
    // all users manage routes
    Route::get('/admin/users', [AdminController::class, 'userlist'])->name('userlist');
    //  to give a user merchant role
    Route::post('/admin/users/{id}/assign-merchant', [AdminController::class, 'assignMerchant'])->name('admin.assign-merchant');
    //  delete a user account
    Route::delete('/admin/users/{id}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
    //  to take back marchant role from a user and give them normal customer role
    Route::post('/admin/users/{id}/take-over', [AdminController::class, 'takeOverMerchantRole'])->name('admin.takeOverMerchant');

    Route::get('/admin/merchant-orders-update', [MerchantOrderUpdateController::class, 'index'])->name('admin.merchant.orders.news');

    Route::get('/admin/allorders', [AdminController::class, 'allorders'])->name('admin.allorders');
    //marchant applications

    Route::get('/merchant-applications', [StoreApplicationController::class, 'index'])->name('merchant.applications.index');
    Route::post('/merchant-applications/{store}/approve', [StoreApplicationController::class, 'approve'])->name('merchant.applications.approve');

    Route::post('/merchant-applications/{store}/reject', [StoreApplicationController::class, 'reject'])->name('merchant.applications.reject');
});
Route::post('/merchant/orders/{id}/ship', [MerchantOrderController::class, 'sendForShipping'])->name('merchant.orders.ship');

// Admin and Merchant
Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':admin,merchant'])->group(function () {
    Route::get('/marchant', [MarchantController::class, 'index'])->name('marchant');
    // Show store profile
    Route::get('/marchant/profile', [StoreController::class, 'edit'])->name('merchant.store.edit');
    // Update store profile
    Route::post('/marchant/profile', [StoreController::class, 'update'])->name('merchant.store.update');
    Route::get('/marchant/products', [MerchantProductController::class, 'index'])->name('merchant.products.index');
    Route::get('/marchant/product/create', [MerchantProductController::class, 'create'])->name('merchant.products.create');
    Route::post('/marchant/product/store', [MerchantProductController::class, 'store'])->name('merchant.products.store');
    Route::post('/marchant/brands', [MerchantProductController::class, 'storeBrand'])->name('merchant.brands.store');
    Route::get('/marchant/brands', [MerchantProductController::class, 'brands'])->name('merchant.brands.index');
    Route::delete('/marchant/brands/{id}', [MerchantProductController::class, 'deleteBrand'])->name('merchant.brands.destroy');
    Route::get('/marchant/orders', [MerchantProductController::class, 'orders'])->name('merchant.orders');
    Route::get('/marchant/reports', [MerchantProductController::class, 'reports'])->name('merchant.reports');
    Route::get('/marchant/reviews', [MerchantProductController::class, 'reviews'])->name('merchant.reviews');
    Route::get('/marchant/help', [MerchantProductController::class, 'help'])->name('merchant.help');
    Route::post('/merchant/orders/confirm/{id}', [MerchantOrderController::class, 'confirmOrder'])->name('merchant.orders.confirm');
    Route::post('/merchant/orders/delivered/{id}', [MerchantOrderController::class, 'markAsDelivered'])->name('merchant.orders.delivered');
    Route::delete('/merchant/orders/delete/{id}', [MerchantOrderController::class, 'deleteOrder'])->name('merchant.orders.delete');
    Route::delete('/merchant/products/{id}', [MerchantProductController::class, 'destroy'])->name('merchant.products.destroy');
});

Route::middleware('auth')->group(function () {
    // Become a Seller: store creation
    Route::post('/merchant/store', [StoreController::class, 'store'])->name('merchant.store');
});

Route::middleware(['auth'])->group(function () {});

Route::middleware(['auth'])->group(function () {});

// Route::get('/offers', [OfferController::class, 'index'])->name('offers');

// SSLCOMMERZ Start
// Route::get('/example1', [SslCommerzPaymentController::class, 'exampleEasyCheckout']);
Route::get('/example2', [SslCommerzPaymentController::class, 'exampleHostedCheckout'])->name('payment');

Route::post('/pay', [SslCommerzPaymentController::class, 'index']);
Route::post('/pay-via-ajax', [SslCommerzPaymentController::class, 'payViaAjax']);

Route::post('/success', [SslCommerzPaymentController::class, 'success']);

Route::post('/fail', [SslCommerzPaymentController::class, 'fail']);
Route::post('/cancel', [SslCommerzPaymentController::class, 'cancel']);

Route::post('/ipn', [SslCommerzPaymentController::class, 'ipn']);
// SSLCOMMERZ END

Route::get('google-login', [GoogleAuth::class, 'googleLogin'])->name('auth.google');
Route::get('auth/google/callback', [GoogleAuth::class, 'googleLoginCallback'])->name('auth.google.callback');

Route::get('/offers', [OfferController::class, 'index']);
Route::post('/offers', [OfferController::class, 'store']);
Route::put('/offers/{offer}', [OfferController::class, 'update']);
Route::delete('/offers/{offer}', [OfferController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| One-time maintenance route: rename legacy "ShopnoMela" admin/users to
| "Tajim BD Admin". Protected by a secret token in the URL so it cannot be
| triggered by random visitors. Safe to remove after running once in prod.
|--------------------------------------------------------------------------
| Usage:  https://tajimbd.com/fix-admin-name/tajimbd-secret-2026
*/
Route::get('/fix-admin-name/{token}', function (string $token) {
    abort_unless($token === 'tajimbd-secret-2026', 403, 'Invalid token');

    $updated = \App\Models\User::where('name', 'like', '%ShopnoMela%')
        ->orWhere('name', 'like', '%Shopno%')
        ->update(['name' => 'Tajim BD Admin']);

    return response()->json([
        'status' => 'ok',
        'updated_rows' => $updated,
        'message' => $updated > 0
            ? "Renamed {$updated} user(s) to 'Tajim BD Admin'."
            : "No 'ShopnoMela' users found — nothing to change.",
    ]);
})->name('fix.admin.name');

require __DIR__ . '/auth.php';
