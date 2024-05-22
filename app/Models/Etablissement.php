<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
