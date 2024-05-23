<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Etablissement;
use App\Models\Diplome;
use App\Models\Certification;
use App\Models\Competence;
class Intervenant extends Model
{
    use HasFactory;

    protected $fillable = [
        'matricule',
        'nom',
        'dateNaissance',
        'typeintervenant',
        'etablissements_id',
        'user_id',
        'image',
    ];

    public function certificats()
    {
        return $this->hasMany(Certification::class);
    }

    public function competences()
    {
        return $this->hasMany(Competence::class);
    }

    public function etablissement()
    {
        return $this->belongsTo(Etablissement::class, 'etablissements_id');
    }
    public function diplomes(){
        return $this->hasOne(Diplome::class,"intervenants_id");
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }
}
