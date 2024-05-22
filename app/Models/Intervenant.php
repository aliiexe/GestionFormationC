<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intervenant extends Model
{
    use HasFactory;

    protected $fillable = [
        'matricule',
        'nom',
        'dateNaissance',
        'typeintervenant',
        'etablissement_id',
        'user_id',
    ];
}
