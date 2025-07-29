<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ArtikelController extends Controller
{
    public function index(Request $request)
    {
        // Dummy kategori artikel
        $categories = [
            ['id' => 1, 'name' => 'Tips & Trik', 'slug' => 'tips-trik'],
            ['id' => 2, 'name' => 'Review Produk', 'slug' => 'review-produk'],
            ['id' => 3, 'name' => 'Berita Terkini', 'slug' => 'berita-terkini'],
        ];

        // Tambahkan URL ke setiap kategori
        $categories = collect($categories)->map(function ($category) {
            $category['href'] = route('artikel.index', ['kategori' => $category['slug']]);
            return $category;
        });

        // Dummy data artikel
        $allArticles = [
            [
                'id' => 1,
                'title' => 'tes with preview image edited',
                'slug' => 'tes-with-preview-image-edited',
                'meta_description' => 'test meta desc edited',
                'thumbnail_url' => 'https://dummyimage.com/600x400/000/fff&text=Preview+Image+1',
                'category_slug' => 'tips-trik',
                'tags' => ['tag1', 'tag2', 'tag3'],
                'status' => 'Draft',
                'content' => 'ini cuma test biasa, si anjas sebenernya gabut nulis manual kaya gini tapi gapapa dah edited5',
                'date' => '29 Juli 2025',
            ],
            [
                'id' => 2,
                'title' => 'Cara Mengatur Lighting Studio',
                'slug' => 'cara-mengatur-lighting-studio',
                'meta_description' => 'Panduan dasar untuk pencahayaan studio.',
                'thumbnail_url' => 'https://dummyimage.com/600x400/111/fff&text=Lighting',
                'category_slug' => 'tips-trik',
                'tags' => ['lighting', 'studio'],
                'status' => 'Published',
                'content' => 'Konten lengkap mengenai pengaturan pencahayaan dalam studio untuk keperluan fotografi.',
                'date' => '29 Juli 2025',
            ],
            [
                'id' => 3,
                'title' => 'Review Microphone Rode Terbaru',
                'slug' => 'review-microphone-rode',
                'meta_description' => 'Ulasan lengkap fitur dan performa Mic Rode.',
                'thumbnail_url' => 'https://dummyimage.com/600x400/222/fff&text=Mic+Rode',
                'category_slug' => 'review-produk',
                'tags' => ['microphone', 'audio', 'review'],
                'status' => 'Published',
                'content' => 'Review mendalam tentang microphone Rode terbaru, termasuk performa, build quality, dan harga.',
                'date' => '29 Juli 2025',
            ],
        ];


        // Tambahkan URL ke setiap artikel detail
        $allArticles = collect($allArticles)->map(function ($article) {
            $article['href'] = route('artikel.show', ['slug' => $article['slug']]);
            return $article;
        });

        // Ambil slug kategori jika ada di query
        $filterSlug = $request->query('kategori');

        // Filter artikel berdasarkan kategori
        $filteredArticles = $allArticles->when($filterSlug, function ($articles, $filterSlug) {
            return $articles->where('category_slug', $filterSlug);
        })->values();

        // Ambil nama kategori untuk breadcrumb
        $selectedCategory = $categories->firstWhere('slug', $filterSlug);
        $selectedCategoryName = $selectedCategory['name'] ?? null;

        // Breadcrumb
        $breadcrumb = array_filter([
            ['label' => 'Home', 'href' => route('home')],
            ['label' => 'Artikel', 'href' => route('artikel.index')],
            $selectedCategoryName
                ? ['label' => $selectedCategoryName, 'href' => route('artikel.index', ['kategori' => $filterSlug])]
                : null,
        ]);

        return Inertia::render('Front/ListArtikel', [
            'articles' => $filteredArticles,
            'categories' => $categories->all(),
            'selectedCategory' => $filterSlug,
            'breadcrumb' => $breadcrumb,
        ]);
    }

    // Tambahkan show() jika ada detail halaman artikel
    public function show($slug)
    {
        // Dummy list artikel lengkap
        $allArticles = [
            [
                'id' => 1,
                'title' => 'tes with preview image edited',
                'slug' => 'tes-with-preview-image-edited',
                'meta_description' => 'test meta desc edited',
                'thumbnail_url' => 'https://dummyimage.com/600x400/000/fff&text=Preview+Image+1',
                'content' => 'ini cuma test biasa, si anjas sebenernya gabut nulis manual kaya gini tapi gapapa dah edited5',
                'tags' => ['tag1', 'tag2'],
                'status' => 'Published',
                'date' => '29 Juli 2025',
            ],
            [
                'id' => 2,
                'title' => 'Cara Mengatur Lighting Studio',
                'slug' => 'cara-mengatur-lighting-studio',
                'meta_description' => 'Panduan dasar untuk pencahayaan studio.',
                'thumbnail_url' => 'https://dummyimage.com/600x400/111/fff&text=Lighting',
                'content' => 'Konten lighting lengkap...',
                'tags' => ['lighting', 'studio'],
                'status' => 'Published',
                'date' => '29 Juli 2025',
            ],
            [
                'id' => 3,
                'title' => 'Review Microphone Rode Terbaru',
                'slug' => 'review-microphone-rode',
                'meta_description' => 'Ulasan lengkap fitur dan performa Mic Rode.',
                'thumbnail_url' => 'https://dummyimage.com/600x400/222/fff&text=Mic+Rode',
                'content' => 'Mic Rode memang mantap...',
                'tags' => ['audio', 'microphone'],
                'status' => 'Published',
                'date' => '29 Juli 2025',
            ],
        ];

        // Cari artikel berdasarkan slug
        $article = collect($allArticles)->firstWhere('slug', $slug);

        // Jika tidak ditemukan, bisa return 404 atau redirect
        if (!$article) {
            abort(404, 'Artikel tidak ditemukan');
        }

        // Ambil related articles selain artikel ini, hanya yang Published
        $relatedArticles = collect($allArticles)
            ->where('id', '!=', $article['id'])
            ->where('status', 'Published')
            ->take(3)
            ->values();

        // Return ke Inertia
        return Inertia::render('Front/DetailArtikel', [
            'article' => $article,
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
