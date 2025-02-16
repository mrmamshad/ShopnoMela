<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\CustomerProfile;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductReview>
 */
class ProductReviewFactory extends Factory
{
    public function definition(): array
    {
        return [
            'description' => $this->faker->paragraph,
            'rating' => $this->faker->numberBetween(1, 5),
            'customer_id' => CustomerProfile::inRandomOrder()->first()->id ?? null,
            'product_id' => Product::inRandomOrder()->first()->id ?? null,
        ];
    }
}
