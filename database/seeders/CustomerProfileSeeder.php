<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Models\User;

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
                'cus_phone' => $faker->phoneNumber, // ✅ This column still exists
                'ship_name' => $faker->name,
                'ship_add' => $faker->streetAddress,
                'ship_city' => $faker->city,
                'ship_state' => $faker->state,
                'user_id' => $faker->randomElement($users), // Assign a random user
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
