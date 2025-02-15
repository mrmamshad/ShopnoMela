<?php
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

class CategoryFactory extends Factory
{
    protected $model = \App\Models\Category::class;

    public function definition()
    {
        // Generate a fake image in the temp directory
        $tempImagePath = $this->faker->image(sys_get_temp_dir(), 200, 200, 'technics', true);

        // Define storage path
        $storagePath = 'categories/' . basename($tempImagePath);

        // Move the image to Laravel storage
        Storage::disk('public')->putFileAs('categories', new File($tempImagePath), basename($tempImagePath));

        return [
            'categoryName' => $this->faker->unique()->randomElement([
                'Mobiles & Tablets', 'Laptops & Computers', 'TV & Home Appliances', 
                'Cameras & Drones', 'Watches, Bags & Jewelry', 'Men\'s Fashion', 
                'Women\'s Fashion', 'Beauty & Health', 'Groceries & Pets', 
                'Home & Living', 'Sports & Outdoors', 'Automotive & Motorbike'
            ]),
            'categoryImg' => $storagePath, // Save relative path
        ];
    }
}
