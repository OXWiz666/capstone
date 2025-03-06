<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMedicinesTable extends Migration
{
    public function up()
    {
        Schema::create('medicines', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('generic_name');
            $table->string('category');
            $table->text('description')->nullable();
            $table->string('unit');
            $table->integer('quantity')->default(0);
            $table->integer('reorder_level')->default(10);
            $table->date('expiry_date')->nullable();
            $table->string('manufacturer')->nullable();
            $table->string('supplier')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Add indexes for common queries
            $table->index('name');
            $table->index('generic_name');
            $table->index('category');
            $table->index(['quantity', 'reorder_level']);
            $table->index('expiry_date');
        });
    }

    public function down()
    {
        Schema::dropIfExists('medicines');
    }
}