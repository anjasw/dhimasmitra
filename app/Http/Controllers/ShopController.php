<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        // Simulasi data kategori dengan slug
        $categories = [
            ['id' => 1, 'name' => 'Aksesoris Kamera', 'slug' => 'aksesoris-kamera'],
            ['id' => 2, 'name' => 'Audio', 'slug' => 'audio'],
            ['id' => 3, 'name' => 'Lighting & Studio', 'slug' => 'lighting-studio'],
        ];

        // Buat URL href kategori
        $categories = collect($categories)->map(function ($category) {
            $category['href'] = route('kategori.show', ['slug' => $category['slug']]);
            return $category;
        });

        // Simulasi data produk
        $allProducts = [
            [
                'id' => 1,
                'name' => 'SmallRig Battery',
                'slug' => 'smallrig-battery',
                'price' => 2926300,
                'category_slug' => 'aksesoris-kamera',
                'image_url' => 'https://dummyimage.com/600x600/000/fff&text=SmallRig+Battery',
            ],
            [
                'id' => 2,
                'name' => 'Silica Gel Electric',
                'slug' => 'silica-gel-electric',
                'price' => 119900,
                'category_slug' => 'aksesoris-kamera',
                'image_url' => 'https://dummyimage.com/600x600/3e3e3e/ffffff&text=Silica+Gel+Electric',
            ],
            [
                'id' => 3,
                'name' => 'Monopod Benro',
                'slug' => 'monopod-benro',
                'price' => 3129000,
                'category_slug' => 'aksesoris-kamera',
                'image_url' => 'https://dummyimage.com/600x600/5a5a5a/ffffff&text=Monopod+Benro',
            ],
            [
                'id' => 4,
                'name' => 'Microphone Rode',
                'slug' => 'microphone-rode',
                'price' => 1499000,
                'category_slug' => 'audio',
                'image_url' => 'https://dummyimage.com/600x600/1e1e1e/ffffff&text=Mic+Rode',
            ],
            [
                'id' => 5,
                'name' => 'LED Light Panel',
                'slug' => 'led-light-panel',
                'price' => 799000,
                'category_slug' => 'lighting-studio',
                'image_url' => 'https://dummyimage.com/600x600/eaeaea/333333&text=LED+Light+Panel',
            ],
        ];


        // Tambahkan URL detail produk
        $allProducts = collect($allProducts)->map(function ($product) {
            $product['href'] = route('produk.show', ['slug' => $product['slug']]);
            return $product;
        });

        // Tangkap filter kategori berdasarkan slug (jika ada)
        $filterSlug = $request->query('kategori');

        // Filter produk berdasarkan slug kategori
        $filteredProducts = $allProducts->when($filterSlug, function ($products, $filterSlug) {
            return $products->where('category_slug', $filterSlug);
        })->values();

        // Cek nama kategori yang dipilih (untuk breadcrumb)
        $selectedCategory = $categories->firstWhere('slug', $filterSlug);
        $selectedCategoryName = $selectedCategory['name'] ?? null;

        // Breadcrumb
        $breadcrumb = array_filter([
            ['label' => 'Home', 'href' => route('home')],
            ['label' => 'Shop', 'href' => route('shop.index')],
            $selectedCategoryName
                ? ['label' => $selectedCategoryName, 'href' => route('shop.index', ['kategori' => $filterSlug])]
                : null,
        ]);

        return Inertia::render('Front/Shop', [
            'products' => $filteredProducts,
            'categories' => $categories->all(),
            'selectedCategory' => $filterSlug,
            'breadcrumb' => $breadcrumb,
        ]);
    }
}
