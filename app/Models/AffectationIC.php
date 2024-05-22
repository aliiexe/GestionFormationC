<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AffectationIC extends Model
{
    use HasFactory;

    protected $fillable = [
        'intervenant_id',
        'competence_id',
    ];
}
