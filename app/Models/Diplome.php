<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Diplome extends Model
{
    use HasFactory;

    protected $fillable = [
        'intitule_diplome',
        'type_diplome',
        'specialite_diplome',
        'intervenant_id',
    ];
}
