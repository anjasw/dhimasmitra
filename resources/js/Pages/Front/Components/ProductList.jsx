// resources/js/Components/ProductList.jsx
import React from "react";
import { Link } from "@inertiajs/react";

const products = Array(8).fill({
    name: "Plain Pattern Lagging",
    price: "Rp 100.000,00",
    image: "/assets/dummy-image.jpg",
});

export default function ProductList() {
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
                            <div
                                key={index}
                                className="bg-white p-4 shadow hover:shadow-md transition"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full object-contain mb-2"
                                />
                                <h3 className="text-sm font-medium">
                                    {product.name}
                                </h3>
                                <p className="text-[#A34716] font-semibold text-sm">
                                    {product.price}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Tombol */}
                    <div className="text-center mt-8">
                        <Link href="/produk">
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
