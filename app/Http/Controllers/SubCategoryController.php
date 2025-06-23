<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\SubCategory;
use App\Models\Category;
class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $category_id)
    {
        sleep(1);
        $search = $request->input('search');
        $limit = $request->input('limit', 10);

        $category = Category::findOrFail($category_id);
        $query = SubCategory::query()->where('status','!=', 2);
        
        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        $sub_categories = $query->orderByDesc('created_at')->paginate($limit)->withQueryString();

        return inertia('Product/SubCategoryList', [
            'category' => $category->name,
            'id_category' => $category_id,
            'sub_categories' => $sub_categories,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
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
    public function store(Request $request, $category_id)
    {
        sleep(1);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    if ($value) {
                        $exists = \App\Models\SubCategory::where('slug', $value)
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

        $validated['category_id'] = $category_id;

        SubCategory::create($validated);

        return redirect()->back()->with('success', 'Sub kategori berhasil ditambahkan.');
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
    public function update(Request $request, $category_id, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:sub_categories,slug,' . $id,
            'status' => 'required|in:0,1',
        ]);

        $subCategory = SubCategory::where('category_id', $category_id)->findOrFail($id);
        $subCategory->update($validated);

        return redirect()->back()->with('success', 'Sub kategori berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(string $id)
    // {
    //     SubCategory::where('id', $id)->update(['status' => 2]);
    //     return redirect()->route('sub_category.list')->with('success', 'Sub Category berhasil dihapus!');
    // }

    public function delete(Request $request, $category_id, $id)
    {
        sleep(1);
        $subCategory = SubCategory::where('category_id', $category_id)->findOrFail($id);
        $subCategory->update(['status' => 2]);
        return redirect()->back()->with('success', 'Sub kategori berhasil dihapus.');
    }
}
