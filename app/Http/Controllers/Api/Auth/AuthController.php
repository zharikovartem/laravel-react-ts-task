<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\User;

class AuthController extends Controller
{
    public function authMe($remember_token) {
        $user = User::where('remember_token', $remember_token)->first();

        if($user) {
            return response()->json([
                'messages'=>['Авторизация прошла успешно'],
                'remember_token'=> $remember_token,
                'user'=>$user
                ], 200);
        } else {
            return response()->json(['resultCode'=>1, 'error'=>true, 'messages'=>['Нет токена'] ], 401);
        }
    }
}
