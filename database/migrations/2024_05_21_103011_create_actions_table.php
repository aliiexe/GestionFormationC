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
            $table->unsignedBigInteger('entreprises_id');
            $table->foreign('entreprises_id')->references('id')->on('entreprises')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('themes_id');
            $table->foreign('themes_id')->references('id')->on('themes')->onDelete('cascade');
            $table->unsignedBigInteger('intervenants_id');
            $table->foreign('intervenants_id')->references('id')->on('intervenants')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('etablissements_id');
            $table->foreign('etablissements_id')->references('id')->on('etablissements')->onDelete('cascade')->onUpdate('cascade');
            $table->dateTime('date_debut_prev');
            $table->dateTime('date_fin_prev');
            $table->dateTime('date_debut_real')->nullable();
            $table->dateTime('date_fin_real')->nullable();
            $table->float('prix_reel')->nullable();
            $table->integer('nbparticipants');
            $table->integer('status')->nullable();
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
