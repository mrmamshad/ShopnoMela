<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->unsignedBigInteger('product_id')->nullable()->after('id');
            $table->string('product_name')->nullable()->after('product_id');
            $table->integer('product_quantity')->nullable()->after('product_name');
            $table->string('product_color')->nullable()->after('product_quantity');
            $table->string('product_size')->nullable()->after('product_color');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
               Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['product_id', 'product_name', 'product_quantity', 'product_color', 'product_size']);
        });
    }
};
