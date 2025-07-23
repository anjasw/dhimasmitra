<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProfileUserController extends Controller
{
    public function index()
    {
        return Inertia::render('Pages/Front/ProfileUser');
    }
}
