<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Action extends Model
{
    use HasFactory;

    protected $fillable = [
        'entreprises_id',
        'themes_id',
        'intervenants_id',
        'etablissements_id',
        'date_debut_prev',
        'date_fin_prev',
        'date_debut_real',
        'date_fin_real',
        'prix_real',
        'nbparticipants',
        'statut',
    ];

    public function entreprises()
    {
        return $this->belongsTo(Entreprise::class);
    }

    public function themes()
    {
        return $this->belongsTo(Theme::class);
    }

    public function intervenants()
    {
        return $this->belongsTo(Intervenant::class);
    }

    public function etablissements()
    {
        return $this->belongsTo(Etablissement::class);
    }
}
