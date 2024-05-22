<?php

namespace App\Http\Controllers;

use App\Models\Etablissement;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EtablissementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Etablissement::with('region')->get());
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
            'nom_efp' => 'required|string',
            'adresse' => 'required|string',
            'telephone' => 'required|string',
            'ville' => 'required|string',
            'status' => 'nullable|integer',
            'regions_id' => 'required|exists:regions,id',
        ]);

        $etablissement = Etablissement::create($request->all());
        return response()->json($etablissement, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Etablissement  $etablissement
     * @return \Illuminate\Http\Response
     */
    public function show(Etablissement $etablissement)
    {
        return response()->json($etablissement);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Etablissement  $etablissement
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Etablissement $etablissement)
    {
        $request->validate([
            'nom_efp' => 'required|string',
            'adresse' => 'required|string',
            'telephone' => 'required|string',
            'ville' => 'required|string',
            'status' => 'nullable|integer',
            'regions_id' => 'required|exists:regions,id',
        ]);

        $etablissement->update($request->all());
        return response()->json($etablissement, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Etablissement  $etablissement
     * @return \Illuminate\Http\Response
     */
    public function destroy(Etablissement $etablissement)
    {
        $etablissement->delete();
        return response()->json(null, 204);
    }
}
