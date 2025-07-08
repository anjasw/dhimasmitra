<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use App\Models\Brand;
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
        
        $sliders = \App\Models\Slider::where('is_active', 1)->orderBy('order')->get();
        // dd($brands);
        return Inertia::render('Welcome', [
            'brands' => $brands,
            'laravelVersion' => $laravelVersion,
            'phpVersion' => $phpVersion,
            'listKota' => $listKota,
            'sliders' => $sliders
        ]);
    }
}
