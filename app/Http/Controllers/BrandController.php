<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Brand;
use Inertia\Inertia;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        sleep(1);
        $query = Brand::query()->where('status', '!=', 2);

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $brands = $query->orderBy('id', 'desc')->paginate($request->limit ?? 10);

        return inertia('Product/BrandList', [
            'brands' => $brands,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
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
        sleep(1);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'required', 'string', 'max:255',
                function ($attribute, $value, $fail) {
                    if (Brand::where('slug', $value)->where('status', '!=', 2)->exists()) {
                        $fail('Slug sudah digunakan.');
                    }
                }
            ],
            'status' => 'required|in:0,1',
            'image' => 'nullable|image|max:2048',
        ]);

        // if ($request->hasFile('image')) {
        //     $validated['image'] = $request->file('image')->store('brands', 'public');
        // }
        if ($request->hasFile('image')) {
            $img = $request->file('image');
            $filename = uniqid('brand_') . '.webp';
            $path = storage_path('app/public/brands/' . $filename);

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
                // Simpan sebagai webp (quality 80)
                imagewebp($imageResource, $path, 80);
                imagedestroy($imageResource);

                // Simpan path ke database (relatif ke public)
                $validated['image'] = 'brands/' . $filename;
            }
        }

        Brand::create($validated);

        return redirect()->route('brand.index')->with('success', 'Brand berhasil ditambahkan.');
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
        sleep(1);
        $brand = Brand::where('id', $id)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => [
                'required', 'string', 'max:255',
                function ($attribute, $value, $fail) use ($brand) {
                    if (Brand::where('slug', $value)->where('id', '!=', $brand->id)->where('status', '!=', 2)->exists()) {
                        $fail('Slug sudah digunakan.');
                    }
                }
            ],
            'status' => 'required|in:0,1',
            'image' => 'nullable|image|max:2048',
        ]);

        // if ($request->hasFile('image')) {
        //     // Hapus file lama jika ada
        //     if ($brand->image && \Storage::disk('public')->exists($brand->image)) {
        //         \Storage::disk('public')->delete($brand->image);
        //     }
        //     $validated['image'] = $request->file('image')->store('brands', 'public');
        // }
        if ($request->hasFile('image')) {
            // Hapus file lama jika ada
            if ($brand->image && \Storage::disk('public')->exists($brand->image)) {
                \Storage::disk('public')->delete($brand->image);
            }

            $img = $request->file('image');
            $filename = uniqid('brand_') . '.webp';
            $path = storage_path('app/public/brands/' . $filename);

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
                // Simpan sebagai webp (quality 80)
                imagewebp($imageResource, $path, 80);
                imagedestroy($imageResource);

                // Simpan path ke database (relatif ke public)
                $validated['image'] = 'brands/' . $filename;
            }
        }

        $brand->update($validated);

        return redirect()->route('brand.index')->with('success', 'Brand berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function delete(string $id)
    {
        $brand = Brand::where('id', $id)->firstOrFail();
        $brand->update(['status' => 2]);
        return redirect()->route('brand.index')->with('success', 'Brand berhasil dihapus.');
    }
}
