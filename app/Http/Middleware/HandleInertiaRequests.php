<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        // Load user with roles to make admin checks easy in React
        $user = $request->user()?->load('roles');

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user()?->load('roles'),
                // permissions optional if you need Spatie permissions in React
                'can' => $user
                    ? $user->roles
                        ->flatMap(fn($role) => $role->permissions)
                        ->mapWithKeys(fn($permission) => [$permission->name => $user->can($permission->name)])
                        ->all()
                    : [],
                'cartCount' => $request->user() 
                ? \App\Models\ShoppingCartItem::whereHas('cart', function($query) use ($request) {
                    $query->where('customer_id', $request->user()->id)->where('status', 0);
                })->sum('quantity') 
                : 0,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],
        ]);
    }
}
