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
        'domaines_id',
        'intervenants_id'
    ];


    public function intervenants()
    {
        return $this->belongsTo(Intervenant::class);
    }
}
