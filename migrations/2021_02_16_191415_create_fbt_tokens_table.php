<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFbtTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fbt_tokens', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('phrase_id')->nullable();
            $table->foreign('phrase_id')->references('id')->on('fbt_phrases')->onDelete('cascade');
            $table->string('token');
            $table->unsignedSmallInteger('type');
            $table->dateTime('created_at');
            $table->unique(['phrase_id', 'token'], 'idx_phrase_token');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fbt_tokens');
    }
}
