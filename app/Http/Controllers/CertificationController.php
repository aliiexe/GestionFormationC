<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use Illuminate\Http\Request;

class CertificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $certifications = Certification::all();
        return response()->json($certifications);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'intitule_certification' => 'required|string|max:255',
            'organisme_certification' => 'required|string|max:255',
            'typecertification' => 'required|string|max:255',
            'domaines_id' => 'required|integer|exists:domaines,id',
        ]);

        $certification = Certification::create($request->all());

        return response()->json([
            'message' => 'Certification créée avec succès.',
            'certification' => $certification
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Certification  $certification
     * @return \Illuminate\Http\Response
     */
    public function show(Certification $certification)
    {
        return response()->json($certification);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Certification  $certification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Certification $certification)
    {
        $request->validate([
            'intitule_certification' => 'required|string|max:255',
            'organisme_certification' => 'required|string|max:255',
            'typecertification' => 'required|string|max:255',
            'domaines_id' => 'required|integer|exists:domaines,id',
        ]);

        $certification->update($request->all());

        return response()->json([
            'message' => 'Certification mise à jour avec succès.',
            'certification' => $certification
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Certification  $certification
     * @return \Illuminate\Http\Response
     */
    public function destroy(Certification $certification)
    {
        $certification->delete();

        return response()->json([
            'message' => 'Certification supprimée avec succès.'
        ]);
    }
}
