<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin'      => Route::has('login'),
        'canRegister'   => Route::has('register'),
        'laravelVersion'=> Application::VERSION,
        'phpVersion'    => PHP_VERSION,
    ]);
});

Route::get('/blog/{slug}', [PostController::class, 'showBlog'])->name('blog.detail');

// Route untuk produk detail berdasarkan slug
// Route::get('/{slugkategori}/{slugproduct}', function ($slugproduct) {
//     // Ganti dengan controller produk jika ada
//     return Inertia::render('Product/Detail', [
//         'slug' => $slugproduct,
//     ]);
// })->name('product.detail');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/sysadmin/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::prefix('sysadmin')->group(function () {
        // Profile
        Route::get('/', function(){
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
            ->parameters(['product' => 'slug'])
            ->names('product');
    });
});

require __DIR__.'/auth.php';