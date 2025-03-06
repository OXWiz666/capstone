<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrescriptionsTable extends Migration
{
    public function up()
    {
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('doctor_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('medical_record_id')->nullable()->constrained()->onDelete('set null');
            $table->date('prescription_date');
            $table->enum('status', ['pending', 'dispensed', 'cancelled'])->default('pending');
            $table->text('notes')->nullable();
            $table->timestamp('dispensed_at')->nullable();
            $table->foreignId('dispensed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();

            // Add indexes
            $table->index(['patient_id', 'prescription_date']);
            $table->index('status');
        });

        // Create prescription_medicines pivot table
        Schema::create('prescription_medicines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prescription_id')->constrained()->onDelete('cascade');
            $table->foreignId('medicine_id')->constrained()->onDelete('cascade');
            $table->string('dosage');
            $table->string('frequency');
            $table->string('duration');
            $table->integer('quantity');
            $table->text('instructions')->nullable();
            $table->boolean('is_dispensed')->default(false);
            $table->timestamps();

            // Add indexes
            $table->index(['prescription_id', 'medicine_id']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('prescription_medicines');
        Schema::dropIfExists('prescriptions');
    }
} 