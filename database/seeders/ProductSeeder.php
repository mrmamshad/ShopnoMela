<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use Faker\Factory as Faker;

class ProductSeeder extends Seeder
{
    public function run()
    {
        // Delete existing products
        Product::truncate();

        $faker = Faker::create();

        // Fetch all categories
        $categories = Category::all();

        foreach ($categories as $category) {
            // Generate 5-10 products per category
            for ($i = 0; $i < rand(5, 10); $i++) {
                Product::create([
                    'title' => $faker->sentence(3), // Random product name
                    'short_des' => $faker->sentence(10), // Short description
                    'price' => $faker->randomFloat(2, 10, 5000), // Price between 10-5000
                    'discount' => $faker->numberBetween(5, 50), // Discount between 5% - 50%
                    'image' => 'https://picsum.photos/600/600?random=' . rand(1, 10000), // Random real image
                    'star' => $faker->randomFloat(1, 3, 5), // Rating between 3 - 5
                    'status' => 'active',
                    'category_id' => $category->id,
                    'brand_id' => rand(1, 5), // Random brand
                ]);
            }
        }
    }
}
