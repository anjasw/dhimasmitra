import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MarketplaceSection from "./Components/MarketplaceSection";
import Breadcrumb from "./Components/Breadcrumb";

export default function Kategori() {
    const { props } = usePage();
    const allCategories = props.categories ?? [];
    const breadcrumb = props.breadcrumb ?? [];

    const [search, setSearch] = useState("");
    const [visibleCount, setVisibleCount] = useState(12);

    const filteredCategories = allCategories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase())
    );
    const visibleCategories = filteredCategories.slice(0, visibleCount);

    const loadMore = () => setVisibleCount((prev) => prev + 12);

    return (
        <div className="bg-gray-100">
            <Head title="Kategori" />
            <Navbar />
            {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}

            <div className="py-10 px-4 min-h-screen">
                {/* Heading + Search */}
                <div className="max-w-7xl mx-auto mb-6 px-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
                        <h2 className="text-lg text-gray-700">
                            <strong className="text-black">13.000+</strong>{" "}
                            kategori
                        </h2>
                        <input
                            type="text"
                            placeholder="Cari kategori..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setVisibleCount(12);
                            }}
                            className="w-full md:w-80 px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring focus:ring-yellow-300 text-sm"
                        />
                    </div>
                </div>

                {/* Grid Kategori */}
                <div className="max-w-7xl mx-auto">
                    {visibleCategories.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visibleCategories.map((cat, index) => (
                                <div
                                    key={index}
                                    className="flex overflow-hidden shadow-sm hover:shadow-md transition"
                                >
                                    {/* Kiri: Gambar + Nama Kategori */}
                                    <a
                                        href={cat.href}
                                        className="flex-1 bg-gray-300 flex flex-col items-center justify-center p-4 text-center hover:bg-gray-400 transition"
                                    >
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className="h-20 object-contain mb-2"
                                        />
                                        <div className="text-sm font-semibold text-gray-800">
                                            {cat.name}
                                        </div>
                                    </a>

                                    {/* Kanan: Subkategori Scrollable */}
                                    {cat.subcategories.length > 0 && (
                                        <div className="flex-1 bg-white p-4 overflow-y-auto max-h-[150px]">
                                            <ul className="text-sm text-gray-700 space-y-1">
                                                {cat.subcategories.map(
                                                    (sub, idx) => (
                                                        <li key={idx}>
                                                            <a
                                                                href={sub.href}
                                                                className="hover:text-yellow-600 transition block"
                                                            >
                                                                {sub.name}
                                                            </a>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        // Empty State
                        <div className="text-center text-gray-500 py-20">
                            <p className="text-lg font-semibold">
                                Kategori tidak ditemukan
                            </p>
                            <p className="text-sm mt-1">
                                Coba kata kunci lain.
                            </p>
                        </div>
                    )}
                </div>

                {/* Tombol Load More */}
                {visibleCount < filteredCategories.length && (
                    <div className="text-center mt-8">
                        <button
                            onClick={loadMore}
                            className="px-6 py-2 bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
                        >
                            Tampilkan Lebih Banyak
                        </button>
                    </div>
                )}
            </div>
            <MarketplaceSection />
            <Footer />
        </div>
    );
}
