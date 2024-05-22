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
        'etablissements_id', // Assurez-vous que la table a cette colonne
        'user_id',
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
        return $this->belongsTo(Etablissement::class, 'etablissements_id'); // Assurez-vous que la clé étrangère est correcte
    }
    public function diplomes(){
        return $this->hasMany(Diplome::class,"intervenants_id");
    }
}
