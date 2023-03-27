<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
        // or return response(compact('user', 'name'));
    }

    public function login(LoginRequest $request){
        $credentials = $request->validated();

        if (!Auth::attempt($credentials)){
            return response([
                'message' => 'Email ou Senha incorretos.'
            ]);
        }

        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));

        //User::where('email', $credentials['email']);
    }

    public function logout(Request $request){
        /** @var User $user */
        $user = $request->user();

        $user->currentAccessToken()->delete();
        
        return response('', 204);
    }
}
