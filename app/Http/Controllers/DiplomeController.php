<?php

namespace App\Http\Controllers;

use App\Models\Diplome;
use App\Models\User;
use Illuminate\Http\Request;

class DiplomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Diplome::all());
    }
    public function users()
    {
        return response()->json(User::all());
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
        $diplome = new Diplome();
        $diplome->intitule_diplome = $request->intitule_diplome;
        $diplome->type_diplome = $request->type_diplome;
        $diplome->specialite_diplome = $request->specialite_diplome;
        $diplome->user_id = $request->user_id;
        $diplome->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Diplome $diplome)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Diplome $diplome)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Diplome $diplome)
    {
        $diplome = new Diplome();
        $diplome->intitule_diplome = $request->intitule_diplome;
        $diplome->type_diplome = $request->type_diplome;
        $diplome->specialite_diplome = $request->specialite_diplome;
        $diplome->user_id = $request->user_id;
        $diplome->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Diplome $diplome)
    {
        $diplome->delete();
    }
}
