<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competence extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle',
        'description'
    ];
    public function affectations()
    {
        return $this->hasMany(AffectationIC::class);
    }
}
