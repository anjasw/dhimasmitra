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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('invoice_code')->unique();
            $table->unsignedBigInteger('subtotal');   // total harga barang
            $table->unsignedBigInteger('shipping_cost'); // biaya ongkir
            $table->unsignedBigInteger('total');      // subtotal + shipping_cost
            $table->enum('status', ['pending', 'paid', 'failed', 'expired'])->default('pending');
            $table->string('courier_code'); // JNE, J&T, etc
            $table->string('courier_service'); // REG, OKE, YES, etc
            $table->string('destination'); // alamat lengkap
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
