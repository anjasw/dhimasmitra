<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        // sleep(1);
        // Ambil kategori dari database dan hitung jumlah produk per kategori
        $categories = \App\Models\Category::where('status', 1)
            ->withCount(['products' => function($q) {
                $q->where('status', 1);
            }])
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'href' => route('kategori.show', ['slug' => $category->slug]),
                    'products_count' => $category->products_count,
                ];
            })
            // Urutkan: yang ada produk dulu, jika sama urut abjad
            ->sort(function($a, $b) {
                if ($a['products_count'] === $b['products_count']) {
                    return strcmp($a['name'], $b['name']);
                }
                return $b['products_count'] <=> $a['products_count'];
            })
            ->values();

        // Tangkap filter kategori berdasarkan slug (jika ada)
        $filterSlug = $request->query('kategori');

        // Ambil produk dari database, filter jika ada kategori
        $productsQuery = \App\Models\Product::with('category')
            ->where('status', 1);

        if ($filterSlug) {
            $category = \App\Models\Category::where('slug', $filterSlug)->first();
            if ($category) {
                $productsQuery->where('category_id', $category->id);
            }
        }

        $products = $productsQuery->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'price' => $product->fix_price,
                'category_slug' => $product->category->slug ?? null,
                'image_url' => $product->images->first()
                    ? asset('storage/' . $product->images->first()->image)
                    : asset('assets/dummy-image.jpg'),
                'href' => "/{$product->slug}",
            ];
        });

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
            'products' => $products,
            'categories' => $categories,
            'selectedCategory' => $filterSlug,
            'breadcrumb' => $breadcrumb,
        ]);
    }
}
