<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = $this->faker->randomFloat(2, 10000, 1000000);
        $discount = $this->faker->numberBetween(0, 50);
        $fix_price = $price - ($price * $discount / 100);

        return [
            'name' => $this->faker->words(3, true),
            'slug' => $this->faker->unique()->slug(),
            'category_id' => \App\Models\Category::factory(),
            'brand_id' => \App\Models\Brand::factory(),
            'description' => $this->faker->paragraph(),
            'price' => $price,
            'discount' => $discount,
            'fix_price' => $fix_price,
            'stock' => $this->faker->numberBetween(0, 100),
            'status' => 1,
        ];
    }
}
