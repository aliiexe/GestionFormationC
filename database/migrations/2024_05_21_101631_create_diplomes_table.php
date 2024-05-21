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
        Schema::create('diplomes', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('intervenants_id');
            $table->foreign('intervenants_id')->references('id')->on('intervenants')->onDelete('cascade');
            $table->unsignedBigInteger('domaines_id')->nullable();
            $table->foreign('domaines_id')->references('id')->on('domaines')->onDelete('cascade');
            $table->string('intitule_diplome');
            $table->string('typediplome');
            $table->string('specialite_diplome');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diplomes');
    }
};
