<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class OrdersExport implements FromView
{
    protected $orders;

    public function __construct($orders)
    {
        // $this->orders = $orders;
        // eager load items dan product agar tidak N+1
        $this->orders = $orders->load('items.product', 'user');
    }

    public function view(): View
    {
        return view('exports.orders', [
            'orders' => $this->orders
        ]);
    }
}