<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Inertia\Inertia;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        sleep(1); // Simulate a delay for demonstration purposes
        $search = $request->input('search');
        $limit = request('limit', 10); // default 10 jika tidak ada
        $query = Product::query()
            ->where('status', '!=' ,'2')
            ->with(['user', 'category', 'brand', 'images']
        );
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                ->orWhereHas('brand', function ($q2) use ($search) {
                    $q2->where('name', 'like', "%{$search}%");
                })
                ->orWhereHas('category', function ($q3) use ($search) {
                    $q3->where('name', 'like', "%{$search}%");
                });
            });
        }
        $products = $query
            ->orderByDesc('created_at')
            ->paginate($limit)
            ->through(fn ($products) => [
                "id" => $products->id,
                "product_name" => $products->name,
                "price" => 'Rp '.number_format($products->fix_price, 0, ',', '.'),
                "created_at" => $products->created_at,
                "sku" => $products->sku,
                "status" => $products->status,
                "images" => $products->images,
                "brand_name" => $products->brand?->name,
                "category_name" => $products->category?->name,
        ]);
        $brands = Brand::query()->where('status', '1')->get();
        $categories = Category::query()->where('status', '1')->get();
        return Inertia::render('Product/ProductList', [
            'products' => $products,
            'limit' => (int) $limit,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
            'search' => $search,
            'brands' => $brands,
            'categories' => $categories

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        sleep(1);
        return Inertia::render('Product/ProductAdd');
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
        Product::where('id', $id)->update(['status' => 2]);
        return redirect()->route('product.index')->with('success', 'Product berhasil dihapus!');
    }
}
