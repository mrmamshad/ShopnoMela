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
        Schema::create('invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('total');
            $table->string('vat');
            $table->string('payable');
            $table->string('cus_details');
            $table->string('ship_details');
            $table->string('tran_id');
            $table->string('val_id');
            $table->enum('delivery_status', ['pending', 'completed', 'shipped']);
            $table->string('payment_status');
            $table->unsignedBigInteger('user_id');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('invoices');
    }
};
