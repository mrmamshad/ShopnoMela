<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductDetail;
use Faker\Factory as Faker;

class ProductDetailsSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Get all products
        $products = Product::all();

        foreach ($products as $product) {
            // Use static image URLs from Lorem Picsum
            $img1 = 'https://picsum.photos/300/300?random=' . rand(1, 1000);
            $img2 = 'https://picsum.photos/300/300?random=' . rand(1001, 2000);
            $img3 = 'https://picsum.photos/300/300?random=' . rand(2001, 3000);
            $img4 = 'https://picsum.photos/300/300?random=' . rand(3001, 4000);

            // Insert product details
            ProductDetail::create([
                'product_id' => $product->id,
                'img1' => $img1,
                'img2' => $img2,
                'img3' => $img3,
                'img4' => $img4,
                'des' => $faker->paragraph(3),
               'color' => json_encode($faker->randomElements(['Red', 'Blue', 'Black', 'White', 'Green'], rand(2, 4))),
            'size' => json_encode($faker->randomElements(['S', 'M', 'L', 'XL', 'XXL'], rand(2, 3))),
            ]);
        }
    }
}
