<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Application;
use App\Models\Brand;
use Inertia\Inertia;
class FrontController extends Controller
{
    

    public function home(){
        $laravelVersion = Application::VERSION;
        $phpVersion = PHP_VERSION;

        $brands = Brand::query('status', 1)->limit(18)->get();
        // dd($brands);
        return Inertia::render('Welcome', [
            'brands' => $brands,
            'laravelVersion' => $laravelVersion,
            'phpVersion' => $phpVersion
        ]);
    }
}
