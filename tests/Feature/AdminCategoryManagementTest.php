<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

beforeEach(function (): void {
    Role::findOrCreate('customer');
    Role::findOrCreate('admin');

    $admin = User::factory()->create();
    $admin->syncRoles(['admin']);

    $this->actingAs($admin);
});

it('allows an admin to replace a category image', function (): void {
    $oldImage = 'categories/test-old-'.Str::uuid().'.png';
    File::ensureDirectoryExists(public_path('categories'));
    File::put(public_path($oldImage), 'old image');

    $category = Category::create([
        'categoryName' => 'Food products',
        'categoryImg' => $oldImage,
    ]);

    $newImagePath = null;

    try {
        $response = $this->post(route('admin.categories.update', $category), [
            '_method' => 'put',
            'categoryName' => 'Healthy Food',
            'categoryImg' => UploadedFile::fake()->image('healthy-food.png', 400, 400),
        ]);

        $response->assertRedirect();

        $category->refresh();
        $newImagePath = $category->categoryImg;

        expect($category->categoryName)->toBe('Healthy Food')
            ->and($newImagePath)->toStartWith('categories/category_')
            ->and(File::exists(public_path($newImagePath)))->toBeTrue()
            ->and(File::exists(public_path($oldImage)))->toBeFalse();
    } finally {
        File::delete(public_path($oldImage));
        if ($newImagePath) {
            File::delete(public_path($newImagePath));
        }
    }
});

it('allows an admin to remove a category image', function (): void {
    $category = Category::create([
        'categoryName' => 'Food products',
        'categoryImg' => 'https://example.com/old-food.png',
    ]);

    $response = $this->put(route('admin.categories.update', $category), [
        'categoryName' => 'Food products',
        'categoryImg' => '',
    ]);

    $response->assertRedirect();

    expect($category->refresh()->categoryImg)->toBeNull();
});

it('prevents non-admin users from updating categories', function (): void {
    $customer = User::factory()->create();
    $category = Category::create([
        'categoryName' => 'Food products',
        'categoryImg' => null,
    ]);

    $this->actingAs($customer)
        ->put(route('admin.categories.update', $category), [
            'categoryName' => 'Changed',
            'categoryImg' => '',
        ])
        ->assertForbidden();

    expect($category->refresh()->categoryName)->toBe('Food products');
});
