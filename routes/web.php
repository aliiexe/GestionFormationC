<?php

use App\Http\Controllers\DiplomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/users',[DiplomeController::class,'users']);
require __DIR__.'/auth.php';
