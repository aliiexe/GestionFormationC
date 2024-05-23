<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AffectationIC extends Model
{
    use HasFactory;

    protected $table = 'affectation_i_c';

    protected $fillable = [
        'intervenants_id',
        'competences_id',
        'certifications_id',
    ];

    // Relation avec le modèle Intervenant
    public function intervenant()
    {
        return $this->belongsTo(Intervenant::class, 'intervenants_id');
    }

    // Relation avec le modèle Competence
    public function competence()
    {
        return $this->belongsTo(Competence::class, 'competences_id');
    }

    // Relation avec le modèle Certification
    public function certification()
    {
        return $this->belongsTo(Certification::class, 'certifications_id');
    }
}
