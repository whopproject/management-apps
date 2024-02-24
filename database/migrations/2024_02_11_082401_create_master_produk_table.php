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
        Schema::create('master_produk', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama');
            $table->string('harga');
            $table->string('gambar');
            $table->integer('stok');
            $table->foreignUuid('id_kategori')->constrained('master_kategori')->references('id')->onDelete('restrict')->onUpdate('cascade');
            $table->foreignUuid('id_diskon')->nullable()->constrained('master_diskon')->references('id')->onDelete('set null')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_produk');
    }
};
