<?php

use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\CompetenceController;
use App\Http\Controllers\DiplomeController;
use App\Http\Controllers\EtablissementController;
use App\Http\Controllers\FormationController;
use App\Http\Controllers\IntervenantController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\DomaineController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\reseter;
use App\Models\Plan;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AffectationICController;


Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/users',[DiplomeController::class,'users']);
require __DIR__.'/auth.php';


Route::resource('intervenant',IntervenantController::class);
Route::resource('etablissement',EtablissementController::class);
Route::resource('role',RoleController::class);
Route::resource('formation',FormationController::class);
Route::resource('plan',PlanController::class);
Route::resource('certifications',CertificationController::class);
Route::resource('domaines',DomaineController::class);
Route::resource('competences',CompetenceController::class);
Route::resource('affectation',AffectationICController::class);
Route::post('password/email', [PasswordResetLinkController::class,'store'])->name('password.email');
Route::resource('regions', RegionController::class);
Route::resource('etablissements', EtablissementController::class);
Route::resource('affectations', AffectationICController::class);
Route::post('updateImage',[FormationController::class,'updateImage']);

Route::post('/reseter', [reseter::class,'reseter']);