import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Link } from "@inertiajs/react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MarketplaceSection from "./Components/MarketplaceSection";
import Breadcrumb from "./Components/Breadcrumb";

export default function Shop() {
    const {
        products = [],
        categories = [],
        selectedCategory = null,
        breadcrumb = [],
    } = usePage().props;

    const [visibleCount, setVisibleCount] = useState(12);
    const visibleProducts = products.slice(0, visibleCount);

    const loadMore = () => setVisibleCount((prev) => prev + 12);

    return (
        <div className="bg-gray-100">
            <Head title="Shop" />
            <Navbar />
            {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}

            <div className="max-w-7xl mx-auto px-4 py-10 flex gap-8">
                {/* Sidebar Filter Kategori */}
                <aside className="w-1/5 bg-white p-4 shadow-sm sticky top-0 h-screen overflow-y-auto direction-rtl scrollbar-left">
                    <div className="direction-ltr">
                        <h3 className="font-semibold text-gray-700 mb-3">Filter</h3>
                        <ul className="space-y-2 text-sm">
                            {categories.map((category, idx) => (
                                <li key={category.id}>
                                    <Link
                                        href={route("shop.index", {
                                            kategori: category.slug,
                                        })}
                                        className={`block px-2 py-1 ${
                                            selectedCategory === category.slug || (selectedCategory === null && idx === 0)
                                                ? "bg-yellow-400 text-black font-semibold"
                                                : "hover:bg-gray-100"
                                        }`}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Produk Grid */}
                <main className="w-4/5">
                    {visibleProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {visibleProducts.map((product) => (
                                <Link href={product.href} key={product.id}>
                                    <div className="bg-white p-4 shadow hover:shadow-md transition cursor-pointer">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full object-contain mb-2"
                                        />
                                        <h3 className="text-sm font-medium text-gray-800">
                                            {product.name}
                                        </h3>
                                        <p className="text-[#A34716] font-semibold text-sm">
                                            Rp{product.price.toLocaleString()}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-20">
                            <p className="text-lg font-semibold">Produk tidak ditemukan</p>
                        </div>
                    )}

                    {/* Tombol Load More */}
                    {visibleCount < products.length && (
                        <div className="text-center mt-8">
                            <button
                                onClick={loadMore}
                                className="bg-yellow-400 text-black font-semibold px-6 py-2 shadow hover:bg-yellow-300 transition"
                            >
                                Tampilkan Lebih Banyak
                            </button>
                        </div>
                    )}
                </main>
            </div>

            <MarketplaceSection />
            <Footer />
        </div>
    );
}