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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_id')->constrained()->onDelete('cascade');
            $table->string('payment_type'); // credit_card, bank_transfer, ewallet, dll
            $table->string('transaction_status'); // settlement, pending, expire, cancel
            $table->string('midtrans_transaction_id')->nullable(); // dari Midtrans
            $table->string('order_id'); // invoice_code
            $table->string('payment_code')->nullable(); // kode bayar, bisa va number
            $table->json('payload'); // full response dari Midtrans
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
