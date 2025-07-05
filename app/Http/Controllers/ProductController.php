<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Brand;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Color;
use App\Models\Size;
use Inertia\Inertia;

use Illuminate\Support\Str;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        // dd(config('couriers'));
        sleep(1); // Simulate a delay for demonstration purposes
        $search = $request->input('search');
        $limit = request('limit', 10); // default 10 jika tidak ada
        $query = Product::query()
            ->where('status', '!=' ,'99')
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
            'categories' => $categories,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        sleep(1);

        $brands = Brand::query()->where('status', 1)->orderByDesc('id')->get();
        $categories = Category::query()->where('status', 1)->orderByDesc('id')->get();
        $subcategories = SubCategory::query()->where('status', 1)->orderByDesc('id')->get();
        return Inertia::render('Product/ProductAdd', [
            'brands' => $brands,
            'categories' => $categories,
            'subcategories' => $subcategories,
            'colors' => Color::query()->get(),
            'sizes' => Size::query()->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validasi semua field (required)
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'weight' => 'required|numeric',
            'fixPrice' => 'required|numeric',
            'discount' => 'required|numeric',
            'stock' => 'required|integer',
            'minStock' => 'required|integer',
            'minOrder' => 'required|integer',
            'brand.value' => 'required|integer',
            'category.value' => 'required|integer',
            'subcategory.value' => 'required|integer',
            'colors' => 'required|array|min:1',
            'colors.*.value' => 'required|string',
            'sizes' => 'required|array|min:1',
            'sizes.*.value' => 'required|string',
            'images' => 'required|array|min:1',
            'images.*' => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Ambil ID dari objek brand/category/subcategory
        $brandId = $request->input('brand.value');
        $categoryId = $request->input('category.value');
        $subcategoryId = $request->input('subcategory.value');
        
        if($request->type === 'save') {
            $status = 2; // Set status ke draft
        } else {
            $status = 1; // Set status ke publish
        }
        // Buat produk
        $product = Product::create([
            'name' => $request->input('name'),
            'slug' => Str::slug($request->input('name')) . '-' . uniqid(),
            'sku' => $request->input('sku'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'weight' => $request->input('weight'),
            'fix_price' => $request->input('fixPrice'),
            'discount' => $request->input('discount'),
            'stock' => $request->input('stock'),
            'minimum_stock' => $request->input('minStock'),
            'minimum_order' => $request->input('minOrder'),
            'brand_id' => $brandId,
            'category_id' => $categoryId,
            'subcategory_id' => $subcategoryId,
            'status' => $status,
            'user_id' => auth()->id(), // Asumsikan ada user yang sedang login
        ]);

        // Simpan relasi warna
        $colorIds = collect($request->input('colors'))->pluck('value')->toArray();
        $product->colors()->sync($colorIds);

        // Simpan relasi ukuran
        $sizeIds = collect($request->input('sizes'))->pluck('value')->toArray();
        $product->sizes()->sync($sizeIds);

        // Simpan dan convert setiap gambar ke .webp
        $isFirstImage = true;

        foreach ($request->file('images') as $img) {
            $filename = uniqid('product_') . '.webp';
            $relativePath = 'products/' . $filename;
            $fullPath = storage_path('app/public/' . $relativePath);

            // Baca file gambar asli
            $imageResource = null;
            $mime = $img->getMimeType();
            if ($mime === 'image/jpeg') {
                $imageResource = imagecreatefromjpeg($img->getPathname());
            } elseif ($mime === 'image/png') {
                $imageResource = imagecreatefrompng($img->getPathname());
            } elseif ($mime === 'image/webp') {
                $imageResource = imagecreatefromwebp($img->getPathname());
            }

            if ($imageResource) {
                imagewebp($imageResource, $fullPath, 80);
                imagedestroy($imageResource);

                // Simpan ke database
                ProductImage::create([
                    'product_id' => $product->id,
                    'image' => $relativePath,
                    'is_primary' => $isFirstImage ? 1 : 0,
                ]);

                $isFirstImage = false;
            }
        }

        

        return redirect()->route('product.index')->with('success', 'Product berhasil ditambahkan!');

        // return response()->json([
        //     'message' => 'Produk berhasil disimpan',
        //     'product' => $product->load(['images', 'colors', 'sizes']),
        // ]);
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
        sleep(1);

        $brands = Brand::query()->where('status', 1)->orderByDesc('id')->get();
        $categories = Category::query()->where('status', 1)->orderByDesc('id')->get();
        $subcategories = SubCategory::query()->where('status', 1)->orderByDesc('id')->get();
        return Inertia::render('Product/ProductEdit', [
            'brands' => $brands,
            'categories' => $categories,
            'subcategories' => $subcategories,
            'colors' => Color::query()->get(),
            'sizes' => Size::query()->get(),
            // 'dataExists' => Product::with('category')->with('subcategory')->with('brand')->findOrFail($id)
            'dataExists' => Product::with(['category','subcategory','brand','colors','sizes','images'])->findOrFail($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::where('id', $id)->firstOrFail();
        // dd($request->input('colors.*.value'));
        // dd($request->type);

        // Validasi semua field (required)
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|max:255',
            'description' => 'required',
            'price' => 'required',
            'weight' => 'required',
            'fixPrice' => 'required',
            'discount' => 'required',
            'stock' => 'required',
            'minStock' => 'required',
            'minOrder' => 'required',
            'brand.value' => 'required',
            'category.value' => 'required',
            'subcategory.value' => 'required',
            'colors' => 'required|array|min:1',
            'colors.*.value' => 'required',
            'sizes' => 'required|array|min:1',
            'sizes.*.value' => 'required',
            // 'images' => 'required|array|min:1',
            // 'images.*' => 'nullable|image|max:2048',
        ]);

        // Ambil ID dari objek brand/category/subcategory
        $brandId = $request->input('brand.value');
        $categoryId = $request->input('category.value');
        $subcategoryId = $request->input('subcategory.value');
        
        // $product->update($validated);
        if($request->type == 'save'){
            $status = 2; // Set status ke draft
        } else {
            $status = 1; // Set status ke publish
        }
        // Buat produk
        $product->update([
            'name' => $request->input('name'),
            'slug' => Str::slug($request->input('name')) . '-' . uniqid(),
            'sku' => $request->input('sku'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'weight' => $request->input('weight'),
            'fix_price' => $request->input('fixPrice'),
            'discount' => $request->input('discount'),
            'stock' => $request->input('stock'),
            'minimum_stock' => $request->input('minStock'),
            'minimum_order' => $request->input('minOrder'),
            'brand_id' => $brandId,
            'category_id' => $categoryId,
            'subcategory_id' => $subcategoryId,
            'status' => $status, // Set status ke draft atau publish
            'user_id' => auth()->id(),
        ]);

        // Simpan relasi warna
        $colorIds = collect($request->input('colors'))->pluck('value')->toArray();
        $product->colors()->sync($colorIds);

        // Simpan relasi ukuran
        $sizeIds = collect($request->input('sizes'))->pluck('value')->toArray();
        $product->sizes()->sync($sizeIds);

        // Hapus gambar lama jika ada gambar baru diupload
        if ($request->hasFile('images')) {
            // Ambil semua gambar lama
            $oldImages = $product->images;
            foreach ($oldImages as $oldImg) {
                // Hapus file fisik jika ada
                $oldPath = storage_path('app/public/' . $oldImg->image);
                if (file_exists($oldPath)) {
                    @unlink($oldPath);
                }
                // Hapus record di database
                $oldImg->delete();
            }
        }

        // Simpan dan convert setiap gambar ke .webp
        $isFirstImage = true;
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $img) {
                $filename = uniqid('product_') . '.webp';
                $relativePath = 'products/' . $filename;
                $fullPath = storage_path('app/public/' . $relativePath);

                // Baca file gambar asli
                $imageResource = null;
                $mime = $img->getMimeType();
                if ($mime === 'image/jpeg') {
                    $imageResource = imagecreatefromjpeg($img->getPathname());
                } elseif ($mime === 'image/png') {
                    $imageResource = imagecreatefrompng($img->getPathname());
                } elseif ($mime === 'image/webp') {
                    $imageResource = imagecreatefromwebp($img->getPathname());
                }

                if ($imageResource) {
                    imagewebp($imageResource, $fullPath, 80);
                    imagedestroy($imageResource);

                    // Simpan ke database
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image' => $relativePath,
                        'is_primary' => $isFirstImage ? 1 : 0,
                    ]);

                    $isFirstImage = false;
                }
            }
        }

        

        // dd($status);

        // Siapkan data update
        $updateData = [
            'name' => $request->input('name'),
            'slug' => Str::slug($request->input('name')) . '-' . uniqid(),
            'sku' => $request->input('sku'),
            'description' => $request->input('description'),
            'price' => $request->input('price'),
            'weight' => $request->input('weight'),
            'fix_price' => $request->input('fixPrice'),
            'discount' => $request->input('discount'),
            'stock' => $request->input('stock'),
            'minimum_stock' => $request->input('minStock'),
            'minimum_order' => $request->input('minOrder'),
            'brand_id' => $brandId,
            'category_id' => $categoryId,
            'subcategory_id' => $subcategoryId,
            'status' => $status, // Set status ke draft atau publish
            'user_id' => auth()->id(),
        ];


        // dd($updateData);

        // if($product->update($updateData)){
            return redirect()->route('product.index')->with('success', 'Product berhasil diupdate!');
        // } else {
            // return redirect()->back()->with('error', 'Gagal mengupdate produk!');
        // }


        // return response()->json([
        //     'message' => 'Produk berhasil disimpan',
        //     'product' => $product->load(['images', 'colors', 'sizes']),
        // ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Product::where('id', $id)->update(['status' => 99]);
        return redirect()->route('product.index')->with('success', 'Product berhasil dihapus!');
    }
}
