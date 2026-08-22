<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropUnique('orders_transaction_id_unique');
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('transaction_id')->unique()->nullable()->change();
        });
    }
};
