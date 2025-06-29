<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\FrontController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
// use App\Http\Middleware\AdminMiddleware;
use Inertia\Inertia;

Route::get('/', [FrontController::class, 'home']);

Route::get('/blog/{slug}', [PostController::class, 'showBlog'])->name('blog.detail');

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
    });
});

require __DIR__.'/auth.php';