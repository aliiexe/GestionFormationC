<?php

use App\Http\Controllers\AffectationICController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\CompetenceController;
use App\Http\Controllers\DiplomeController;
use App\Http\Controllers\EtablissementController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\IntervenantController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\CompetenceController;
use App\Http\Controllers\DomaineController;

use App\Models\AffectationIC;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/users',[DiplomeController::class,'users']);
require __DIR__.'/auth.php';


Route::resource('intervenant',IntervenantController::class);
Route::resource('etablissement',EtablissementController::class);
Route::resource('role',RoleController::class);
Route::resource('formation',FormationController::class);
Route::resource('certifications',CertificationController::class);
Route::resource('domaines',DomaineController::class);
Route::resource('competence',CompetenceController::class);
Route::resource('affectation',AffectationICController::class);
Route::post('password/email', [PasswordResetLinkController::class,'store'])->name('password.email');
