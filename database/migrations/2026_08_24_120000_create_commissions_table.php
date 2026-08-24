<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Stores the commission rate (percentage) that the admin charges each
     * merchant. One active rate per merchant (merchant_id is unique). Kept in a
     * dedicated table so it can grow into rate history / per-category rules
     * later without touching the users table.
     */
    public function up(): void
    {
        Schema::create('commissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('merchant_id')
                ->unique()
                ->constrained('users')
                ->cascadeOnDelete();
            // Percentage of each order amount taken by the platform (0-100)
            $table->decimal('rate', 5, 2)->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commissions');
    }
};
