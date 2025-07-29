<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\TransactionItem;

class OrdersController extends Controller
{
    public function index(Request $request)
    {
        $orders = Transaction::with(['user', 'items.product'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Flatten data for table preview
        $orders->getCollection()->transform(function ($order) {
            // Ambil produk pertama untuk preview tabel
            $firstItem = $order->items->first();
            return [
                'id' => $order->id,
                'customer_name' => $order->user->name ?? '-',
                'product_name' => $firstItem ? ($firstItem->product->name ?? '-') : '-',
                'qty' => $firstItem ? $firstItem->quantity : 0,
                'total' => $order->total,
                'status' => $order->status,
                'created_at' => $order->created_at->format('Y-m-d'),
            ];
        });

        return Inertia::render('Orders/OrdersList', [
            'orders' => $orders,
        ]);
    }

    public function show($id)
    {
        $order = Transaction::with(['user', 'items.product'])->findOrFail($id);

        // Siapkan detail item untuk modal
        $items = $order->items->map(function ($item) {
            return [
                'product_name' => $item->product->name ?? '-',
                'qty' => $item->quantity,
                'price' => $item->price,
            ];
        });

        return response()->json([
            'id' => $order->id,
            'customer_name' => $order->user->name ?? '-',
            'status' => $order->status,
            'created_at' => $order->created_at->format('Y-m-d'),
            'total' => $order->total,
            'items' => $items,
        ]);
    }
}