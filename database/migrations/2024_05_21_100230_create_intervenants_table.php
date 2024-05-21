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
        Schema::create('intervenants', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('users_id');
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('etablissements_id');
            $table->foreign('etablissements_id')->references('id')->on('etablissements')->onDelete('cascade');
            $table->string('matricule');
            $table->string('nom');
            $table->date('datenaissance');
            $table->string('typeintervenant');
            $table->integer('status');









            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('intervenants');
    }
};
