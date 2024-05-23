<?php

namespace App\Http\Controllers;

use App\Models\AffectationIC;
use Illuminate\Http\Request;

class AffectationICController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $affectations = AffectationIC::with(['intervenant', 'competence', 'certification'])->get();
        return response()->json($affectations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'intervenant_id' => 'required|exists:intervenants,id',
            'competence_id' => 'required|exists:competences,id',
            'certifications_id' => 'required|exists:certifications,id',
        ]);

        $affectation = AffectationIC::create($request->all());

        return response()->json([
            'message' => 'Affectation créée avec succès.',
            'affectation' => $affectation
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AffectationIC  $affectationIC
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(AffectationIC $affectationIC)
    {
        return response()->json($affectationIC->load(['intervenant', 'competence', 'certification']));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AffectationIC  $affectationIC
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, AffectationIC $affectationIC)
    {
        $request->validate([
            'intervenant_id' => 'required|exists:intervenants,id',
            'competence_id' => 'required|exists:competences,id',
            'certifications_id' => 'required|exists:certifications,id',
        ]);

        $affectationIC->update($request->all());

        return response()->json([
            'message' => 'Affectation mise à jour avec succès.',
            'affectation' => $affectationIC
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AffectationIC  $affectationIC
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(AffectationIC $affectationIC)
    {
        $affectationIC->delete();

        return response()->json([
            'message' => 'Affectation supprimée avec succès.'
        ]);
    }
}
