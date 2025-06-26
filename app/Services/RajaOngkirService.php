<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class RajaOngkirService
{
    protected $key;
    protected $url;

    public function __construct()
    {
        $this->key = config('services.rajaongkir.key');
        $this->url = config('services.rajaongkir.url');
    }

    public function getProvinces()
    {
        return Http::withHeaders([
            'key' => $this->key,
        ])->get($this->url . '/province')['rajaongkir']['results'];
    }

    public function getCities($province_id)
    {
        return Http::withHeaders([
            'key' => $this->key,
        ])->get($this->url . "/city?province=$province_id")['rajaongkir']['results'];
    }

    public function checkShipping($origin, $destination, $weight, $courier)
    {
        return Http::withHeaders([
            'key' => $this->key,
        ])->post($this->url . '/cost', [
            'origin' => $origin,
            'destination' => $destination,
            'weight' => $weight,
            'courier' => $courier,
        ])['rajaongkir']['results'][0]['costs'];
    }
}
