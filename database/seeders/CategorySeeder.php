<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        // Delete existing categories
        Category::truncate();

        // Category names with manually downloaded images
        $categories = [
            ['name' => 'Mobiles & Tablets', 'image' => 'CategoryImg/mobile-tablat.jpg'],
            ['name' => 'Laptops & Computers', 'image' => 'CategoryImg/laptop_computers.jpg'],
            ['name' => 'TV & Home Appliances', 'image' => 'CategoryImg/TV & Home Appliances.avif'],
            ['name' => 'Cameras & Drones', 'image' => 'CategoryImg/Cameras & Drones.webp'],
            ['name' => 'Watches, Bags & Jewelry', 'image' => 'CategoryImg/Watches, Bags & Jewelry.webp'],
            ['name' => 'Men\'s Fashion', 'image' => 'CategoryImg/Men\'s Fashion.jpg'],
            ['name' => 'Women\'s Fashion', 'image' => 'CategoryImg/Women\'s Fashion.jpg'],
            ['name' => 'Beauty & Health', 'image' => 'CategoryImg/Beauty & Health.png'],
            ['name' => 'Groceries & Pets', 'image' => 'CategoryImg/Groceries & Pets.jpg'],
            ['name' => 'Home & Living', 'image' => 'CategoryImg/Home & Living.jpg'],
            ['name' => 'Sports & Outdoors', 'image' => 'CategoryImg/Sports & Outdoors.jpg'],
            ['name' => 'Electronic Devices', 'image' => 'CategoryImg/Electronic Devices.jpg'],
        ];

        foreach ($categories as $category) {
            // Insert category into the database
            Category::create([
                'categoryName' => $category['name'],
                'categoryImg' => $category['image'], // Directly store the correct path
            ]);
        }
    }
}
