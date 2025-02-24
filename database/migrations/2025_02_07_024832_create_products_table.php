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
       // Disable foreign key checks temporarily
       DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('short_des');
            $table->decimal('price', 10, 2);
            $table->tinyInteger('discount')->nullable();
            $table->string('image');
            $table->double('star', 2, 1);
            // remark enum
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('brand_id');
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');
        });
    }

    public function down()
    {
        // Disable foreign key checks temporarily
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        Schema::dropIfExists('products');

        // Enable foreign key checks again
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }

};
