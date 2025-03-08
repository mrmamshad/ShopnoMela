<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentHistory extends Model
{
    use HasFactory;

    protected $table = 'payment_history';

    protected $fillable = [
        'user_id', 'order_id', 'transaction_id', 'validation_id',
        'amount', 'currency', 'status', 'payment_method',
        'bank_transaction_id', 'response_data'
    ];

    protected $casts = [
        'response_data' => 'array', // Store SSLCommerz response as JSON
    ];

    // Relation with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation with Order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}