<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index()
    {
        $categories = \App\Models\Category::with(['subcategories' => function($q){
            $q->where('status', 1);
        }])
        ->where('status', 1)
        ->get()
        ->map(function ($cat) {
            return [
                'name' => $cat->name,
                'image' => $cat->image ? asset('storage/' . $cat->image) : asset('assets/dummy-image.jpg'),
                'href' => "/kategori/" . ($cat->slug ?? $cat->id),
                'subcategories' => $cat->subcategories->map(function ($sub) use ($cat) {
                    return [
                        'name' => $sub->name,
                        'href' => "/kategori/" . ($cat->slug ?? $cat->id) . "/" . ($sub->slug ?? $sub->id),
                        'slug' => $sub->slug ?? $sub->id,
                    ];
                }),
            ];
        });

        return Inertia::render('Front/Kategori', [
            'categories' => $categories,
            'breadcrumbs' => [
                ['label' => 'Home', 'href' => route('home')],
                ['label' => 'Kategori', 'href' => route('kategori.index')],
            ],
        ]);
    }


    public function show($slug, $sub = null)
    {
        // Ambil kategori berdasarkan slug
        $kategori = \App\Models\Category::where('slug', $slug)->where('status', '!=', 2)->firstOrFail();

        // Ambil subcategories aktif
        $subcategories = $kategori->subcategories()->where('status', 1)->get()->map(function ($subcat) use ($kategori) {
            // dd($subcat);
            return [
                'name' => $subcat->name,
                'slug' => $subcat->slug ?? $subcat->id,
                'href' => "/kategori/$kategori->slug/$subcat->slug",
            ];
        });

        // Jika subkategori dipilih, ambil subkategori
        $subSelected = null;
        if ($sub) {
            $subSelected = $kategori->subcategories()->where('slug', $sub)->where('status', 1)->first();
        }
        
        // Ambil produk berdasarkan kategori dan (jika ada) subkategori
        $productsQuery = \App\Models\Product::where('category_id', $kategori->id)->where('status', 1);
        if ($subSelected) {
            $productsQuery->where('subcategory_id', $subSelected->id);
        }
        $products = $productsQuery->get()->map(function ($product) {
            // dd($product->images->first());
            return [
                'name' => $product->name,
                'slug' => $product->slug,
                'image' => $product->images ? asset('storage/' . $product->images->first()->image) : asset('assets/dummy-image.jpg'),
                'subcategory' => $product->subcategory_id,
            ];
        });

        // dd($products);
        return Inertia::render('Front/DetailKategori', [
            'kategori' => [
                'name' => $kategori->name,
                'slug' => $kategori->slug,
                'image' => $kategori->image ? asset('storage/' . $kategori->image) : asset('assets/dummy-image.jpg'),
                'subcategories' => $subcategories,
            ],
            'sub_selected' => $subSelected ? $subSelected->slug : null,
            'products' => $products,
            'breadcrumb' => array_filter([
                ['label' => 'Home', 'href' => route('home')],
                ['label' => 'Kategori', 'href' => route('kategori.index')],
                ['label' => $kategori->name, 'href' => "/kategori/{$kategori->slug}"],
                $subSelected ? ['label' => $subSelected->name, 'href' => "/kategori/{$kategori->slug}/{$subSelected->slug}"] : null,
            ]),
        ]);
    }
}
