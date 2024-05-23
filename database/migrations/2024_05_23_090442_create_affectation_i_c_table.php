<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAffectationICTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('affectation_i_c', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('intervenants_id');
            $table->unsignedBigInteger('competences_id');
            $table->unsignedBigInteger('certifications_id');
            $table->timestamps();

            $table->foreign('intervenants_id')->references('id')->on('intervenants')->onDelete('cascade');
            $table->foreign('competences_id')->references('id')->on('competences')->onDelete('cascade');
            $table->foreign('certifications_id')->references('id')->on('certifications')->onDelete('cascade');

            $table->index('intervenants_id');
            $table->index('competences_id');
            $table->index('certifications_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('affectation_i_c');
    }
}
