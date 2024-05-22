<?php

namespace App\Http\Controllers;

use App\Models\AffectationIC;
use Illuminate\Http\Request;

class AffectationICController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(AffectationIC::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $affectationIC = new AffectationIC();
        $affectationIC->intervenant_id = $request->intervenant_id;
        $affectationIC->competence_id = $request->competence_id;
        $affectationIC->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(AffectationIC $affectationIC)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AffectationIC $affectationIC)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, AffectationIC $affectationIC)
    {
        $affectationIC->intervenant_id = $request->intervenant_id;
        $affectationIC->competence_id = $request->competence_id;
        $affectationIC->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AffectationIC $affectationIC)
    {
        $affectationIC->delete();
    }
}
