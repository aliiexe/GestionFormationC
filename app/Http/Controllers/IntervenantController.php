<?php

namespace App\Http\Controllers;

use App\Models\Intervenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class IntervenantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Intervenant::with('etablissement')->with('diplomes')->get());
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
        $intevenant = new Intervenant();
        $user = User::create([
            'name' => $request->nom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'roles_id'=>1
        ]);
        $intevenant->nom = $request->nom;
        $intevenant->matricule = $request->matricule;
        $intevenant->datenaissance = $request->datenaissance;
        $intevenant->typeintervenant = $request->typeintervenant;
        $intevenant->status = $request->status;
      

        $intevenant->users_id = $user->id;
        $intevenant->etablissements_id = $request->etablissement_id;
        $intevenant->status = '1';
        $intevenant->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Intervenant $intervenant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Intervenant $intervenant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Intervenant $intervenant)
    {
        $intervenant = Intervenant::find($intervenant)->first();
        $intervenant->nom = $request->nom;
        $intervenant->matricule = $request->matricule;
        $intervenant->datenaissance = $request->datenaissance;
        $intervenant->typeintervenant = $request->typeintervenant;
        $intervenant->status = $request->status;
        $intervenant->users_id = 3;
        $intervenant->etablissements_id = 2;
        $intervenant->status = '1';
        $intervenant->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($intervenant)
    {
        $intervenant = Intervenant::find($intervenant);
        $intervenant->delete();
    }
}
