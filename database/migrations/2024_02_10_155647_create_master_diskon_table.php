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
        Schema::create('master_diskon', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama')->nullable();
            $table->enum('jenis', ['Produk', 'Transaksi']);
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->bigInteger('potongan_harga');
            $table->enum('status', ['Draft', 'Archived', 'Published']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_diskon');
    }
};
