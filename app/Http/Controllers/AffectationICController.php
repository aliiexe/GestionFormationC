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
        $validatedData = $request->validate([
            'intervenants_id' => 'required|exists:intervenants,id',
            'competences_id' => 'required|exists:competences,id',
            'certifications_id' => 'required|exists:certifications,id',
        ]);

        $affectation = AffectationIC::create($validatedData);
        return response()->json($affectation, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AffectationIC  $affectationIC
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(AffectationIC $affectationIC)
    {
        $affectationIC->load(['intervenant', 'competence', 'certification']);
        return response()->json($affectationIC);
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
        $validatedData = $request->validate([
            'intervenants_id' => 'required|exists:intervenants,id',
            'competences_id' => 'required|exists:competences,id',
            'certifications_id' => 'required|exists:certifications,id',
        ]);

        $affectationIC->update($validatedData);
        return response()->json($affectationIC);
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
        return response()->json(null, 204);
    }
}
