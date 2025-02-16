<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\CustomerProfile;
use App\Models\Product;

class ProductReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = CustomerProfile::pluck('id')->toArray();
        $products = Product::pluck('id')->toArray();

        if (empty($customers) || empty($products)) {
            $this->command->warn('Skipping ProductReviewSeeder: No customers or products found.');
            return;
        }

        $reviews = [
            ['description' => 'Great product!', 'rating' => 5],
            ['description' => 'Not bad, but could be better.', 'rating' => 3],
            ['description' => 'Worst purchase ever!', 'rating' => 1],
            ['description' => 'Absolutely love it!', 'rating' => 5],
            ['description' => 'Decent quality for the price.', 'rating' => 4],
        ];

        foreach ($products as $product_id) {
            for ($i = 0; $i < 5; $i++) { // 5 reviews per product
                DB::table('product_reviews')->insert([
                    'description' => $reviews[array_rand($reviews)]['description'],
                    'rating' => $reviews[array_rand($reviews)]['rating'],
                    'image' => 'https://picsum.photos/600/600?random=' . rand(1, 10000), // Random real image
                    'customer_id' => $customers[array_rand($customers)],
                    'product_id' => $product_id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
