<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Domaine;
use Illuminate\Http\Request;

class DomaineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $domaines = Domaine::all();
        return response()->json($domaines);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Typically used for returning data needed to create a resource.
        return response()->json(['message' => 'Endpoint to get necessary data for creating a Domaine']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom_domaine' => 'required|string|max:255',
            'status' => 'nullable|integer',
        ]);

        $domaine = Domaine::create($request->all());

        return response()->json([
            'message' => 'Domaine créé avec succès.',
            'domaine' => $domaine
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $domaine = Domaine::findOrFail($id);
        return response()->json($domaine);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $domaine = Domaine::findOrFail($id);
        // Typically used for returning data needed to edit a resource.
        return response()->json(['domaine' => $domaine]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'nom_domaine' => 'required|string|max:255',
            'status' => 'nullable|integer',
        ]);

        $domaine = Domaine::findOrFail($id);
        $domaine->update($request->all());

        return response()->json([
            'message' => 'Domaine mis à jour avec succès.',
            'domaine' => $domaine
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $domaine = Domaine::findOrFail($id);
        $domaine->delete();

        return response()->json([
            'message' => 'Domaine supprimé avec succès.'
        ]);
    }

    /**
     * Display a listing of the certifications for the specified domaine.
     */
    public function certifications($id)
    {
        $domaine = Domaine::findOrFail($id);
        $certifications = $domaine->certifications;
        return response()->json($certifications);
    }
}
