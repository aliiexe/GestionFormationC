<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    use HasFactory;

    protected $fillable = [
        'intitule_theme',
        'duree_formation',
        'status',
        'domaines_id',
        'image',
        'description'
    ];

    public function domaines()
    {
        return $this->belongsTo(Domaine::class);
    }

    public function plans()
    {
        return $this->hasMany(Plan::class);
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }
}
