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
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('domaines_id');
            $table->foreign('domaines_id')->references('id')->on('domaines')->onDelete('cascade')->onUpdate('cascade');
            $table->unsignedBigInteger('intervenants_id');
            $table->foreign('intervenants_id')->references('id')->on('intervenants')->onDelete('cascade')->onUpdate('cascade');
            $table->string('intitule_certification');
            $table->string('organisme_certification');
            $table->string('typecertification');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certifications');
    }
};
