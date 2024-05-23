<?php

namespace App\Http\Controllers;

use App\Models\Action;
use Illuminate\Http\Request;

class ActionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Action::all());
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
        $action = new Action();
        $action->entreprises_id = $request->entreprises_id;
        $action->themes_id = $request->themes_id;
        $action->intervenants_id = $request->intervenants_id;
        $action->etablissements_id = $request->etablissements_id;
        $action->date_debut_prev = $request->date_debut_prev;
        $action->date_fin_prev = $request->date_fin_prev;
        $action->nbparticipants = $request->nbparticipants;
        $action->status = 0;
        $action->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Action $action)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Action $action)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Action $action)
    {
        $action = Action::find($request->id);
        $action->date_debut_real = $request->date_debut_real;
        $action->date_fin_real = $request->date_fin_real;
        $action->prix_real = $request->prix_real;
        $action->statut = $request->statut;
        $action->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Action $action)
    {
        $action = Action::find($action);
        $action->delete();
    }
}
