<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalAccessTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal_access_tokens', function (Blueprint $table) {
            $table->id(); // Create the primary key
            // $table->integer('user_id'); // Create the user_id column as an unsigned integer
            // // Add the foreign key constraint
            // $table->foreign('user_id')
            //     ->references('id')
            //     ->on('users')
            //     ->onDelete('cascade');

            $table->string('name');
            $table->string('token', 64)->unique();
            $table->integer('tokenable_id');
            $table->string('tokenable_type');
            $table->text('abilities')->nullable();
            $table->timestamp('expires_at')->nullable(); // Add the `expires_at` column
            $table->timestamps(); // Default Laravel created_at and updated_at timestamps
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personal_access_tokens');
    }
}
