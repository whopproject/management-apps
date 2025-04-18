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
        Schema::create('transaksi_transaksi_item', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('id_transaksi')->constrained('transaksi_transaksi')->references('id')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('id_produk')->constrained('master_produk')->references('id')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('id_diskon')->nullable()->constrained('master_diskon')->references('id')->onDelete('restrict')->onUpdate('cascade');
            $table->integer('qty');
            $table->bigInteger('subtotal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_transaksi_item');
    }
};
