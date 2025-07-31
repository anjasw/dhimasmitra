<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;

class ArtikelController extends Controller
{
    public function index(Request $request)
    {
        // Query artikel dari database, hanya yang Published
        $query = Post::query()->where('status', 'Published');

        // Filter pencarian judul jika ada (opsional)
        if ($request->filled('q')) {
            $query->where('title', 'like', '%' . $request->q . '%');
        }

        $articles = $query->orderByDesc('created_at')->get()->map(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'meta_description' => $article->meta_description,
                'thumbnail_url' => $article->thumbnail,
                'tags' => (array)json_decode($article->tags),
                'status' => $article->status,
                'content' => $article->content,
                'date' => $article->created_at->format('d M Y'),
                'href' => route('artikel.show', ['slug' => $article->slug]),
            ];
        });

        // Breadcrumb
        $breadcrumb = [
            ['label' => 'Home', 'href' => route('home')],
            ['label' => 'Artikel', 'href' => route('artikel.index')],
        ];

        return Inertia::render('Front/ListArtikel', [
            'articles' => $articles->values(),
            'breadcrumb' => $breadcrumb,
        ]);
    }

    public function show($slug)
    {
        $article = Post::where('slug', $slug)->firstOrFail();
        $isFullUrl = preg_match('/^https?:\/\//', $article->thumbnail);
        $article->thumbnail = $isFullUrl ? $article->thumbnail : ($article->thumbnail ? asset('storage/' . $article->thumbnail) : asset('assets/dummy-image.jpg'));

        
        // dd($article->id);
        // Related articles: ambil 3 artikel lain yang published dan bukan artikel ini
        $relatedArticles = Post::where('status', 'published')
            ->where('id', '!=', $article->id)
            ->orderByDesc('created_at')
            ->take(3)
            ->get()
            ->map(function ($item) {
                $isFullUrl = preg_match('/^https?:\/\//', $item->thumbnail);
                // dd(asset('storage/' . $item->thumbnail));
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'meta_description' => $item->meta_description,
                    'thumbnail_url' => $isFullUrl
                        ? $item->thumbnail
                        : ($item->thumbnail ? asset('storage/' . $item->thumbnail) : asset('assets/dummy-image.jpg')),
                    // 'thumbnail_url' => $item->thumbnail,
                    'date' => $item->created_at->format('d M Y'),
                ];
            });

        // dd($relatedArticles);

        return Inertia::render('Front/DetailArtikel', [
            'article' => [
                'id' => $article->id,
                'title' => $article->title,
                'slug' => $article->slug,
                'meta_description' => $article->meta_description,
                'thumbnail_url' => $article->thumbnail,
                'content' => $article->content,
                'tags' => (array)json_decode($article->tags),
                'status' => $article->status,
                'date' => $article->created_at->format('d M Y'),
            ],
            'relatedArticles' => $relatedArticles,
        ]);
    }
}
