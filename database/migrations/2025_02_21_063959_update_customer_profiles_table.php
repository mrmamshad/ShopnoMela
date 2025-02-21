<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('customer_profiles', function (Blueprint $table) {
            // Dropping unnecessary columns
            $table->dropColumn([
                'cus_add', 'cus_city', 'cus_state', 'cus_postcode', 'cus_country', 'cus_fax',
                'ship_postcode', 'ship_country', 'ship_phone'
            ]);

            // Ensuring column exists (optional safety check)
            if (!Schema::hasColumn('customer_profiles', 'cus_phone')) {
                $table->string('cus_phone')->after('cus_name');
            }
        });
    }

    public function down()
    {
        Schema::table('customer_profiles', function (Blueprint $table) {
            // Rolling back: Adding dropped columns back (if needed)
            $table->string('cus_add')->nullable();
            $table->string('cus_city')->nullable();
            $table->string('cus_state')->nullable();
            $table->string('cus_postcode')->nullable();
            $table->string('cus_country')->nullable();
            $table->string('cus_fax')->nullable();
            $table->string('ship_postcode')->nullable();
            $table->string('ship_country')->nullable();
            $table->string('ship_phone')->nullable();
        });
    }
};
