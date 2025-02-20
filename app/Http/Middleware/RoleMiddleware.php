<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!auth()->check() || !auth()->user()->hasAnyRole($roles)) {
        
             return abort(403, 'You do not have access to this page . Go Back  ');
        // dd('You do not have access to this page.');
        //     abort(403, 'You do not have access to this page.');
        }

        return $next($request);
    }
}
