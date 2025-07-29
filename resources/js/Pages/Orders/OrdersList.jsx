import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function OrdersList({ orders }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleShowDetail = async (order) => {
        // Fetch detail dari backend
        const res = await fetch(route('orders.detail', order.id));
        const data = await res.json();
        setSelectedOrder(data);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
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
                            {orders.data.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="text-center py-6 text-gray-400">
                                        Belum ada orderan masuk.
                                    </td>
                                </tr>
                            )}
                            {orders.data.map((order, idx) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-3 py-2">
                                        {(orders.current_page - 1) * orders.per_page + idx + 1}
                                    </td>
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
                                        <button
                                            type="button"
                                            onClick={() => handleShowDetail(order)}
                                            className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
                                        >
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-end mt-4 gap-1">
                    {orders.links && orders.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            preserveScroll
                            className={`px-3 py-1 rounded border text-sm
                                ${link.active ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-blue-50'}
                                ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            disabled={!link.url}
                        />
                    ))}
                </div>
            </div>

            {/* Modal Detail */}
            {showModal && selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4">Detail Order</h2>
                        <div className="mb-2"><b>Nama Pemesan:</b> {selectedOrder.customer_name}</div>
                        <div className="mb-2"><b>Status:</b> {selectedOrder.status}</div>
                        <div className="mb-2"><b>Tanggal:</b> {selectedOrder.created_at}</div>
                        <div className="mb-2"><b>Total:</b> Rp {selectedOrder.total?.toLocaleString()}</div>
                        <div className="mb-2"><b>Produk:</b></div>
                        <div>
                            {selectedOrder.items && selectedOrder.items.length > 0 ? (
                                <table className="min-w-full text-sm border">
                                    <thead>
                                        <tr>
                                            <th className="px-2 py-1 border">Nama Produk</th>
                                            <th className="px-2 py-1 border">Jumlah</th>
                                            <th className="px-2 py-1 border">Harga</th>
                                            <th className="px-2 py-1 border">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedOrder.items.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-2 py-1 border">{item.product_name}</td>
                                                <td className="px-2 py-1 border">{item.qty}</td>
                                                <td className="px-2 py-1 border">Rp {item.price?.toLocaleString()}</td>
                                                <td className="px-2 py-1 border">Rp {(item.qty * item.price)?.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-gray-500">Tidak ada item.</div>
                            )}
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={handleCloseModal}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
