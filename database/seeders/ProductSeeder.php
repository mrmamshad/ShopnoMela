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
        $productImages = [
            'Mobiles & Tablets' => [
                'ProductImg/iphone_14.jpg',
                'ProductImg/samsung_s23_ultra.jpg',
                'ProductImg/oneplus_11.jpg'
            ],
            'Laptops & Computers' => [
                'ProductImg/macbook_air_m2.jpg',
                'ProductImg/dell_xps_13.jpg',
                'ProductImg/hp_spectre_x360.jpg'
            ],
            'TV & Home Appliances' => [
                'ProductImg/sony_4k_tv.jpg',
                'ProductImg/lg_oled_tv.jpg',
                'ProductImg/samsung_qled_tv.jpg'
            ],
            'Cameras & Drones' => [
                'ProductImg/canon_eos_r5.jpg',
                'ProductImg/sony_a7_iv.jpg',
                'ProductImg/dji_mavic_air.jpg'
            ],
            'Watches, Bags & Jewelry' => [
                'ProductImg/rolex_watch.jpg',
                'ProductImg/michael_kors_bag.jpg',
                'ProductImg/tiffany_necklace.jpg'
            ],
            'Men\'s Fashion' => [
                'ProductImg/nike_air_max_270.jpg',
                'ProductImg/adidas_hoodie.jpg',
                'ProductImg/levis_jeans.jpg'
            ],
            'Women\'s Fashion' => [
                'ProductImg/zara_dress.jpg',
                'ProductImg/gucci_handbag.jpg',
                'ProductImg/louis_vuitton_shoes.jpg'
            ],
            'Beauty & Health' => [
                'ProductImg/loreal_shampoo.jpg',
                'ProductImg/nivea_body_lotion.jpg',
                'ProductImg/mac_lipstick.jpg'
            ],
            'Groceries & Pets' => [
                'ProductImg/whiskas_cat_food.jpg',
                'ProductImg/almond_milk.jpg',
                'ProductImg/rice_bag.jpg'
            ],
            'Home & Living' => [
                'ProductImg/sofa_set.jpg',
                'ProductImg/wooden_dining_table.jpg',
                'ProductImg/floor_lamp.jpg'
            ],
            'Sports & Outdoors' => [
                'ProductImg/nike_football.jpg',
                'ProductImg/yoga_mat.jpg',
                'ProductImg/adidas_running_shoes.jpg'
            ],
            'Electronic Devices' => [
                'ProductImg/apple_watch.jpg',
                'ProductImg/sony_headphones.jpg',
                'ProductImg/amazon_echo.jpg'
            ],
        ];

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
                    'image' => $faker->randomElement($productImages[$category->categoryName] ?? ['ProductImg/default.jpg']),
                    'star' => $faker->randomFloat(1, 3, 5), // Rating between 3 - 5
                    'status' => 'active',
                    'category_id' => $category->id,
                    'brand_id' => rand(1, 5), // Random brand
                ]);
            }
        }
    }
}
