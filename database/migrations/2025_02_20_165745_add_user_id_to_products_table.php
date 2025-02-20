<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable()->after('id'); // Step 1: Add as nullable
        });
    
        // Step 2: Assign a default user ID to existing products
        DB::table('products')->update(['user_id' => 14]); // Change 1 to an existing merchant ID
    
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable(false)->change(); // Step 3: Make NOT NULL
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // Step 4: Add foreign key
        });
    }
    
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
    
    
};
