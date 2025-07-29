<?php

use App\Http\Controllers\KategoriController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileUserController;
use App\Http\Controllers\ShopController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
// use App\Http\Middleware\AdminMiddleware;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function (){
    Route::delete('/cart', [FrontController::class, 'deleteCart'])->name('cart.delete');
    Route::get('/account/order', [FrontController::class, 'AccountOrder'])->name('account.order');

    Route::post('/cart/update', [FrontController::class, 'updateCart'])->middleware(['auth', 'verified']);
    
    Route::post('/cart/checkout', [FrontController::class, 'checkoutCart']);
    Route::get('/profile', [ProfileUserController::class, 'index'])->name('profile');
    Route::post('/profile/update', [ProfileUserController::class, 'updateProfile']);
    Route::post('/profile/avatar', [ProfileUserController::class, 'updateAvatar']);

    Route::post('/profile/address/store', [ProfileUserController::class, 'storeAddress']);
    Route::post('/profile/address/{id}/update', [ProfileUserController::class, 'updateAddress']);
    Route::post('/profile/address/{id}/delete', [ProfileUserController::class, 'deleteAddress']);

    Route::post('/profile/bank/store', [ProfileUserController::class, 'storeBank']);
    Route::post('/profile/bank/{id}/update', [ProfileUserController::class, 'updateBank']);
    Route::post('/profile/bank/{id}/delete', [ProfileUserController::class, 'deleteBank']);
    Route::post('/profile/password', [ProfileUserController::class, 'updatePassword']);

    Route::post('cart/add', [FrontController::class, 'addToCart'])->name('cart.add');
});

// Route untuk produk detail berdasarkan slug
// Route::get('/{slugkategori}/{slugproduct}', function ($slugproduct) {
//     // Ganti dengan controller produk jika ada
//     return Inertia::render('Product/Detail', [
//         'slug' => $slugproduct,
//     ]);
// })->name('product.detail');

Route::middleware(['auth', 'verified','is_admin'])->group(function () {
    Route::get('/sysadmin/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::prefix('sysadmin')->group(function () {
        // Profile
        Route::get('/', function () {
            return redirect('/sysadmin/dashboard');
        });

        Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // Post resource, binding by slug
        Route::resource('post', PostController::class)
            ->parameters(['post' => 'slug'])
            ->names('post');

        Route::post('post/{slug}', [PostController::class, 'update'])->name('post.update');

        Route::resource('product', ProductController::class)
            ->except(['product.update'])
            ->parameters(['product' => 'slug'])
            ->names('product');

        Route::post('product/update/{id}', [ProductController::class,'update'])->name('product.update');

        Route::resource('brand', BrandController::class)
            ->parameters(['brand' => 'slug'])
            ->names('brand');

        Route::resource('category', CategoryController::class)->parameters(['category' => 'id']);
        Route::post('/category/{id}', [CategoryController::class, 'update'])->name('category.update');
        // Route::resource('category', CategoryController::class)
        //     ->parameters(['category' => 'slug'])
        //     ->names('category');

        Route::put('/category/{category}/delete', [CategoryController::class, 'delete'])->name('category.delete');
        
        Route::get('category/{slug}/sub_category', [SubCategoryController::class, 'index'])->name('sub_category.list');
        Route::post('/category/{category_id}/sub-category', [SubCategoryController::class, 'store'])->name('sub_category.store');
        Route::put('/category/{category_id}/sub-category/{id}', [SubCategoryController::class, 'update'])->name('sub_category.update');

        Route::put('/category/{category_id}/sub-category/{id}/delete', [SubCategoryController::class, 'delete'])->name('sub_category.delete');
        // Route::resource('sub_category', SubCategoryController::class)
        //     ->parameters(['sub_category' => 'slug'])
        //     ->names('sub_category');

        Route::resource('brand', BrandController::class)->parameters(['brand' => 'id']);
        Route::put('/brand/{brand}/delete', [BrandController::class, 'delete'])->name('brand.delete');
        Route::post('/brand/{id}', [BrandController::class, 'update'])->name('brand.update');


        // Route::get('/pages/about', [PagesController::class, 'about'])->name('pages.about');
        // Route::post('/pages/about', [PagesController::class, 'saveAbout'])->name('about.save');
        // Route::get('/pages/contact', [PagesController::class, 'contact'])->name('pages.contact');
        // Route::post('/pages/contact', [PagesController::class, 'saveContact'])->name('contact.save');
        Route::get('/reporting', [PagesController::class, 'reporting'])->name('reporting.index');
        
        Route::get('/pages/slider', [SliderController::class, 'index'])->name('pages.slider');
        Route::post('/pages/slider/add', [SliderController::class, 'store'])->name('pages.slider.add');
        Route::post('/pages/slider/update/{slider}', [SliderController::class, 'update'])->name('pages.slider.update');
        Route::delete('/pages/slider/delete/{slider}', [SliderController::class, 'destroy'])->name('pages.slider.delete');

        Route::get('/orders', [OrderController::class, 'list'])->name('orders');


        // Route::get('/pages/about', [PagesController::class, 'about'])->name('pages.about');
        Route::get('/pages/about', [PagesController::class, 'about'])->name('pages.about');
        Route::post('/pages/about/update', [PagesController::class, 'aboutUpdate'])->name('pages.about.update');

        Route::get('/pages/contact', [PagesController::class, 'contact'])->name('pages.contact');
        Route::post('/pages/contact', [PagesController::class, 'contactStore'])->name('pages.contact.store');
    });
});

require __DIR__ . '/auth.php';

Route::get('/', [FrontController::class, 'home'])->name('home');

Route::get('/cart', [FrontController::class, 'cart'])->name('cart.index');

Route::get('/order', [FrontController::class, 'order'])->name('order.index');


Route::get('/kategori', [KategoriController::class, 'index'])->name('kategori.index');
Route::get('/kategori/{slug`}', [KategoriController::class, 'show'])->name('kategori.show');
Route::get('/kategori/{slug}/{sub?}', [KategoriController::class, 'show'])->name('kategori.show');

Route::post('/account/order/success', [FrontController::class, 'AccountOrderSuccess'])->name('account.order.success');
Route::get('/account/order/fail', [FrontController::class, 'AccountOrderFail'])->name('account.order.fail');
Route::get('/account/order/error', [FrontController::class, 'AccountOrderError'])->name('account.order.error');

Route::post('/snap/token', [PaymentController::class, 'getSnapToken']);

Route::get('/tentang', [PagesController::class, 'tentangKami'])->name('tentang.index');

Route::get('/kontak', [PagesController::class, 'kontakKami'])->name('kontak.index');

Route::get('/payment/notification/success', [PaymentController::class, 'handlePaymentMidtrans'])->name('notification.success');
Route::get('/payment/notification/pay_account', [PaymentController::class, 'handlePayAccount'])->name('notification.pay_account');
Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/blog/{slug}', [PostController::class, 'showBlog'])->name('blog.detail');
Route::get('/{slug}', [FrontController::class, 'show'])->name('product.show');

