<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        sleep(1); // Simulate a delay for demonstration purposes
        $limit = request('limit', 10); // default 10 jika tidak ada
        $search = $request->input('search');
        $query = Post::query()
                ->where('status', '!=', 'deleted')
                ->with(['user']);

        // Filter status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter author (misal berdasarkan nama user)
        if ($request->filled('author')) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('user_id', $request->author);
            });
        }
        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                ->orWhereHas('user', function($qu) use ($search) {
                    $qu->where('name', 'like', "%{$search}%");
                });
            });
        }

        $author = User::whereHas('posts', function($q) {
                $q->where('status', '!=', 'deleted');
            })
            ->orderBy('name')
            ->get(['id', 'name']);
        
        $posts = $query->orderBy('created_at', 'desc')
            ->paginate($limit)
            ->through(fn ($post) => [
                'id' => $post->id,
                'thumbnail' => $post->thumbnail,
                'title' => $post->title,
                'content' => $post->content,
                'user_id' => $post->user_id,
                'user_name' => $post->user?->name, // Ambil nama user dari relasi
                'meta_description' => $post->meta_description,
                'slug' => $post->slug,
                'view_count' => $post->view_count,
                'tags' => $post->tags,
                'status' => $post->status,
                'language' => $post->language,
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
            ])
            ->withQueryString();
        return Inertia::render('Post/ListData', [
            'posts' => $posts,
            'limit' => (int) $limit,
            'search' => $search,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
            'filterStatus' => array(
                'draft','published','archived'
            ),
            'filterAuthor' => $author
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        sleep(1); // Simulate a delay for demonstration purposes
        return Inertia::render('Post/FormCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'thumbnail' => 'required|image|max:2048',
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'meta_description' => 'required|string|max:500',
            'slug' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    if ($value) {
                        $exists = Post::where('slug', $value)
                            ->where('status', '!=', 'deleted')
                            ->exists();
                        if ($exists) {
                            $fail('Slug sudah digunakan.');
                        }
                    }
                }
            ],
            // 'tags' => 'nullable|string',
            'status' => 'required|in:draft,published,archived',
            'language' => 'required|in:id,en',
        ]);

        // Proses upload thumbnail jika ada
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        } else {
            $validated['thumbnail'] = null;
        }

        $validated['user_id'] = auth()->id();
        $validated['tags'] = json_encode(explode(',', $request->input('tags', ''))); // Default to empty array if not provided

        Post::create($validated);

        return redirect()->route('post.index')->with('success', 'Post berhasil ditambahkan!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        sleep(1);
        $post = Post::findOrFail($id);
        $tags = (array)json_decode($post->tags, true);
        $strTags = implode(',', $tags);
        $post->tags = $strTags; // Decode tags from JSON to array
        
        return inertia("Post/FormEdit", [
            'posts' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd($request);
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'meta_description' => 'required|string|max:500',
            'slug' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) use ($id) {
                    if ($value) {
                        $exists = Post::where('slug', $value)
                            ->where('id', '!=', $id)
                            ->where('status', '!=', 'deleted')
                            ->exists();
                        if ($exists) {
                            $fail('Slug sudah digunakan.');
                        }
                    }
                }
            ],
            'status' => 'required|in:draft,published,archived',
            'language' => 'required|in:id,en',
            // 'thumbnail' => 'nullable|image|max:2048',
            'tags' => 'nullable|string',
        ]);

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        } else {
            unset($validated['thumbnail']);
        }

        $validated['user_id'] = auth()->id();
        $validated['tags'] = json_encode(explode(',', $request->input('tags', '')));
        // dd($validated);
        // Update manual berdasarkan id
        \App\Models\Post::where('id', $id)->update($validated);

        return redirect()->route('post.index')->with('success', 'Post berhasil diperbarui!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id, Post $post)
    {
        // dd($id);

        Post::where('id', $id)->update(['status' => 'deleted']);
        return redirect()->route('post.index')->with('success', 'Post berhasil dihapus!');
        
    }


    public function showBlog($slug){
        // dd($slug);
        $post = Post::where('slug', $slug)->firstOrFail();

        // dd($post);

        return Inertia::render('Front/DetailBlog', [
            'posts' =>  $post
        ]);
        
    }
}
