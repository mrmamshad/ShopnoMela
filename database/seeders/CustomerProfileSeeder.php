<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Faker\Factory as Faker;

class CustomerProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();
        $users = User::pluck('id')->toArray(); // Fetch all user IDs

        if (empty($users)) {
            $this->command->warn('Skipping CustomerProfileSeeder: No users found.');
            return;
        }

        foreach (range(1, 10) as $index) { // Generate 10 fake customers
            DB::table('customer_profiles')->insert([
                'cus_name' => $faker->name,
                'cus_add' => $faker->streetAddress,
                'cus_city' => $faker->city,
                'cus_state' => $faker->state,
                'cus_postcode' => $faker->postcode,
                'cus_country' => $faker->country,
                'cus_phone' => $faker->phoneNumber,
                'cus_fax' => $faker->phoneNumber,
                'ship_name' => $faker->name,
                'ship_add' => $faker->streetAddress,
                'ship_city' => $faker->city,
                'ship_state' => $faker->state,
                'ship_postcode' => $faker->postcode,
                'ship_country' => $faker->country,
                'ship_phone' => $faker->phoneNumber,
                'user_id' => $faker->randomElement($users), // Assign a random user
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
