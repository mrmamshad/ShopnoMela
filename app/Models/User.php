<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;


class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id',
        'image'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Automatically assign 'customer' role to newly created users
     */
    protected static function boot()
    {
        parent::boot();

        static::created(function ($user) {
            if (!$user->hasAnyRole(['admin', 'merchant'])) {
                $user->assignRole('customer');
            }
        });
    }
    // User.php
    public function productReviews()
    {
        return $this->hasMany(ProductReview::class);
    }
}
