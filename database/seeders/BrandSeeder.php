<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Faker\Factory as Faker;
use Illuminate\Support\Str;

class BrandSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Create the storage directory if it doesn't exist
        $brandImgPath = public_path('brandimg');
        if (!File::exists($brandImgPath)) {
            File::makeDirectory($brandImgPath, 0755, true, true);
        }

        // Truncate existing brands to prevent duplicates
        Brand::truncate();

        // Generate random brands
        for ($i = 1; $i <= 10; $i++) {
            // Generate a random image
            $image = 'https://picsum.photos/600/600?random=' . rand(1, 10000); // Generate and save a random image

            // Save brand data
            Brand::create([
                'brandName' => $faker->company,
                'brandImg' => 'brandimg/' . $image, // Store relative path
            ]);
        }
    }
}
