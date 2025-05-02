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
        Schema::create('program_participants', function (Blueprint $table) {
            $table->integer('id',true,true); // Equivalent to INT AUTO_INCREMENT PRIMARY KEY
            $table->string('full_name', 100);
            $table->date('birthdate');
            $table->string('contact_info', 150);
            $table->enum('gender', ['Male', 'Female', 'Other']);
            $table->string('email', 100);
            $table->timestamps(); // Optional: adds created_at and updated_at columns
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_participants');
    }
};