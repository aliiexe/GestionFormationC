<?php

namespace App\Http\Controllers;

use App\Models\Theme;
use Illuminate\Http\Request;


class FormationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Theme::all());
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
        // return response()->json($request->file('image')->getClientOriginalName());
        $values = $request->all();
        $image = $request->file('image');
        $name = date('YmdHis').'.'.$image->getClientOriginalExtension();
        $image->move('../frontend/public/images',$name);
        $formation = new Theme([
            'intitule_theme' => $values['intitule_theme'],
            'duree_formation' => $values['duree_formation'],
            'description' => $values['description'],
            'image' => $name
        ]);
        $formation->domaines_id = 1;
        $formation->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Theme $formation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Theme $formation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Theme $formation)
    {
        $formation = Theme::find($formation);
        $formation->intitule_theme = $request->intitule_theme;
        $formation->duree_formation = $request->duree_formation;
        $formation->status = $request->status;
        $formation->domaines_id = $request->domaines_id;
        $formation->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($formation)
    {
        $formation = Theme::find($formation);
        $formation->delete();
    }
}
