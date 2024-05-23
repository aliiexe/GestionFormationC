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
        'typecertification',
        'domaines_id'
    ];

    /**
     * Get the domaine that owns the certification.
     */
    public function domaine()
    {
        return $this->belongsTo(Domaine::class, 'domaines_id');
    }
    public function affectations()
    {
        return $this->hasMany(AffectationIC::class, 'certifications_id');
    }
}
