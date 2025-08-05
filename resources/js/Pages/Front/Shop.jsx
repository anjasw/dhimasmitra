import { Head, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
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
    const [loadingMore, setLoadingMore] = useState(false);

    // Ref untuk infinite scroll
    const loaderRef = useRef(null);

    // Infinite scroll effect
    useEffect(() => {
        if (loadingMore) return;
        if (visibleCount >= products.length) return;

        const handleScroll = () => {
            if (!loaderRef.current) return;
            const rect = loaderRef.current.getBoundingClientRect();
            if (rect.top <= window.innerHeight) {
                setLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount((prev) => prev + 12);
                    setLoadingMore(false);
                }, 800); // simulasi loading
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loadingMore, visibleCount, products.length]);

    // State untuk mobile sidebar
    const [showSidebar, setShowSidebar] = useState(false);

    // Disable scroll saat sidebar filter dibuka di mobile
    useEffect(() => {
        if (showSidebar) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [showSidebar]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Head title="Shop" />
            <Navbar />
            {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}

            <div className="max-w-7xl mx-auto px-2 md:px-4 py-6 md:py-10 flex flex-col md:flex-row gap-4 md:gap-8">
                {/* Tombol filter untuk mobile */}
                <button
                    className="md:hidden mb-4 bg-yellow-400 text-black font-semibold px-4 py-2 rounded shadow w-full"
                    onClick={() => setShowSidebar(true)}
                >
                    Filter Kategori
                </button>

                {/* Sidebar Filter Kategori */}
                <aside
                    className={`
                        fixed inset-0 z-40 bg-black bg-opacity-30 transition md:static md:bg-transparent md:w-1/5 md:p-0 md:shadow-sm md:sticky md:top-20 md:h-screen
                        ${showSidebar ? "block" : "hidden"} md:block
                    `}
                    // style={{ direction: "ltr" }}
                    onClick={() => setShowSidebar(false)}
                >
                    <div
                        className={`
                            bg-white h-full p-4 shadow-lg direction-ltr
                            w-4/5 max-w-xs
                            fixed left-0 bottom-0 z-50 transition-transform duration-300
                            ${showSidebar ? "top-16 translate-x-0" : "top-0 -translate-x-full"}
                            md:static md:w-full md:max-w-none md:shadow-none md:bg-white md:translate-x-0
                        `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Tombol close di mobile */}
                        <div className="flex justify-between items-center mb-3 md:hidden">
                            <h3 className="font-semibold text-gray-700">Filter Kategori</h3>
                            <button
                                className="text-gray-700 text-2xl"
                                onClick={() => setShowSidebar(false)}
                                aria-label="Tutup Filter"
                            >
                                ×
                            </button>
                        </div>
                        <h3 className="font-semibold text-gray-700 mb-3 hidden md:block">
                            Filter
                        </h3>
                        {/* Daftar kategori scrollable ke bawah di mobile */}
                        <ul className="space-y-2 text-sm overflow-y-auto" style={{ maxHeight: "60vh" }}>
                            {categories.map((category, idx) => (
                                <li key={category.id}>
                                    <Link
                                        href={route("shop.index", {
                                            kategori: category.slug,
                                        })}
                                        className={`block px-2 py-1 rounded ${
                                            selectedCategory === category.slug ||
                                            (selectedCategory === null && idx === 0)
                                                ? "bg-yellow-400 text-black font-semibold"
                                                : "hover:bg-gray-100"
                                        }`}
                                        onClick={() => setShowSidebar(false)}
                                    >
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Produk Grid */}
                <main className="w-full md:w-4/5">
                    {visibleProducts.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                            {visibleProducts.map((product) => (
                                <Link href={product.href} key={product.id}>
                                    <div className="bg-white p-2 sm:p-3 md:p-4 shadow hover:shadow-md transition cursor-pointer rounded">
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="w-full h-32 sm:h-36 md:h-40 object-contain mb-2"
                                        />
                                        <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 min-h-[2.5em]">
                                            {product.name}
                                        </h3>
                                        <p className="text-[#A34716] font-semibold text-xs sm:text-sm">
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

                    {/* Infinite scroll loader */}
                    {visibleCount < products.length && (
                        <div ref={loaderRef} className="text-center mt-8">
                             <div className="flex justify-center items-center">
                                <span className="inline-block w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
                                <span className="ml-3 text-yellow-600 font-semibold"></span>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            <MarketplaceSection />
            <Footer />
        </div>
    );
}
