<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuth extends Controller
{

    // this function is for redirecting to google 
    public function googleLogin()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleLoginCallback(){
        try {
            $googleUser = Socialite::driver('google')->user();
        
            $user = User::where('google_id', $googleUser->id)->first();
        
            if ($user) {
                Auth::login($user);
                return redirect()->route('home');
            } else {
                $userData = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'image' => $googleUser->avatar,
                    'password' => Hash::make('Password@1234'),
                    'google_id' => $googleUser->id,
                ]);
        
                if ($userData) {
                    Auth::login($userData);
                    return redirect()->route('home');
                }
            }
        } catch (Exception $e) {
            dd($e);
        }
        
      
       
    }
}
