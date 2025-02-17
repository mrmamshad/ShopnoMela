<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'product_id',
        'description',
        'rating',
        'image',
    ];

    /**
     * Relationship with Customer Profile
     */
    // A review belongs to a customer profile
   // ProductReview.php
public function user()
{
    return $this->belongsTo(User::class);
}

    /**
     * Relationship with Product
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
