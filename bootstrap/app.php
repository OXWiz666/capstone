<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;


use App\Http\Middleware\GuestOrPatient;

use App\Http\Middleware\GuestMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
        $middleware->alias([
            'Guest' => GuestMiddleware::class,
            'GuestOrPatient' => GuestOrPatient::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
