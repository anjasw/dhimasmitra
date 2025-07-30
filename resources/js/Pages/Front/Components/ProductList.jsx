// resources/js/Components/ProductList.jsx
import React from "react";
import { Link } from "@inertiajs/react";

// Komponen ini sebaiknya menerima props products dari parent (Body/Welcom/Controller)
export default function ProductList({ products = [] }) {
    console.log("ProductList rendered with products:", products);
    return (
        <section className="relative">
            {/* Background overlay */}
            <div
                className="w-full h-[300px] bg-cover bg-center relative"
                style={{
                    backgroundImage: "url('/assets/bg-product.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Card produk - posisi overlap */}
            <div className="relative -mt-40 z-20">
                <div className="container mx-auto px-4 md:px-0 pb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Produk Terbaru
                    </h2>
                </div>
                <div className="bg-[#A55C37] p-4 pb-8 shadow-md max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {products.map((product, index) => (
                            <Link
                                href={route("product.show", product.slug)}
                                key={product.id}
                            >
                                <div className="bg-white p-4 shadow hover:shadow-md transition flex flex-col h-full">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full object-contain mb-2 h-32"
                                    />
                                    <h3 className="text-sm font-medium flex-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-[#A34716] font-semibold text-sm">
                                        Rp{" "}
                                        {Number(product.price).toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Tombol */}
                    <div className="text-center mt-8">
                        <Link href="/shop">
                            <button className="bg-yellow-400 text-black font-semibold px-6 py-2 shadow hover:bg-yellow-300 transition">
                                Tampilkan Semua Produk
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
