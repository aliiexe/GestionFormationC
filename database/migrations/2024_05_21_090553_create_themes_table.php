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
        Schema::create('themes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('domaines_id');
            $table->foreign('domaines_id')->references('id')->on('domaines')->onDelete('cascade')->onUpdate('cascade');
            $table->string('intitule_theme');
            $table->integer('duree_formation');
            $table->integer('status')->nullable();
            $table->string('image')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('themes');
    }
};
