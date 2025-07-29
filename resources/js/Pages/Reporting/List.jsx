import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function List({ orders = [], filters = {} }) {
    const [status, setStatus] = useState(filters.status || '');
    const [dateFrom, setDateFrom] = useState(filters.date_from || '');
    const [dateTo, setDateTo] = useState(filters.date_to || '');

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('reporting.index'), {
            status,
            date_from: dateFrom,
            date_to: dateTo,
        });
    };

    const handleExport = () => {
        window.location.href = route('reporting.export', {
            status,
            date_from: dateFrom,
            date_to: dateTo,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <Link href={route('dashboard')} className="hover:text-blue-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li className="inline-flex items-center text-gray-500 ml-2">
                            Reporting
                        </li>
                        <li>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li className="inline-flex items-center text-gray-700 font-semibold ml-2">
                            List
                        </li>
                    </ol>
                </nav>
            }
        >
            <Head title="Reporting - List" />
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Filter Card */}
                <form
                    onSubmit={e => {
                        if (dateTo && dateFrom && dateTo < dateFrom) {
                            e.preventDefault();
                            alert('Tanggal hingga tidak boleh kurang dari tanggal dari.');
                        }
                    }}
                    className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row items-center gap-4 mb-8"
                >
                    <div>
                        <label className="block text-gray-700 mb-1">Status Transaksi</label>
                        <select
                            className="border rounded px-3 py-2"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="">Semua</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="cancel">Cancel</option>
                            <option value="expire">Expire</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Tanggal Dari</label>
                        <input
                            type="date"
                            className="border rounded px-3 py-2"
                            value={dateFrom}
                            onChange={e => setDateFrom(e.target.value)}
                            max={dateTo || undefined}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Tanggal Hingga</label>
                        <input
                            type="date"
                            className="border rounded px-3 py-2"
                            value={dateTo}
                            onChange={e => setDateTo(e.target.value)}
                            min={dateFrom || undefined}
                        />
                    </div>
                    <div className="flex-1 flex items-end justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
                        >
                            Terapkan
                        </button>
                    </div>
                </form>

                {/* Export Button */}
                <div className="flex justify-end mb-2">
                    <button
                        onClick={handleExport}
                        className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
                    >
                        Export ke Excel
                    </button>
                </div>

                {/* Table Preview */}
                <div className="bg-white rounded-lg shadow overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">No</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Invoice</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center py-6 text-gray-400">Tidak ada data</td>
                                </tr>
                            )}
                            {orders.map((order, idx) => (
                                <tr key={order.id}>
                                    <td className="px-4 py-2">{idx + 1}</td>
                                    <td className="px-4 py-2">{order.created_at}</td>
                                    <td className="px-4 py-2">{order.invoice_code}</td>
                                    <td className="px-4 py-2">{order.customer_name}</td>
                                    <td className="px-4 py-2 capitalize">{order.status}</td>
                                    <td className="px-4 py-2">Rp {order.total?.toLocaleString('id-ID')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
