<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        return $this->belongsTo(Theme::class);
    }
}
