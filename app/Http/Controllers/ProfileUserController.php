<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\Cart;

class ProfileUserController extends Controller
{
    public function index()
    {

        // dd('a');
        $auth = Auth::user();
        // dd($auth);
        
        $isLoggedIn = false;
        $role = null;
        if ($auth) {
            $isLoggedIn = true;
            $role = $auth->role;
        } else {
            $isLoggedIn = false;
            $role = null;
        }
        $categories = Category::query()->where('status','!=', 2)->with(['subcategories' => function($q){
            $q->where('status', 1);
        }])->get();

        $carts = Cart::select('id', 'user_id', 'product_id', 'quantity')
            ->where('user_id', auth()->id())
            ->with(['product' => function($q){
                $q->with(['images']);
            }, 'user' => function($q){
                $q->select('id', 'name', 'email');
            }])
            ->get()
            ->map(function($cart) {
                // Pastikan kolom fix_price ada di relasi product
                $cart->product->fix_price_formatted = isset($cart->product->fix_price)
                    ? 'Rp ' . number_format($cart->product->fix_price, 0, ',', '.')
                    : null;
                
                $cart->product->fix_price = (int)$cart->product->fix_price;
                return $cart;
            });
        return Inertia::render('Front/ProfileUser', [
            'isLoggedIn' => $isLoggedIn,
            'role' => $role,
            'categories' => $categories,
            'carts' => $carts,
        ]);
    }
}
