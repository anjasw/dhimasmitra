<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        $roles = array('admin');

        if(!$user){
            abort(403, 'Unauthorized');
            // redirect('/login');
        }else{
            // dd($roles);
            if (!in_array($user->role, $roles)) {
                abort(403, 'Unauthorized');
            }
        }

        
        
        return $next($request);
    }
}
