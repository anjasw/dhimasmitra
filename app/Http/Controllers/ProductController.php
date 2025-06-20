<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        sleep(1); // Simulate a delay for demonstration purposes
        $limit = request('limit', 10); // default 10 jika tidak ada
        return Inertia::render('Product/ListProduct', [
            'products' => Product::query()
                ->with(['user'])
                ->orderByDesc('created_at')
                ->paginate($limit)
                ->withQueryString()
                ->through(fn ($product) => [
                    'id' => $post->id,
                    'thumbnail' => $post->thumbnail,
                    'title' => $post->title,
                    'content' => $post->content,
                    'user_id' => $post->user_id,
                    'meta_description' => $post->meta_description,
                    'slug' => $post->slug,
                    'view_count' => $post->view_count,
                    'tags' => $post->tags,
                    'status' => $post->status,
                    'language' => $post->language,
                    'created_at' => $post->created_at,
                    'updated_at' => $post->updated_at,
                ]),
            'limit' => (int) $limit,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
