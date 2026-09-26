<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class WidenFbtPhrasesProject extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if ($this->canChangeColumns()) {
            Schema::table('fbt_phrases', function (Blueprint $table) {
                $table->string('project', 100)->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }

    private function canChangeColumns(): bool
    {
        if (Schema::getConnection()->getDriverName() === 'sqlite') {
            return false;
        }

        return version_compare(app()->version(), '11.0.0', '>=')
            || class_exists(\Doctrine\DBAL\Connection::class);
    }
}
