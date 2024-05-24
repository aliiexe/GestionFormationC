<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'raison',
        'email',
        "site",
        'logo',
        'representant',
        'telephone1',
        'telephone2',
        'telephone3',
        'status'
    ];

    public function region()
    {
        return $this->belongsTo(Region::class, 'regions_id');
    }

    public function actions()
    {
        return $this->hasMany(Action::class);
    }

    public function plans()
    {
        return $this->hasMany(Plan::class);
    }
}
