<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use App\Models\Transaction;

class PaymentController extends Controller
{
    public function getSnapToken(Request $request){
        $userId = auth()->id();
        $transaction = Transaction::find($request->transaction_id);
        // Buat parameter sesuai kebutuhan Midtrans
        $invoice_code = 'DMT-' . time() . $userId . rand(100,999);

         Transaction::where('id', $request->transaction_id)->update(['invoice_code' => $invoice_code]);
        // $transaction;

        $params = [
            'transaction_details' => [
                'order_id' => $invoice_code,
                'gross_amount' => (float)$transaction->total,
            ],
            'customer_details' => [
                'first_name' => $transaction->user->name,
                'email' => $transaction->user->email,
                'phone' => '+628232362462',
                'shipping_address' => [
                    'first_name' => $transaction->user->name,
                    'email' => $transaction->user->email,
                    'phone' => '+628232362462',
                    'address' => $transaction->alamat ?? 'Alamat belum diisi',
                    'city' => 'Jakarta',
                    'postal_code' => '12345',
                    'country_code' => 'IDN'
                ],
                // Jika ingin billing address juga:
                // 'billing_address' => [...],
            ],
            'item_details' => $transaction->items->map(function ($item) {
                return [
                    'id' => $item->product_id,
                    'price' => $item->price,
                    'quantity' => $item->quantity,
                    'name' => $item->product->name,
                ];
            })->toArray(),
        ];
        // Inisialisasi Midtrans
        // \Midtrans\Config::$serverKey = 'YOUR_SERVER_KEY';
        // \Midtrans\Config::$isProduction = true;
        \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
        \Midtrans\Config::$isProduction = config('services.midtrans.is_production', false);
        $snapToken = \Midtrans\Snap::getSnapToken($params);

        return response()->json(['snap_token' => $snapToken]);
    }
    public function handlePaymentMidtrans(Request $request)
    {
        // Logika untuk menangani pembayaran Midtrans
        // Misalnya, verifikasi status pembayaran, simpan transaksi ke database, dll.
        // Ini hanya contoh, implementasi sebenarnya tergantung pada kebutuhan aplikasi Anda.

        return response()->json(['message' => 'Payment handled successfully']);
    }
}