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
        Schema::table('transaksi_transaksi_item', function (Blueprint $table) {
            $table->bigInteger('harga_satuan')->nullable()->after('qty');
            $table->bigInteger('potongan_diskon')->nullable()->after('harga_satuan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaksi_transaksi_item', function (Blueprint $table) {
            //
        });
    }
};
