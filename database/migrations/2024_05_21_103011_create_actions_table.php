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
        Schema::create('actions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('entreprises_id');
            $table->foreign('entreprises_id')->references('id')->on('entreprises')->onDelete('cascade');
            $table->BigInteger('themes_id');
            $table->foreign('themes_id')->references('id')->on('themes')->onDelete('cascade');
            $table->bigInteger('intervenants_id');
            $table->foreign('intervenants_id')->references('id')->on('intervenants')->onDelete('cascade');
            $table->bigInteger('etablissements_id');
            $table->foreign('etablissements_id')->references('id')->on('etablissements')->onDelete('cascade');
            $table->dateTime('date_debut_prev');
            $table->dateTime('date_fin_prev');
            $table->dateTime('date_debut_real');
            $table->dateTime('date_fin_real');
            $table->float('prix_reel');
            $table->integer('nbparticipants');
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actions');
    }
};
