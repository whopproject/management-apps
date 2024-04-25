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
        Schema::table('transaksi_diskon_transaksi', function (Blueprint $table) {
            $table->bigInteger('potongan_diskon')->nullable()->after('id_diskon');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaksi_diskon_transaksi', function (Blueprint $table) {
            //
        });
    }
};
