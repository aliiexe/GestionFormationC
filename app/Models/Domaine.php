<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Domaine extends Model
{
    use HasFactory;


    protected $fillable = [
        'nom_domaine',
        'status'
    ];

    public function certifications()
    {
        return $this->hasMany(Certification::class);
    }
}
