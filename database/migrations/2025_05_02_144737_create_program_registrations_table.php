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
        Schema::create('program_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('participant_id')->constrained('participants');
            $table->foreignId('program_schedule_id')->constrained('program_schedules');
            $table->enum('status', ['Scheduled', 'Completed', 'Cancelled']);
            $table->unsignedInteger('session_number')->default(1);
            $table->enum('verification_status', ['Pending', 'Verified'])->default('Pending');
            $table->timestamps(); // Optional
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('program_registrations');
    }
};
