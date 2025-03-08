<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
   public function up(): void
{
    Schema::create('orders', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('product_id'); // Added product_id
        $table->string('name')->nullable();
        $table->string('email', 50)->nullable();
        $table->string('phone', 20)->nullable();
        $table->double('amount')->nullable();
        $table->text('address')->nullable();
        $table->string('status', 20)->default('Pending');
        $table->string('transaction_id', 50)->unique();
        $table->string('currency', 20)->nullable();
        $table->string('product_name')->nullable(); //new
        $table->integer('quantity')->nullable();// new
        $table->string('color')->nullable(); //new
        $table->string('size')->nullable(); //new
        $table->timestamps();

        // Foreign key constraint (if products table exists)
        $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
    });
}

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
