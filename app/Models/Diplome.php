<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Intervenant;
class Diplome extends Model
{
    use HasFactory;

    protected $fillable = [
        'intitule_diplome',
        'typediplome',
        'specialite_diplome',
        'intervenants_id',
    ];
    public function Intervenant(){
        return $this->belongsTo(Intervenant::class,'intervenants_id');
    }
}
