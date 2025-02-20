<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'cover_photo',
        'profile_photo',
        'description',
        'contact_email',
        'contact_phone',
        'facebook',
        'instagram',
        'twitter',
        'application_status',
    ];

    /**
     * Relationship: Each store belongs to one user.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}