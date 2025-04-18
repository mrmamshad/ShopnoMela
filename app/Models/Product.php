<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'short_des', 'price', 'discount', 'image', 'stock', 'star', 'remark', 'category_id', 'brand_id', 'user_id'];

    // A product belongs to a category
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }


    // A product belongs to a brand
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    // A product has many cart items
    public function carts()
    {
        return $this->hasMany(ProductCart::class);
    }

    // A product has many reviews
    public function reviews()
    {
        return $this->hasMany(ProductReview::class);
    }
    public function details()
    {
        return $this->hasOne(ProductDetail::class, 'product_id');
    }
    public function user()
{
    return $this->belongsTo(User::class, 'user_id');
}
public function merchant()
{
    return $this->belongsTo(User::class, 'user_id');
}


}
