<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Pages/Front/Order');
    }

    public function list()
    {
        return Inertia::render('Orders/OrdersList');
    }
}
