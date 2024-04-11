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
            $table->string('invoice');
            $table->dateTime('tanggal');
            $table->enum('status', ['Selesai', 'Draft']);
            $table->integer('total_item');
            $table->bigInteger('total_harga');
            $table->bigInteger('pembayaran');
            $table->foreignUuid('id_diskon')->nullable()->constrained('master_diskon')->references('id')->onDelete('restrict')->onUpdate('cascade');
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
