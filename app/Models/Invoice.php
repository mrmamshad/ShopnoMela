<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = ['total', 'vat', 'payable', 'cus_details', 'ship_details', 'tran_id', 'val_id', 'delivery_status', 'payment_status', 'user_id'];

    // An invoice belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // An invoice has many invoice products
    public function invoiceProducts()
    {
        return $this->hasMany(InvoiceProduct::class);
    }
}