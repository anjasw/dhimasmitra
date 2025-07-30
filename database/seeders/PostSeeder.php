<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    public function run()
    {
        $faker = \Faker\Factory::create('id_ID');
        $userIds = User::pluck('id')->toArray();
        foreach (range(1, 20) as $i) {
            Post::create([
                'user_id' => $faker->randomElement($userIds),
                'title' => $faker->sentence(6),
                'slug' => Str::slug($faker->unique()->sentence(4) . '-' . $i),
                'meta_description' => $faker->sentence(12),
                'thumbnail' => 'https://picsum.photos/seed/artikel' . $i . '/400/300',
                'tags' => json_encode(explode(' ', $faker->words(rand(2, 5), true))),
                'status' => 'published',
                'content' => $faker->paragraphs(rand(3, 7), true),
                'created_at' => $faker->dateTimeBetween('-1 year', 'now'),
                'updated_at' => now(),
            ]);
        }
    }
}