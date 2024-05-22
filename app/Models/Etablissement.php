<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Intervenant;
class Etablissement extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_efp',
        'adresse', // Correction de 'adress' à 'adresse'
        'tel',
        'ville',
        'status',
        'user_id',
        'region_id'
    ];

    public function intervenants()
    {
        return $this->hasMany(Intervenant::class, 'etablissements_id'); // Assurez-vous que la clé étrangère est correcte
    }
}
