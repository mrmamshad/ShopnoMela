<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FlashSaleSeeder extends Seeder
{
    public function run()
    {
        DB::table('flash_sales')->insert([
            [
                'product_id' => 1, // Make sure you have this product in the products table
                'discount_percentage' => 40,
                'start_time' => Carbon::now(),
                'end_time' => Carbon::now()->addHours(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 2,
                'discount_percentage' => 30,
                'start_time' => Carbon::now(),
                'end_time' => Carbon::now()->addHours(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'product_id' => 3,
                'discount_percentage' => 50,
                'start_time' => Carbon::now(),
                'end_time' => Carbon::now()->addHours(10),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
