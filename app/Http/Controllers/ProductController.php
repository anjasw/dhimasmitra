<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProductController extends Controller
{
    public function show($slug)
    {
        $product = [
            'name' => ucwords(str_replace('-', ' ', $slug)),
            'slug' => $slug,
            'price' => 2926300,
            'stock' => 14,
            'image_url' => 'https://dummyimage.com/600x600/000/fff&text=Gambar+Utama',
            'description' => "1. BMS intelligent chip enables 65W (Max) fast charging.\n2. Top-class LG battery cells ensure safety and performance.\n3. Lightweight integrated design.\n4. Multiple interfaces: USB-A, USB-C, 8V-OUT, 12V-OUT.",
            'gallery' => [
                'https://dummyimage.com/600x600/000/fff&text=Gambar+Utama',
                'https://dummyimage.com/600x600/333/fff&text=Side+View',
                'https://dummyimage.com/600x600/555/fff&text=Back+View',
                'https://dummyimage.com/600x600/777/fff&text=Packaging',
            ],
        ];

        return Inertia::render('Front/ProductDetail', [
            'product' => $product,
        ]);
    }
}
