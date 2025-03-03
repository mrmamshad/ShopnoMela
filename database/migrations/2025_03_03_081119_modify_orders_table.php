<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Dropping unnecessary columns
            $table->dropForeign(['product_id']); // Drop foreign key
            $table->dropColumn([
                'product_id',
                'product_name',
                'quantity',
                'color',
                'size'
            ]);

            // Modifying existing columns
            $table->string('email', 30)->change();
            $table->string('status', 10)->nullable()->change();
            $table->string('transaction_id', 255)->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Revert changes (if needed)
            $table->unsignedBigInteger('product_id')->after('id');
            $table->string('product_name')->nullable()->after('currency');
            $table->integer('quantity')->nullable()->after('product_name');
            $table->string('color')->nullable()->after('quantity');
            $table->string('size')->nullable()->after('color');

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');

            $table->string('email', 50)->change();
            $table->string('status', 20)->default('Pending')->change();
            $table->string('transaction_id', 50)->unique()->change();
        });
    }
};
