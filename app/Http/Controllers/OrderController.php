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
        $orders = \App\Models\Transaction::with(['user', 'items.cart.product'])
            ->orderByDesc(\DB::raw('COALESCE(updated_at, created_at)'))
            ->paginate(10);

        // Map data orders
        $orders->getCollection()->transform(function ($order) {
            $waktu = $order->updated_at ?? $order->created_at;
            // if($order->status !== "paid"){
            //     $isExpired = now()->diffInMinutes($waktu) < -10;
            // }else{
            //     $isExpired = false;
            // }
            return [
                'id' => $order->id,
                'customer_name' => $order->user->name ?? '-',
                'product_name' => $order->items->pluck('cart.product.name')->implode(', '),
                'qty' => $order->items->sum('quantity'),
                'total' => $order->total,
                'status' => $order->status,
                'created_at' => $waktu->format('Y-m-d H:i'),
            ];
        });

        return inertia('Orders/OrdersList', [
            'orders' => $orders,
        ]);
    }
    
    public function detail($id)
    {
        $order = \App\Models\Transaction::with(['user', 'items.cart.product'])->findOrFail($id);

        $items = $order->items->map(function ($item) {
            return [
                'product_name' => $item->cart && $item->cart->product ? $item->cart->product->name : '-',
                'qty' => $item->quantity,
                'price' => $item->price,
            ];
        });

        return response()->json([
            'id' => $order->id,
            'customer_name' => $order->user->name ?? '-',
            'status' => $order->status,
            'created_at' => ($order->updated_at ?? $order->created_at)->format('Y-m-d H:i'),
            'total' => $order->total,
            'items' => $items,
        ]);
    }
}
