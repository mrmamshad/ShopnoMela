<?php

namespace Database\Seeders;

use App\Models\ProductDetail;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $merchantRole = Role::create(['name' => 'merchant']);
        $customerRole = Role::create(['name' => 'customer']);

        // Create permissions
        Permission::create(['name' => 'manage users']);  // Admin only
        Permission::create(['name' => 'manage products']);  // Merchant only
        Permission::create(['name' => 'place orders']);  // Customer only

        // Assign permissions
        $adminRole->givePermissionTo(['manage users', 'manage products']);
        $merchantRole->givePermissionTo(['manage products']);
        $customerRole->givePermissionTo(['place orders']);

        // Create an admin user using the factory and assign the role
        $admin = User::factory()->create([
            'name' => 'Admin ',
            'email' => 'admin@admin.me',
            'password' => bcrypt('mamshad123'), // Set the password here
        ]);

        $admin->assignRole('admin'); // Assign the admin role to the created user

        // Create a merchant user
        $merchant = User::factory()->create([
            'name' => 'Merchant',
            'email' => 'merchant@shopnomela.com',
            'password' => bcrypt('marchant123'), 
        ]);

        $merchant->assignRole('merchant');

        // Create a customer user
        $customer = User::factory()->create([
            'name' => 'Customer User',
            'email' => 'customer@shopnomela.com',
        ]);

        $customer->assignRole('customer');

        // Generate additional random users (optional)
        User::factory(10)->create();

        $this->call([
            CategorySeeder::class,
            BrandSeeder::class,
            ProductSeeder::class,
            ProductDetailsSeeder::class
        ]);
        
    }
}
