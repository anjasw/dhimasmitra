<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class KategoriController extends Controller
{
    public function index()
    {
        return Inertia::render('Pages/Front/Kategori');
    }
}
