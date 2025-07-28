import { Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";

export default function Order({ transaction }) {
    const [snapToken, setSnapToken] = useState(null);


    // useEffect(() => {
        
        
    // }, []);
    useEffect(() => {
        console.log(import.meta.env.VITE_MIDTRANS_CLIENT_KEY)
        if (!window.snap) {
            const script = document.createElement('script');
            script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
            script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY || 'YOUR_CLIENT_KEY');
            script.async = true;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
        if (snapToken && window.snap) {
            window.snap.pay(snapToken, {
                onSuccess: async function(result){
                    if(result.status_code === '200') {
                        const csrf = document.querySelector('meta[name="csrf-token"]');
                        const csrfToken = csrf ? csrf.getAttribute('content') : '';
                        const update = await fetch('/account/order/success', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                            body: JSON.stringify({ order_id: result.order_id, transaction_id: result.transaction_id, transaction_status: result.transaction_status }),
                        });
                        console.log(result, 'res success');
                        console.log(update, 'update order success');
                    }
                },
                onPending: function(result){
                    console.log(result,'res pending')
                    return
                },
                onError: function(result){
                    console.log(result, 'res error')
                    return
                },
                onClose: function(){
                    return
                }
            });
        }
    }, [snapToken]);

    const [showModal, setShowModal] = useState(false);

    const [alamat, setAlamat] = useState({
        label: "Rumah - Aprea",
        detail: "Perumahan Tamansari Riverside Blok E2 No.24, Tamansari, Kab. Bogor, Jawa Barat",
        phone: "62877770211186",
    });

    const [tempAlamat, setTempAlamat] = useState(alamat);

    const openModal = () => {
        setTempAlamat(alamat); // reset temp data
        setShowModal(true);
    };

    const saveAlamat = () => {
        setAlamat(tempAlamat);
        setShowModal(false);
    };

    // Ambil produk dari transaction.items
    const products = transaction?.items?.map(item => ({
        id: item.product_id,
        name: item.product?.name,
        price: item.price,
        image: item.product?.images?.[0]?.image
            ? '/storage/' + item.product.images[0].image
            : '/assets/dummy-image.jpg',
        // shipping: item.shipping ?? 0,
        // insurance: item.insurance ?? 0,
        qty: item.quantity,
    })) || [];

    // const total = products.reduce(
    //     (sum, p) => sum + (p.price * (p.qty || 1)) + (p.shipping || 0) + (p.insurance || 0),
    //     0
    // );

    const total = products.reduce(
        (sum, p) => sum + (p.price * (p.qty || 1)),
        0
    );
    // const totalShipping = products.reduce((sum, p) => sum + (p.shipping || 0), 0);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Head title="Checkout" />

            <nav className="bg-white shadow py-3">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <a href="/" className="block">
                        <img
                            src="logo-dhimasgroup.png"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                    </a>
                    <h1 className="text-xl font-bold">Checkout</h1>
                </div>
            </nav>

            <div className="container mx-auto px-4 py-6 min-h-[calc(100vh-64px)]">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Kiri - Informasi Produk */}
                    <div className="md:w-2/3 space-y-4">
                        {/* Alamat Pengiriman */}
                        <div className="bg-white p-4 shadow">
                            <h2 className="font-semibold text-sm mb-2 text-gray-500">
                                ALAMAT PENGIRIMAN
                            </h2>
                            <p className="font-medium">
                                <span className="text-yellow-600 font-semibold">
                                    {alamat.label}
                                </span>
                                <br />
                                {alamat.detail} <br />
                                {alamat.phone}
                            </p>
                            <button
                                onClick={openModal}
                                className="bg-yellow-400 px-4 py-2 text-black text-sm mt-2 hover:bg-yellow-300 transition"
                            >
                                Ganti
                            </button>
                        </div>

                        {/* Produk */}
                        <div className="bg-white p-4 shadow">
                            <h2 className="font-semibold text-sm mb-3 text-gray-500">
                                DAFTAR PRODUK
                            </h2>

                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex gap-4 border-b pb-4 mb-4 last:border-b-0 last:mb-0"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">
                                            {product.name}
                                        </p>
                                        <p className="text-sm mt-1">
                                            {product.qty} x Rp
                                            {product.price.toLocaleString()}
                                        </p>

                                        {/* <div className="mt-3 text-sm space-y-2">
                                            <div>
                                                <label className="block font-medium">
                                                    Reguler
                                                </label>
                                                <p className="text-gray-600">
                                                    J&T (Rp
                                                    {product.shipping.toLocaleString()}
                                                    ) — Estimasi tiba besok - 18
                                                    Jul
                                                </p>
                                                <label className="flex items-center gap-2 mt-3 text-sm">
                                                    <input type="checkbox" />
                                                    Pakai Asuransi Pengiriman
                                                    (Rp
                                                    {product.insurance.toLocaleString()}
                                                    )
                                                </label>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            ))}

                            {/* Catatan umum */}
                            <div className="mt-4">
                                <label className="block text-sm font-medium mb-1">
                                    Kasih Catatan
                                </label>
                                <textarea
                                    className="w-full border p-2 text-sm"
                                    rows={1}
                                    maxLength={200}
                                    placeholder="Opsional"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Kanan - Ringkasan & Pembayaran */}
                    <div className="md:w-1/3 space-y-4">
                        <div className="bg-white p-4 shadow">
                            <h2 className="font-semibold text-sm mb-4">
                                Metode Pembayaran
                            </h2>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-blue-600">credit_card</span>
                                    <span>BCA Virtual Account</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-orange-600">store</span>
                                    <span>Alfamart / Alfamidi / Lawson / D+D</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-yellow-600">credit_card</span>
                                    <span>Mandiri Virtual Account</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-green-600">payments</span>
                                    <span>GoPay / GoPay Later</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-purple-600">qr_code_2</span>
                                    <span>QRIS</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-gray-500">more_horiz</span>
                                    <span>Lainnya</span>
                                </li>
                                {/* Tambahkan channel lain sesuai yang aktif di Midtrans */}
                            </ul>
                            <button className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-700 text-xs px-3 py-2 w-full">
                                Pakai promo biar makin hemat!
                            </button>
                        </div>

                        <div className="bg-white p-4 shadow">
                            <h2 className="font-semibold text-sm mb-4">
                                Cek ringkasan transaksimu, yuk
                            </h2>
                            <div className="text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span>
                                        Total Harga ({products.length} Barang)
                                    </span>
                                    <span>Rp{total.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span>Biaya Kirim</span>
                                    <span className="font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                                        FREE
                                    </span>
                                </div>

                                <div className="flex justify-between font-semibold border-t pt-2">
                                    <span>Total Tagihan</span>
                                    <span>Rp{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button
                                className="mt-4 w-full bg-yellow-400 text-black font-bold py-2 hover:bg-yellow-300"
                                onClick={async () => {
                                    const csrf = document.querySelector('meta[name="csrf-token"]');
                                    const csrfToken = csrf ? csrf.getAttribute('content') : '';
                                    const response = await fetch('/snap/token', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'X-CSRF-TOKEN': csrfToken
                                        },
                                        body: JSON.stringify({ transaction_id: transaction.id }),
                                    });

                                    if (response.status === 419) {
                                        // alert('Sesi Anda telah berakhir. Halaman akan direfresh.');
                                        window.location.reload();
                                        return;
                                    }

                                    const data = await response.json();
                                    if (data.snap_token) {
                                        setSnapToken(data.snap_token); // trigger useEffect
                                    } else {
                                        alert('Gagal mendapatkan token pembayaran.');
                                    }
                                }}
                            >
                                Bayar Sekarang
                            </button>

                            <p className="text-xs text-center text-gray-400 mt-2">
                                Dengan melanjutkan pembayaran, kamu menyetujui
                                S&K Asuransi Pengiriman & Proteksi.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#1e1e1e] text-white">
                <div className="container mx-auto px-4 py-2">
                    <span className="flex justify-center text-sm">
                        © 2025, PT. Dhimas Group. All Rights Reserved.
                    </span>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white shadow-lg w-full max-w-md p-6 relative">
                        <h2 className="text-lg font-semibold mb-4">
                            Ubah Alamat
                        </h2>

                        <label className="block text-sm font-medium mb-2">
                            Label Alamat
                        </label>
                        <input
                            type="text"
                            value={tempAlamat.label}
                            onChange={(e) =>
                                setTempAlamat({
                                    ...tempAlamat,
                                    label: e.target.value,
                                })
                            }
                            className="w-full border p-2 mb-3"
                        />

                        <label className="block text-sm font-medium mb-2">
                            Alamat Lengkap
                        </label>
                        <textarea
                            value={tempAlamat.detail}
                            onChange={(e) =>
                                setTempAlamat({
                                    ...tempAlamat,
                                    detail: e.target.value,
                                })
                            }
                            rows={3}
                            className="w-full border p-2 mb-3"
                        />

                        <label className="block text-sm font-medium mb-2">
                            Nomor HP Penerima
                        </label>
                        <input
                            type="text"
                            value={tempAlamat.phone}
                            onChange={(e) =>
                                setTempAlamat({
                                    ...tempAlamat,
                                    phone: e.target.value,
                                })
                            }
                            className="w-full border p-2 mb-4"
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                Batal
                            </button>
                            <button
                                onClick={saveAlamat}
                                className="bg-yellow-400 text-black px-4 py-2 hover:bg-yellow-300"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
        </div>
    );
}