<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'email', 'phone', 'amount', 'status', 'address',
        'transaction_id', 'currency', 'product_id', 'product_name',
        'product_quantity', 'product_color', 'product_size'
    ];

    // Order belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Order belongs to a product
// In Order model
public function products()
{
    return $this->hasMany(Product::class);  // Or a belongsToMany if it's a many-to-many relationship
}

  public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    // Order has many payment histories
    public function payments()
    {
        return $this->hasMany(PaymentHistory::class);
    }
}
