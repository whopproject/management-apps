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
        Schema::create('log_users', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('id_user')->constrained('users')->references('id')->onDelete('restrict')->onUpdate('cascade');
            $table->string('route');
            $table->string('ip_address');
            $table->string('method');
            $table->string('user_agent');
            $table->string('response_code');
            $table->longText('data_lama');
            $table->longText('data_baru');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_users');
    }
};
