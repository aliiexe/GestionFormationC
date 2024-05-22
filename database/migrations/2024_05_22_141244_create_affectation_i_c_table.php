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
        Schema::create('affectation_i_c', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('intervenant_id');
            $table->foreign('intervenant_id')->references('id')->on('intervenants')->onDelete('cascade');
            $table->unsignedBigInteger('competence_id');
            $table->foreign('competence_id')->references('id')->on('competences')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('affectation_i_c');
    }
};
