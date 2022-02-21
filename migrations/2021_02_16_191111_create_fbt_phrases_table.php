<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFbtPhrasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fbt_phrases', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('source_id')->nullable();
            $table->foreign('source_id')->references('id')->on('fbt_sources')->onDelete('cascade');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->foreign('parent_id')->references('id')->on('fbt_phrases')->onDelete('cascade');
            $table->string('hash', 50)->index();
            $table->text('text');
            $table->text('description');
            $table->unsignedBigInteger('views')->default(0);
            $table->string('author', 100)->nullable();
            $table->string('project', 25)->index();
            $table->dateTime('created_at');
            $table->unique(['hash'], 'idx_unique_phrase_hash');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fbt_phrases');
    }
}
