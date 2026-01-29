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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('users')->cascadeOnDelete();
            $table->dateTime('order_date');
            $table->double('order_total', 10, 2);
            $table->string('status')->default('pending');
            $table->text('cancel_reason')->nullable();
            $table->string('phone_number');
            $table->text('shipping_address'); // For the location
            $table->string('payment_method'); // 'online' or 'delivery'
            $table->string('transaction_image')->nullable(); // Required only for online
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
