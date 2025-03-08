<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('payment_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Links to users table
            $table->foreignId('order_id')->constrained()->onDelete('cascade'); // Links to orders table
            $table->string('transaction_id')->unique();
            $table->string('validation_id')->nullable();
            $table->decimal('amount', 10, 2);
            $table->string('currency');
            $table->string('status'); // Valid, Failed, Pending
            $table->string('payment_method')->nullable(); // Bkash, Nagad, Visa, etc.
            $table->string('bank_transaction_id')->nullable();
            $table->json('response_data'); // Store full SSLCommerz response
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payment_history');
    }
};
