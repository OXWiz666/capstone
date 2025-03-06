<?php

use App\Http\Middleware\GuestMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //


        $middleware->alias([
            'Guest' => GuestMiddleware::class
            // 'admin' => AdminMiddleware::class,
            // 'customer' => CustomerMiddleware::class,
            // 'adminstaff' => AdminStaffMiddleware::class,
            // 'GuestOrCustomer' => GuestOrCustomerMiddleware::class,
            // 'Guest' => GuestMiddleware::class,
            // 'sanctum' => EnsureFrontendRequestsAreStateful::class, // Add Sanctum Middleware Alias
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
