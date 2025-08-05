    import { Head, usePage, router } from "@inertiajs/react";
    import { useState, useRef } from "react";

    import Navbar from "./Components/Navbar";
    import Footer from "./Components/Footer";
    import Breadcrumb from "./Components/Breadcrumb";

    export default function ProductDetail() {
        const { product, isLoggedIn } = usePage().props;
        const [mainImage, setMainImage] = useState(product.image_url);
        const [qty, setQty] = useState(1);

        const galleryImages =
            product.gallery?.length > 0 ? product.gallery : [product.image_url];

        const subtotal = product.price * qty;

        const increment = () => {
            if (qty < product.stock) setQty(qty + 1);
        };

        const decrement = () => {
            if (qty > 1) setQty(qty - 1);
        };

        const thumbnailRef = useRef(null);

        const scrollThumbnails = (direction) => {
            const container = thumbnailRef.current;
            if (container) {
                const scrollAmount = 100;
                container.scrollBy({
                    left: direction === "left" ? -scrollAmount : scrollAmount,
                    behavior: "smooth",
                });
            }
        };

        const breadcrumb = [
            { label: "Home", href: "/" },
            { label: "Shop", href: route("shop.index") },
            { label: product.name, href: "#" },
        ];

        const today = new Date();
        const estimasiDate = new Date(today);
        estimasiDate.setDate(today.getDate() + 3);

        const bulan = [
            "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
            "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
        ];
        const estimasiTiba = `${estimasiDate.getDate()} ${bulan[estimasiDate.getMonth()]}`;

        const handleAddToCart = async () => {
            if (!isLoggedIn) {
                window.location.href = '/login';
                return;
            }
            try {
                const response = await fetch('/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                    body: JSON.stringify({
                        product_id: product.id,
                        quantity: qty,
                    }),
                });
                const result = await response.json();
                if (result.success) {
                    alert('Produk berhasil ditambahkan ke keranjang!');
                    router.visit(route('cart.index'));
                } else {
                    alert(result.error || 'Gagal menambah ke keranjang.');
                }
            } catch (error) {
                alert('Gagal menambah ke keranjang.');
            }
        };

        const handleBuyNow = async () => {
            if (!isLoggedIn) {
                window.location.href = '/login';
                return;
            }
            try {
                // Tambah ke cart dulu
                const addResponse = await fetch('/cart/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                    body: JSON.stringify({
                        product_id: product.id,
                        quantity: qty,
                    }),
                });
                const addResult = await addResponse.json();
                if (addResult.success && addResult.cart_id) {
                    // Checkout langsung menggunakan cart_id dari response
                    const csrf = document.querySelector('meta[name="csrf-token"]');
                    const csrfToken = csrf ? csrf.getAttribute('content') : '';
                    const checkoutResponse = await fetch('/cart/checkout', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': csrfToken },
                        body: JSON.stringify({
                            items: [{
                                id: addResult.cart_id, // gunakan cart_id di sini
                                qty: qty
                            }]
                        }),
                    });
                    const result = await checkoutResponse.json();
                    // Redirect ke /order?id=ORDER_ID
                    if (result.success && result.transaction_id) {
                        router.visit(`/order?id=${result.transaction_id}`, {
                            method: 'get',
                            preserveScroll: true,
                            preserveState: true,
                        });
                    }
                } else {
                    alert(addResult.error || 'Gagal menambah ke keranjang.');
                }
            } catch (error) {
                alert('Gagal proses beli langsung.');
                console.log(error)
            }
        };

        return (
            <div className="bg-gray-100 min-h-screen">
                <Head title={product.name} />
                <Navbar />
                {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}

                <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Kiri: Gambar & galeri */}
                    <div className="md:col-span-3 md:sticky md:top-24 self-start">
                        <div className="bg-white shadow p-4">
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-full object-contain"
                            />
                        </div>
                        <div className="relative mt-4">
                            <button
                                onClick={() => scrollThumbnails("left")}
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow w-8 h-8 flex items-center justify-center rounded-full"
                            >
                                <span className="material-symbols-rounded text-lg">
                                    chevron_left
                                </span>
                            </button>

                            {/* Thumbnail Scroll Container */}
                            <div
                                ref={thumbnailRef}
                                className="flex gap-2 overflow-x-auto px-8 scrollbar-hide"
                            >
                                {galleryImages.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setMainImage(img)}
                                        className={`w-20 h-20 border shadow-sm flex-shrink-0 p-1 ${
                                            mainImage === img
                                                ? "border-yellow-400"
                                                : "border-transparent"
                                        }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Galeri ${index + 1}`}
                                            className="w-full h-full object-contain"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Tombol Kanan */}
                            <button
                                onClick={() => scrollThumbnails("right")}
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow w-8 h-8 flex items-center justify-center rounded-full"
                            >
                                <span className="material-symbols-rounded text-lg">
                                    chevron_right
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Tengah: Informasi & Deskripsi */}
                    <div className="md:col-span-6 space-y-6">
                        <div className="bg-white shadow p-4 space-y-3">
                            <h1 className="text-xl font-semibold">
                                {product.name}
                            </h1>
                            <p className="text-[#A34716] text-2xl font-bold">
                                Rp{product.price.toLocaleString()}
                            </p>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>
                                    Kondisi: <strong>Baru</strong>
                                </p>
                                <p>
                                    Stok tersedia:{" "}
                                    <strong>{product.stock ?? 14}</strong>
                                </p>
                                <p>Min. Pemesanan: {product.minimum_order ?? 1} pcs</p>
                                {/* Tampilkan warna jika ada */}
                                {product.colors && product.colors.length > 0 && (
                                    <p>
                                        Warna:{" "}
                                        {product.colors.map((color, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-block bg-gray-100 px-2 py-1 rounded mr-1"
                                            >
                                                {typeof color === 'object' && color !== null ? color.name : color}
                                            </span>
                                        ))}
                                    </p>
                                )}
                                {/* Tampilkan size jika ada */}
                                {product.sizes && product.sizes.length > 0 && (
                                    <p>
                                        Ukuran:{" "}
                                        {product.sizes.map((size, idx) => (
                                            <span
                                                key={idx}
                                                className="inline-block bg-gray-100 px-2 py-1 rounded mr-1"
                                            >
                                                {typeof size === 'object' && size !== null ? size.name : size}
                                            </span>
                                        ))}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="bg-white shadow p-4">
                            <h3 className="text-lg font-bold mb-2">
                                Deskripsi Produk
                            </h3>
                            <div
                                className="text-sm text-gray-700 leading-relaxed whitespace-pre-line"
                                dangerouslySetInnerHTML={{ __html: product.description ?? "Deskripsi produk akan ditampilkan di sini." }}
                            />
                        </div>

                        {/* Pengiriman */}
                        <div className="mt-6 bg-white shadow p-4 space-y-2">
                            <h3 className="text-lg font-bold mb-2">Pengiriman</h3>

                            <div className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="material-symbols-rounded text-xl text-yellow-500 mt-0.5">
                                    location_on
                                </span>
                                <p>
                                    Dikirim dari{" "}
                                    <strong>Kota Administrasi Jakarta Pusat</strong>
                                </p>
                            </div>

                            <div className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="material-symbols-rounded text-xl text-yellow-500 mt-0.5">
                                    local_shipping
                                </span>
                                <div>
                                    <p>
                                        <strong>Ongkir Free</strong>
                                    </p>
                                    <p className="text-gray-500">
                                        Gratis • Estimasi tiba {estimasiTiba}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kanan: Aksi */}
                    <div className="md:col-span-3 bg-white shadow p-6 space-y-4 md:sticky md:top-24 self-start">
                        <h3 className="font-semibold">Atur jumlah pembelian</h3>

                        {/* Qty */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border px-3 py-1">
                                <button
                                    onClick={decrement}
                                    className="text-2xl font-bold text-[#A34716] px-2"
                                >
                                    −
                                </button>
                                <span className="mx-2 text-lg">{qty}</span>
                                <button
                                    onClick={increment}
                                    className="text-2xl font-bold text-[#A34716] px-2"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-sm text-gray-600">
                                Stok Total: <strong>{product.stock ?? 14}</strong>
                            </span>
                        </div>

                        {/* Tombol */}
                        <div className="flex flex-col items-center gap-2 pt-2">
                            <button
                                className="bg-[#FCD34D] hover:bg-yellow-300 text-black font-semibold px-4 py-2 w-full transition"
                                onClick={handleAddToCart}
                            >
                                + Keranjang
                            </button>
                            <button 
                                className="border border-[#FCD34D] text-[#A34716] hover:bg-yellow-50 font-semibold px-4 py-2 w-full transition"
                                onClick={handleBuyNow}
                            >
                                Beli Langsung
                            </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-sm text-gray-600 pt-4 border-t">
                            Subtotal:{" "}
                            <span className="text-[#A34716] font-semibold text-lg">
                                Rp{subtotal.toLocaleString()}
                            </span>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
