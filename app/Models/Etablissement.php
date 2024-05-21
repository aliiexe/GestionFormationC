<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etablissement extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_efp',
        'adress',
        'tel',
        'ville',
        'status',
        'user_id',
        'region_id'
    ];
}
