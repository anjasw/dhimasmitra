import { Head, router } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useState } from "react";

export default function Cart({ categories, carts, isLoggedIn, role }) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [cartItems, setCartItems] = useState(
        carts.map((cart) => ({
            id: cart.id,
            name: cart.product.name,
            qty: cart.quantity,
            price: cart.product.fix_price,
            href: '/' + cart.product.slug,
            image: cart.product.images[0] ? '/storage/' + cart.product.images[0].image : "/assets/dummy-image.jpg",
        }))
    );
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const total = cartItems
        .filter(item => selectedIds.includes(item.id))
        .reduce((acc, item) => acc + item.price * item.qty, 0);

    const allChecked = cartItems.length > 0 && selectedIds.length === cartItems.length;

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedIds(cartItems.map(item => item.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectItem = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((itemId) => itemId !== id)
                : [...prev, id]
        );
    };

    const handleUpdateQty = async (id, newQty) => {
        if (newQty < 1) return;
        // Update state lokal
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, qty: newQty } : item
            )
        );
        // Kirim update ke backend
        const csrf = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrf ? csrf.getAttribute('content') : '';
        await fetch('/cart/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
            body: JSON.stringify({ id, quantity: newQty }),
        });
        // router.post('/cart/update', { id, quantity: newQty }, { preserveScroll: true });
    };

    const handleDeleteItem = async (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        const csrf = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrf ? csrf.getAttribute('content') : '';
        await fetch('/cart', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
            body: JSON.stringify({ id: deleteId }),
        });
        setCartItems((prev) => prev.filter(item => item.id !== deleteId));
        setSelectedIds((prev) => prev.filter(itemId => itemId !== deleteId));
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteId(null);
    };

    return (
        <div className="bg-gray-100">
            <Head>
                <title>Cart</title>
                <meta name="description" content="Cart page" />
            </Head>

            <Navbar category={categories} carts={carts} isLoggedIn={isLoggedIn} role={role} />

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6 my-4">
                    {/* List Produk */}
                    <div className="flex-1 space-y-4">
                        {/* Pilih Semua */}
                        <div className="bg-white p-4">
                            <label className="flex items-center gap-2 font-semibold">
                                <input
                                    type="checkbox"
                                    checked={allChecked}
                                    onChange={handleSelectAll}
                                />
                                Pilih Semua{" "}
                                <span className="text-gray-400">
                                    ({cartItems.length})
                                </span>
                            </label>
                        </div>

                        {/* Scrollable area untuk mobile jika item banyak */}
                        <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto md:max-h-full">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white p-4 flex gap-3 items-center"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => handleSelectItem(item.id)}
                                    />
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover"
                                    />
                                    <div className="flex-1 flex justify-between items-end">
                                        <div>
                                            <p className="text-sm">
                                                {item.name}
                                            </p>
                                            <p className="text-black font-semibold">
                                                Rp {item.price.toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="flex items-end gap-2">
                                            <button
                                                className="text-gray-400 hover:text-red-500"
                                                onClick={() => handleDeleteItem(item.id)}
                                            >
                                                <span className="material-symbols-outlined">
                                                    delete
                                                </span>
                                            </button>
                                            <div className="border rounded flex items-center px-2 py-1">
                                                <button
                                                    className="text-xl hover:text-red-500"
                                                    onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                                                    disabled={item.qty <= 1}
                                                >
                                                    −
                                                </button>
                                                <span className="mx-2 text-sm">
                                                    {item.qty}
                                                </span>
                                                <button
                                                    className="text-xl hover:text-green-500"
                                                    onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                                                >
                                                    ＋
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Ringkasan belanja - tampil di bawah produk (hanya mobile) */}
                        <div className="md:hidden">
                            <Ringkasan
                                total={total}
                                disabled={selectedIds.length === 0}
                                checkedItems={cartItems.filter(item => selectedIds.includes(item.id))}
                            />
                        </div>
                    </div>

                    {/* Desktop: sticky ringkasan */}
                    <div className="hidden md:block md:w-1/3">
                        <div className="sticky top-24">
                            <Ringkasan
                                total={total}
                                disabled={selectedIds.length === 0}
                                checkedItems={cartItems.filter(item => selectedIds.includes(item.id))}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Modal Konfirmasi Hapus */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
                        <h3 className="text-lg font-semibold mb-2">Hapus Produk?</h3>
                        <p className="mb-4 text-gray-500">Apakah Anda yakin ingin menghapus produk ini dari keranjang?</p>
                        <div className="flex justify-center gap-3">
                            <button
                                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                                onClick={cancelDelete}
                            >
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                                onClick={confirmDelete}
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Ringkasan({ total, disabled, checkedItems }) {
    const handleBeli = async () => {
        // Kirim data checkedItems ke backend
        const csrf = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = csrf ? csrf.getAttribute('content') : '';
        const response = await fetch('/cart/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
            body: JSON.stringify({
                items: checkedItems.map(item => ({
                    id: item.id,
                    qty: item.qty
                }))
            }),
        });
        const result = await response.json();
        // Redirect ke /order?id=ORDER_ID
        if (result.success && result.transaction_id) {
            // window.location.href = `/order?id=${result.transaction_id}`;
            router.visit(`/order?id=${result.transaction_id}`, {
                method: 'get',
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    return (
        <div className="bg-white p-4">
            <h2 className="text-lg font-semibold mb-2">Ringkasan belanja</h2>
            <div className="mb-3 text-sm">
                <span className="font-medium">
                    {checkedItems.length} barang dipilih
                </span>
            </div>
            <ul className="mb-3 text-sm text-gray-700">
                {checkedItems.map(item => (
                    <li key={item.id} className="flex justify-between items-center mb-1">
                        <span className="flex-1">{item.name}</span>
                        <span>{item.qty}x</span>
                        <span className="w-40 text-right">Rp { (item.price * item.qty).toLocaleString() }</span>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between text-sm text-gray-500 border-b pb-3 mb-3">
                <span>Total</span>
                <span className="font-medium text-black">
                    Rp {total.toLocaleString()}
                </span>
            </div>
            <button
                onClick={handleBeli}
                className="bg-yellow-400 text-black font-semibold px-10 py-2 shadow hover:bg-yellow-300 transition w-full"
                disabled={disabled}
            >
                Beli
            </button>
        </div>
    );
}

