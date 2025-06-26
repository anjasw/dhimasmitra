<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\RajaOngkirService;
use Illuminate\Support\Facades\Http;

class RajaOngkirController extends Controller
{
    public function getOngkir(Request $request, RajaOngkirService $raja){
        // return response()->json($raja);
        $ongkir = $raja->checkShipping(
            origin: 501, // contoh: Yogyakarta
            destination: $request->destination,
            weight: $request->weight,
            courier: $request->courier // jne, pos, tiki
        );

        return response()->json($ongkir);
    }

    public function getKota(Request $request){
        $res = Http::withHeaders(['key' => config('services.rajaongkir.key')])
            ->get(config('services.rajaongkir.url') . '/city')
            ->json('rajaongkir.results');

        return response()->json($res);
    }
}
