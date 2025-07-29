import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Link } from "@inertiajs/react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MarketplaceSection from "./Components/MarketplaceSection";
import Breadcrumb from "./Components/Breadcrumb";

export default function ListArtikel() {
    const {
        articles = [],
        categories = [],
        selectedCategory = null,
        breadcrumb = [],
    } = usePage().props;

    const [visibleCount, setVisibleCount] = useState(12);

    // Filter hanya artikel dengan status Published
    const publishedArticles = articles.filter(
        (article) => article.status === "Published"
    );

    const visibleArticles = publishedArticles.slice(0, visibleCount);

    const loadMore = () => setVisibleCount((prev) => prev + 12);

    return (
        <div className="bg-gray-100">
            <Head title="Artikel" />
            <Navbar />
            {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}

            <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
                {/* Sidebar Kategori */}
                <aside className="bg-white p-4 shadow-sm w-full lg:w-1/5 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
                    <h3 className="font-semibold text-gray-700 mb-3">
                        Kategori Artikel
                    </h3>
                    <ul className="flex lg:block overflow-x-auto lg:overflow-visible gap-2 lg:gap-0 whitespace-nowrap pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                        {categories.map((category) => (
                            <li key={category.id} className="flex-shrink-0">
                                <Link
                                    href={route("artikel.index", {
                                        kategori: category.slug,
                                    })}
                                    className={`block px-3 py-1 border border-gray-200 rounded-full lg:rounded-none lg:border-0 ${
                                        selectedCategory === category.slug
                                            ? "bg-yellow-400 text-black font-semibold"
                                            : "hover:bg-gray-100"
                                    }`}
                                >
                                    {category.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Grid Artikel */}
                <main className="lg:w-4/5">
                    {visibleArticles.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                            {visibleArticles.map((article) => (
                                <Link
                                    href={route("artikel.show", article.slug)}
                                    key={article.id}
                                >
                                    <div className="bg-white shadow overflow-hidden cursor-pointer">
                                        <div className="relative">
                                            <img
                                                src={article.thumbnail_url}
                                                alt={article.title}
                                                className="w-full h-32 object-cover"
                                            />
                                            <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 font-bold">
                                                ARTIKEL
                                            </span>
                                        </div>
                                        <div className="p-4 space-y-2">
                                            <h3 className="text-sm font-bold leading-tight line-clamp-1">
                                                {article.title}
                                            </h3>
                                            <p className="text-xs text-gray-600 line-clamp-3">
                                                {article.meta_description}
                                            </p>
                                            <p className="text-xs text-[#A34716] font-semibold">
                                                {article.date}
                                            </p>
                                            {article.tags && (
                                                <p className="text-[10px] text-gray-500 italic">
                                                    Tags:{" "}
                                                    {Array.isArray(article.tags)
                                                        ? article.tags.join(
                                                              ", "
                                                          )
                                                        : article.tags}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-gray-500 py-20">
                            <p className="text-lg font-semibold">
                                Artikel tidak ditemukan
                            </p>
                        </div>
                    )}

                    {visibleCount < publishedArticles.length && (
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
