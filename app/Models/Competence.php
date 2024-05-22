<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competence extends Model
{
    use HasFactory;

    protected $fillable = [
        'libelle',
        'intervenants_id'
    ];

    public function intervenant()
    {
        return $this->belongsTo(Intervenant::class, 'intervenants_id');
    }
}
