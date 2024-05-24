<?php

namespace App\Http\Controllers;

use App\Models\AffectationIC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AffectationICController extends Controller
{
    // Afficher toutes les affectations IC
    public function index()
    {
        return AffectationIC::with('intervenant', 'competence', 'certification')->paginate(10);
    }

    // Afficher une affectation IC spécifique
    public function show($id)
    {
        return AffectationIC::with('intervenant', 'competence', 'certification')->findOrFail($id);
    }

    // Créer une nouvelle affectation IC
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'intervenants_id' => 'required|integer',
            'competences_id' => 'required|integer',
            'certifications_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        return AffectationIC::create($request->all());
    }

    // Mettre à jour une affectation IC existante
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'intervenants_id' => 'required|integer',
            'competences_id' => 'required|integer',
            'certifications_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $affectation = AffectationIC::findOrFail($id);
        $affectation->update($request->all());

        return $affectation;
    }

    // Supprimer une affectation IC existante
    public function destroy($id)
    {
        $affectation = AffectationIC::findOrFail($id);
        $affectation->delete();

        return response()->json(null, 204);
    }
}
