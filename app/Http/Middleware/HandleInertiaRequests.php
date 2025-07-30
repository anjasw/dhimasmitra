<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Cart;
use App\Models\Contact;

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
        $categories = Category::query()->where('status', 1)
            ->with(['subcategories' => function($q){
                $q->where('status', 1);
            }])->get();

        $auth = $request->user();
        $isLoggedIn = $auth ? true : false;
        $role = $auth ? $auth->role : null;

        $carts = [];
        if ($auth) {
            $carts = Cart::select('id', 'user_id', 'product_id', 'quantity')
                ->where('user_id', $auth->id)
                ->with(['product.images', 'user:id,name,email'])
                ->get()
                ->map(function($cart) {
                    $cart->product->fix_price_formatted = isset($cart->product->fix_price)
                        ? 'Rp ' . number_format($cart->product->fix_price, 0, ',', '.')
                        : null;
                    return $cart;
                });
        }
        $contact = Contact::first();
        
        return array_merge(parent::share($request), [
            'contact' => $contact,
            'category' => $categories,
            'carts' => $carts,
            'isLoggedIn' => $isLoggedIn,
            'role' => $role,
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ]);
    }
}
