<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;

class PlanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Plan::with('theme')->get());
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
        $values = $request->all();
        $image = $request->file('image');
        $name = date('YmdHis').'.'.$image->getClientOriginalExtension();
        $image->move('../frontend/public/images',$name);
        $plan = new Plan([
            'themes_id' => $values['themes_id'],
            'etablissements_id' => $values['etablissements_id'],
            'nbjours' => $values['nbjours'],
            'description' => $values['description'],
            'nbparticipants' => $values['nbparticipants'],
            'cout_previsionel' => $values['cout_previsionel'],
            'image' => $name
        ]);
        $plan->exercice = date('Y');
        $plan->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Plan $plan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Plan $plan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Plan $plan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Plan $plan)
    {
        $plan = Plan::find($plan);
        $plan->delete();
    }
}
