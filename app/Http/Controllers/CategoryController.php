<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Inertia\Inertia;
class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        sleep(1);
        $search = $request->input('search');
        $limit = $request->input('limit', 10);

        $query = Category::query()->where('status', '!=', 2);

        if ($search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('description', 'like', "%{$search}%");
        }

        $categories = $query->orderByDesc('created_at')->paginate($limit)->withQueryString();

        return inertia('Product/CategoryList', [
            'categories' => $categories,
            'search' => $search,
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    if ($value) {
                        $exists = Category::where('slug', $value)
                            ->where('status', '!=', 2)
                            ->exists();
                        if ($exists) {
                            $fail('Slug sudah digunakan.');
                        }
                    }
                }
            ],
            'status' => 'required|in:0,1',
        ]);

        Category::create($validated);

        return redirect()->route('category.index')->with('success', 'Kategori berhasil ditambahkan.');
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
    public function update(Request $request, $id)
    {
        $category = Category::where('id', $id)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) use ($category) {
                    if ($value) {
                        $exists = Category::where('slug', $value)
                            ->where('id', '!=', $category->id)
                            ->where('status', '!=', 2)
                            ->exists();
                        if ($exists) {
                            $fail('Slug sudah digunakan.');
                        }
                    }
                }
            ],
            'status' => 'required|in:0,1',
        ]);

        $category->update($validated);

        return redirect()->route('category.index')->with('success', 'Kategori berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function delete($id)
    {
        $category = Category::where('id', $id)->firstOrFail();
        $category->update(['status' => 2]);
        return redirect()->route('category.index')->with('success', 'Kategori berhasil dihapus.');
    }
}
