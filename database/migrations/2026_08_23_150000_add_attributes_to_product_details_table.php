<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('product_details', function (Blueprint $table) {
            // Dynamic variant attributes, e.g.
            // [{"name":"RAM","values":["8GB","16GB"]},{"name":"Storage","values":["256GB"]}]
            $table->json('attributes')->nullable()->after('size');
        });
    }

    public function down(): void
    {
        Schema::table('product_details', function (Blueprint $table) {
            $table->dropColumn('attributes');
        });
    }
};
