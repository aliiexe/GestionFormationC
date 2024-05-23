<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class reseter extends Controller
{
    //
public function reseter(Request $request){

    $user=User::where('email',$request->email)->first();
$user->password= Hash::make($request->password);
$user->save();
return response()->json('reseted');
}
}
