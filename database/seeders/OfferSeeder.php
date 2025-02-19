<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OfferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('offers')->insert([
            [
                'title' => 'Big Sale 50% Off',
                'image' => 'https://img.lazcdn.com/us/domino/55b2ea87-d33d-49e0-a3a8-e6b3a80eac59_BD-1976-688.jpg_2200x2200q80.jpg',
                'discount' => 50,
                'valid_until' => Carbon::now()->addDays(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'New Year Special 30%',
                'image' => 'https://img.lazcdn.com/us/domino/af215b52-3bc6-4933-ae38-ef32b98eedd0_BD-1976-688.jpg_2200x2200q80.jpg',
                'discount' => 30,
                'valid_until' => Carbon::now()->addDays(20),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Limited Time Deal 40%',
                'image' => 'https://img.lazcdn.com/us/domino/eec039e9-d7bf-4b45-85e2-873416a0eb4b_BD-1976-688.jpg_2200x2200q80.jpg',
                'discount' => 40,
                'valid_until' => Carbon::now()->addDays(15),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
