<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicalRecordsTable extends Migration
{
    public function up()
    {
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->foreignId('appointment_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('doctor_id')->nullable()->constrained('users')->onDelete('set null');
            $table->text('diagnosis')->nullable();
            $table->text('symptoms')->nullable();
            $table->text('treatment')->nullable();
            $table->text('notes')->nullable();
            $table->json('vital_signs')->nullable();
            $table->json('lab_results')->nullable();
            $table->date('follow_up_date')->nullable();
            $table->string('record_type');
            $table->json('attachments')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Add indexes
            $table->index(['patient_id', 'created_at']);
            $table->index('record_type');
            $table->index('follow_up_date');
        });
    }

    public function down()
    {
        Schema::dropIfExists('medical_records');
    }
} 