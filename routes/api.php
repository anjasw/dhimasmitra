<?php
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\RajaOngkirController;


Route::post('/get-ongkir', [RajaOngkirController::class, 'getOngkir']);
Route::get('/get-kota', [RajaOngkirController::class, 'getKota']);