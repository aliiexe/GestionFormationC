<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Etablissement;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [
        'themes_id',
        'etablissements_id',
        'exercice',
        'nbjours',
        'image',
        'description',
        'nbparticipants',
        'cout_previsionel',
        'status',
    ];

    public function theme()
    {
        return $this->belongsTo(Theme::class,'themes_id');
    }
    public function etablissement(){
        return $this->belongsTo(Etablissement::class,'etablissements_id');
    }
}
