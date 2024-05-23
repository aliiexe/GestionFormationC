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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('themes_id');
            $table->foreign('themes_id')->references('id')->on('themes')->onDelete('cascade');
            $table->unsignedBigInteger('etablissements_id');
            $table->foreign('etablissements_id')->references('id')->on('etablissements')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('exercice');
            $table->integer('nbjours');
            $table->string('image')->nullable();
            $table->string('description')->nullable();
            $table->integer('nbparticipants');
            $table->float('cout_previsionel');
            $table->integer('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
