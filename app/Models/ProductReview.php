<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'customer_id',
        'product_id',
        'description',
        'rating',
        'image',
    ];

    /**
     * Relationship with Customer Profile
     */
    // A review belongs to a customer profile
    public function customerProfile()
    {
        return $this->belongsTo(CustomerProfile::class, 'customer_id');
    }

    /**
     * Relationship with Product
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
