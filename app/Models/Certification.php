<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    use HasFactory;

    protected $fillable = [
        'intitule_certification',
        'organisme_certification',
        'type_certification',
        'domaine_id',
    ];
}
