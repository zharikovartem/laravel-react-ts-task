<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Support\Facades\Auth;

use App\User;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        // if (Auth::guard($guard)->check()) {
        //     return redirect(RouteServiceProvider::HOME);
        // }

        // return $next($request);

        $creds = $request->only(['email', 'password']);
        $remember = $request->only(['remember'])['remember'];

        $user = User::where('email', $creds['email'])->first();

        if (!$token = auth()->attempt($creds, $remember)) {
            return response()->json(['error'=>true, 'message'=>'Incorect creds!', '$remember' => $remember], 401);
        }

        return response()->json([
            'user'=>$user, 
            'remember_token'=>$user->getRememberToken(),
        ], 200);
    }
}
