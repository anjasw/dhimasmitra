<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use App\Models\Brand;
use App\Models\Slider;
use App\Models\Category;
use App\Models\Cart;
use Inertia\Inertia;

use App\Http\Controllers\RajaOngkirController;

class FrontController extends Controller
{
    

    public function home(){

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
        ]);
    }
}
