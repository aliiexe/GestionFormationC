<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Certification;
use App\Models\Domaine;
use App\Models\Intervenant;

class CertificationController extends Controller
{
    public function index()
    {
        $certifications = Certification::all();
        return response()->json($certifications);
    }

    public function create()
    {
        $domaines = Domaine::all();
        $intervenants = Intervenant::all();
        return response()->json([
            'domaines' => $domaines,
            'intervenants' => $intervenants
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'intitule_certification' => 'required|string|max:255',
            'organisme_certification' => 'required|string|max:255',
            'type_certification' => 'required|string|max:255',
            'domaines_id' => 'required|exists:domaines,id',
            'intervenants_id' => 'required|exists:intervenants,id',
        ]);

        $certification = Certification::create($request->all());

        return response()->json([
            'message' => 'Certification créée avec succès.',
            'certification' => $certification
        ], 201);
    }

    public function show($id)
    {
        $certification = Certification::findOrFail($id);
        return response()->json($certification);
    }

    public function edit($id)
    {
        $certification = Certification::findOrFail($id);
        $domaines = Domaine::all();
        $intervenants = Intervenant::all();
        return response()->json([
            'certification' => $certification,
            'domaines' => $domaines,
            'intervenants' => $intervenants
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'intitule_certification' => 'required|string|max:255',
            'organisme_certification' => 'required|string|max:255',
            'type_certification' => 'required|string|max:255',
            'domaines_id' => 'required|exists:domaines,id',
            'intervenants_id' => 'required|exists:intervenants,id',
        ]);

        $certification = Certification::findOrFail($id);
        $certification->update($request->all());

        return response()->json([
            'message' => 'Certification mise à jour avec succès.',
            'certification' => $certification
        ]);
    }

    public function destroy($id)
    {
        $certification = Certification::findOrFail($id);
        $certification->delete();

        return response()->json([
            'message' => 'Certification supprimée avec succès.'
        ]);
    }
}

