<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Intervenant;
use App\Models\Plan;
class Etablissement extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_efp',
        'adresse',
        'telephone',
        'ville',
        'status',
        'regions_id'
    ];


    public function region()
    {
        return $this->belongsTo(Region::class, 'regions_id');
    }
    public function plan()
    {
        return $this->hasMany(Plan::class,'etablissements_id');
    }

    public function intervenants()
    {
        return $this->hasMany(Intervenant::class);
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }
}
