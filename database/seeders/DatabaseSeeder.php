<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Post::factory(20)->create();


        // $brands = Brand::factory(5)->create();
        // $categories = Category::factory(5)->create();

        // // Seed products
        // $products = Product::factory(20)
        //     ->make()
        //     ->each(function ($product) use ($brands, $categories) {
        //         $product->brand_id = $brands->random()->id;
        //         $product->category_id = $categories->random()->id;
        //         $product->save();

        //         // Seed product images for each product
        //         ProductImage::factory(rand(1, 3))->create([
        //             'product_id' => $product->id,
        //         ]);
        //     });
    }
}
