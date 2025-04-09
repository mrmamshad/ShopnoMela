<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('offers', function (Blueprint $table) {
        $table->string('types')->default('general'); // Add 'types' column with a default value
    });
}

public function down()
{
    Schema::table('offers', function (Blueprint $table) {
        $table->dropColumn('types'); // Remove 'types' column on rollback
    });
}

};
