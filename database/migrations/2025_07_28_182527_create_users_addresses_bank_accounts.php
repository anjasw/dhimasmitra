<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersAddressesBankAccounts extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Tabel addresses
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('label', 100);
            $table->text('detail');
            $table->string('phone', 20)->nullable();
            $table->string('lokasi', 255)->nullable();
            $table->timestamps();
        });

        // Tabel bank_accounts
        Schema::create('bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('bank_code', 20);
            $table->string('bank_name', 50);
            $table->string('logo', 255)->nullable();
            $table->string('account_number', 50);
            $table->string('account_name', 100);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bank_accounts');
        Schema::dropIfExists('addresses');
    }
};
