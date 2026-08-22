<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('product_details', function (Blueprint $table) {
            $table->string('img1')->nullable()->change();
            $table->string('img2')->nullable()->change();
            $table->string('img3')->nullable()->change();
            $table->string('img4')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('product_details', function (Blueprint $table) {
            $table->string('img1')->nullable(false)->change();
            $table->string('img2')->nullable(false)->change();
            $table->string('img3')->nullable(false)->change();
            $table->string('img4')->nullable(false)->change();
        });
    }
};
