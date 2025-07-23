import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function OrdersList({orders}) {
    // Ambil data orders dari props inertia
    // const { orders = [] } = usePage().props;

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
                            Pages
                        </li>
                        <li>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li className="inline-flex items-center text-gray-700 font-semibold ml-2">
                            Orders
                        </li>
                    </ol>
                </nav>
            }
        >
            <Head title="Pages - Orders" />
            <div className="bg-white rounded shadow p-4 mt-4">
                <h1 className="text-xl font-bold mb-4">Daftar Orderan Masuk</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">#</th>
                                <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Nama Pemesan</th>
                                <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Produk</th>
                                <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Jumlah</th>
                                <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Total</th>
                                <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Tanggal</th>
                                <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="text-center py-6 text-gray-400">
                                        Belum ada orderan masuk.
                                    </td>
                                </tr>
                            )}
                            {orders.map((order, idx) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2">{idx + 1}</td>
                                    <td className="px-3 py-2">{order.customer_name}</td>
                                    <td className="px-3 py-2">{order.product_name}</td>
                                    <td className="px-3 py-2">{order.qty}</td>
                                    <td className="px-3 py-2">Rp {order.total?.toLocaleString()}</td>
                                    <td className="px-3 py-2">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                            order.status === 'pending'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : order.status === 'paid'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-2">{order.created_at}</td>
                                    <td className="px-3 py-2">
                                        <Link
                                            href={route('orders', order.id)}
                                            className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                                        >
                                            Detail
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
