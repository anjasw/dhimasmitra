<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index()
    {
        
        $categories = collect(range(1, 40))->map(function ($i) {
            return [
                'name' => "Kategori $i",
                'image' => "assets/dummy-image.jpg",
                'href' => "/kategori/kategori-$i",
                'subcategories' => $i % 2 === 0
                    ? collect(range(1, $i % 3 === 0 ? 12 : 6))->map(function ($j) use ($i) {
                        return [
                            'name' => "Sub $i.$j",
                            'href' => "/kategori/kategori-$i/sub-$j",
                            'slug' => "sub-$j",
                        ];
                    })
                    : [],
            ];
        });

        return Inertia::render('Front/Kategori', [
            'categories' => $categories,
        ]);
    }


    public function show($slug, $sub = null)
    {
        $kategoriName = ucwords(str_replace('-', ' ', $slug));
        $subKategoriTerpilih = $sub ? ucwords(str_replace('-', ' ', $sub)) : null;

        $subcategories = collect(range(1, 6))->map(function ($i) use ($slug) {
            return [
                'name' => "Subkategori $i",
                'slug' => "sub-$i",
                'href' => "/kategori/$slug/sub-$i",
            ];
        });

        // Dummy produk
        $allProducts = collect(range(1, 12))->map(function ($i) use ($slug) {
            return [
                'name' => "Produk $i",
                'subcategory' => "sub-" . (($i % 6) + 1),
                'image' => "/img/produk-$i.jpg",
            ];
        });

        // Filter berdasarkan subkategori (jika ada)
        $filteredProducts = $sub
            ? $allProducts->where('subcategory', $sub)->values()
            : $allProducts;

        return Inertia::render('Front/DetailKategori', [
            'kategori' => [
                'name' => $kategoriName,
                'slug' => $slug,
                'image' => "/img/kategori.jpg",
                'subcategories' => $subcategories,
            ],
            'sub_selected' => $sub,
            'products' => $filteredProducts,
        ]);
    }
}
