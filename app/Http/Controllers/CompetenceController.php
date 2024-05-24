<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Competence;

class CompetenceController extends Controller
{
    public function index()
    {
        $competences = Competence::all();
        return response()->json($competences);
    }

    public function create()
    {
        // Ne récupère pas les intervenants
        return response()->json([]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'libelle' => 'required|string|max:255',
            'description' => 'nullable|string|max:255', // Ajout de la validation pour la description
        ]);

        $competence = Competence::create($request->all());

        return response()->json([
            'message' => 'Compétence créée avec succès.',
            'competence' => $competence
        ], 201);
    }

    public function show($id)
    {
        $competence = Competence::findOrFail($id);
        return response()->json($competence);
    }

    public function edit($id)
    {
        $competence = Competence::findOrFail($id);

        return response()->json([
            'competence' => $competence,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'libelle' => 'required|string|max:255',
            'description' => 'nullable|string|max:255', // Ajout de la validation pour la description
        ]);

        $competence = Competence::findOrFail($id);
        $competence->update($request->all());

        return response()->json([
            'message' => 'Compétence mise à jour avec succès.',
            'competence' => $competence
        ]);
    }

    public function destroy($id)
    {
        $competence = Competence::findOrFail($id);
        $competence->delete();

        return response()->json([
            'message' => 'Compétence supprimée avec succès.'
        ]);
    }
}
