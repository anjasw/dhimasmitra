<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        return Inertia::render('Pages/Front/Order');
    }

    public function list() {
        sleep(1);
        $orders = \App\Models\Transaction::with(['user', 'items.cart.product'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($order) {
                // dd(now()->diffInMinutes($order->created_at));
                if($order->status !== "paid"){
                    $isExpired = now()->diffInMinutes($order->created_at) < -10;
                    // dd($isExpired);
                }else{
                    $isExpired = false;
                }
                return [
                    'id' => $order->id,
                    'customer_name' => $order->user->name ?? '-',
                    'product_name' => $order->items->pluck('cart.product.name')->implode(', '),
                    'qty' => $order->items->sum('quantity'),
                    'total' => $order->total,
                    'status' => $isExpired ? 'canceled' : $order->status,
                    'created_at' => $order->created_at->format('Y-m-d H:i'),
                ];
            });
        return inertia('Orders/OrdersList', [
            'orders' => $orders,
        ]);
    }
}
