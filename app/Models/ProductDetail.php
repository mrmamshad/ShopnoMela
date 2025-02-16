<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'img1', 'img2', 'img3', 'img4', 'des', 'color', 'size', 'product_id'
    ];

    // Relationship: Product details belong to a product
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
