import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard({ chartData, chartLabels, paidTransactions, userLabels, userData }) {
    const [dateFrom, setDateFrom] = useState(chartData?.date_from || '');
    const [dateTo, setDateTo] = useState(chartData?.date_to || '');

    const transaksiData = {
        labels: chartLabels,
        datasets: [
            {
                label: 'Total Transaksi',
                data: chartData?.totals || [],
                backgroundColor: 'rgba(37, 99, 235, 0.7)',
            },
        ],
    };

    const userChartData = {
        labels: userLabels,
        datasets: [
            {
                label: 'User Register',
                data: userData || [],
                fill: false,
                borderColor: 'rgba(16, 185, 129, 1)',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                tension: 0.3,
            },
        ],
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Dashboard page" />
            </Head>

            <div className="pt-6 pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Chart Bar Transaksi */}
                    <div className="col-span-2 bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="flex flex-col gap-4 mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Statistik Transaksi</h3>
                            <form
                                className="flex flex-col sm:flex-row sm:items-center gap-2 w-full"
                                method="get"
                                action={route('dashboard')}
                                onSubmit={e => {
                                    if (dateTo && dateFrom && dateTo < dateFrom) {
                                        e.preventDefault();
                                        alert('Tanggal hingga tidak boleh kurang dari tanggal dari.');
                                    }
                                }}
                            >
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                    <input
                                        type="date"
                                        value={dateFrom}
                                        onChange={e => setDateFrom(e.target.value)}
                                        name="date_from"
                                        className="border rounded px-2 py-1 w-full sm:w-auto"
                                        max={dateTo || undefined}
                                    />
                                    <span className="mx-1 hidden sm:inline">-</span>
                                    <input
                                        type="date"
                                        value={dateTo}
                                        onChange={e => setDateTo(e.target.value)}
                                        name="date_to"
                                        className="border rounded px-2 py-1 w-full sm:w-auto"
                                        min={dateFrom || undefined}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition w-full sm:w-auto"
                                >
                                    Filter
                                </button>
                            </form>
                        </div>
                        <Bar data={transaksiData} />
                    </div>
                    {/* Paid Transactions Table Widget */}
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Transaksi Paid Terbaru</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr>
                                        <th className="px-2 py-1 text-left text-gray-500">Tanggal</th>
                                        <th className="px-2 py-1 text-left text-gray-500">Invoice</th>
                                        <th className="px-2 py-1 text-left text-gray-500">Customer</th>
                                        <th className="px-2 py-1 text-right text-gray-500">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paidTransactions.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-center py-2 text-gray-400">Tidak ada data</td>
                                        </tr>
                                    )}
                                    {paidTransactions.map((trx) => (
                                        <tr key={trx.id}>
                                            <td className="px-2 py-1">{trx.created_at}</td>
                                            <td className="px-2 py-1">{trx.invoice_code}</td>
                                            <td className="px-2 py-1">{trx.customer_name}</td>
                                            <td className="px-2 py-1 text-right">Rp {trx.total?.toLocaleString('id-ID')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* Chart Line User Register */}
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Statistik User Register</h3>
                        <Line data={userChartData} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
