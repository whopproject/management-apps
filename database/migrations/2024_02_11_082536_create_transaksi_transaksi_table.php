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
        Schema::create('transaksi_transaksi', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('no_invoice')->unique();
            $table->string('invoice')->nullable();
            $table->date('tanggal');
            $table->enum('status', ['Selesai', 'Draft']);
            $table->integer('total_item');
            $table->bigInteger('total_harga');
            $table->bigInteger('pembayaran');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_transaksi');
    }
};
