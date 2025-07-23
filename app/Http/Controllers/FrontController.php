<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use App\Models\Brand;
use App\Models\Slider;
use App\Models\Category;
use App\Models\Cart;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\RajaOngkirController;

class FrontController extends Controller
{
    

    public function home(){


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

        $rjc = new RajaOngkirController;
        $listKota = $rjc->getKota();

        $laravelVersion = Application::VERSION;
        $phpVersion = PHP_VERSION;

        $brands = Brand::query('status', 1)->limit(18)->get();

        $sliders = Slider::where('is_active', 1)->orderBy('order')->get();
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
                return $cart;
            });
        // dd($carts);
        return Inertia::render('Welcome', [
            'brands' => $brands,
            'laravelVersion' => $laravelVersion,
            'phpVersion' => $phpVersion,
            'listKota' => $listKota,
            'sliders' => $sliders,
            'categories' => $categories,
            'carts' => $carts,
            'isLoggedIn' => $isLoggedIn,
            'role' => $role
        ]);
    }

    public function order(){
        sleep(1);
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
                return $cart;
            });
        return Inertia::render('Front/Order', [
            'categories' => $categories,
            'carts' => $carts,
            'isLoggedIn' => $isLoggedIn,
            'role' => $role
        ]);
    }

    public function AccountOrderSuccess(){
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
                return $cart;
            });
        // dd($categories);
        return Inertia::render('Front/Account/OrderSuccess', [
            'categories' => $categories,
            'carts' => $carts,
        ]);
    }
    public function AccountOrderFail(){
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
                return $cart;
            });
        // dd($categories);
        return Inertia::render('Front/Account/OrderFail', [
            'categories' => $categories,
            'carts' => $carts,
        ]);
    }

    public function handlePayAccount(){
        // Logika untuk menangani pembayaran akun
        // Misalnya, verifikasi status pembayaran, simpan transaksi ke database, dll.
        // Ini hanya contoh, implementasi sebenarnya tergantung pada kebutuhan aplikasi Anda.

        return response()->json(['message' => 'Payment handled successfully']);
    }

    public function AccountOrderError(){
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
                return $cart;
            });
        // dd($categories);
        return Inertia::render('Front/Account/OrderError', [
            'categories' => $categories,
            'carts' => $carts,
        ]);
    }


    public function cart(){

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
        return Inertia::render('Front/Cart', [
            'categories' => $categories,
            'carts' => $carts,
            'isLoggedIn' => $isLoggedIn,
            'role' => $role,
        ]);
    }



    public function updateCart(Request $request){
        $id = $request->id;
        $qty = $request->quantity;

        if ($qty < 1) {
            return response()->json(['error' => 'Quantity minimal 1'], 422);
        }

        // Ambil cart milik user yang sedang login
        $cart = \App\Models\Cart::where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$cart) {
            return response()->json(['error' => 'Cart not found'], 404);
        }

        $cart->quantity = $qty;
        $cart->save();

        return response()->json([
            'success' => true,
            'cart' => $cart
        ]);
    }
}
