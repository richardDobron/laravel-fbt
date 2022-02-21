<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTranslationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fbt_translations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('phrase_id');
            $table->foreign('phrase_id')->references('id')->on('fbt_phrases')->onDelete('cascade');
            $table->unsignedBigInteger('author_id')->nullable()->index();
            $table->text('translation');
            $table->string('token1')->nullable();
            $table->string('token2')->nullable();
            $table->string('token3')->nullable();
            $table->string('token4')->nullable();
            $table->string('locale', 5)->index();
            $table->bigInteger('views');
            $table->dateTime('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fbt_translations');
    }
}
