<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'thumbnail' => $this->faker->imageUrl(640, 480, 'posts', true),
            'title' => $this->faker->sentence(6, true),
            'slug' => $this->faker->unique()->slug(),
            'meta_description' => $this->faker->paragraph(),
            'content' => $this->faker->paragraphs(3, true),
            'user_id' => \App\Models\User::factory(),
            'view_count' => $this->faker->numberBetween(0, 1000),
            'tags' => json_encode($this->faker->words(3)),
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']),
            'language' => $this->faker->randomElement(['id', 'en']),
        ];
    }
}
