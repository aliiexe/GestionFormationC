<?php

use App\Http\Controllers\DiplomeController;
use App\Http\Controllers\EtablissementController;
use App\Http\Controllers\IntervenantController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/users',[DiplomeController::class,'users']);
require __DIR__.'/auth.php';


Route::resource('intervenant',IntervenantController::class);
Route::resource('etablissement',EtablissementController::class);