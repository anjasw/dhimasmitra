<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\User; // Tambahkan di bagian atas
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // Ambil filter tanggal dari query string
        $dateFrom = $request->input('date_from') ?: Carbon::now()->subDays(6)->format('Y-m-d');
        $dateTo = $request->input('date_to') ?: Carbon::now()->format('Y-m-d');

        // Ambil data transaksi untuk chart (group by tanggal)
        $period = new \DatePeriod(
            new \DateTime($dateFrom),
            new \DateInterval('P1D'),
            (new \DateTime($dateTo))->modify('+1 day')
        );

        $labels = [];
        $totals = [];

        foreach ($period as $date) {
            $labels[] = $date->format('Y-m-d');
            // Ubah: hitung jumlah transaksi, bukan jumlah nominal
            $totals[] = Transaction::where('status', 'paid')->whereDate('created_at', $date->format('Y-m-d'))->count();
        }

        // Ambil transaksi paid terbaru (misal 10 data)
        $paidTransactions = Transaction::where('status', 'paid')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($trx) {
                return [
                    'id' => $trx->id,
                    'created_at' => $trx->created_at->format('Y-m-d'),
                    'invoice_code' => $trx->invoice_code,
                    'customer_name' => $trx->user->name ?? '-',
                    'total' => $trx->total,
                ];
            });

        // Ambil semua tanggal register user (group by tanggal)
        $userDates = User::selectRaw('DATE(created_at) as date')
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('date')
            ->toArray();

        $userLabels = $userDates;
        $userData = [];
        foreach ($userDates as $date) {
            $userData[] = User::whereDate('created_at', $date)->count();
        }

        return Inertia::render('Dashboard', [
            'chartLabels' => $labels,
            'chartData' => [
                'totals' => $totals,
                'date_from' => $dateFrom,
                'date_to' => $dateTo,
            ],
            'paidTransactions' => $paidTransactions,
            'userLabels' => $userLabels,
            'userData' => $userData,
        ]);
    }
}
