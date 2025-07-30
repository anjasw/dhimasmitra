import { Head, usePage } from "@inertiajs/react";
import { useState, useEffect, useRef } from "react";
import { Link } from "@inertiajs/react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MarketplaceSection from "./Components/MarketplaceSection";
import Breadcrumb from "./Components/Breadcrumb";

function excerpt(html, wordCount = 20) {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, "");
    return text.split(/\s+/).slice(0, wordCount).join(" ") + (text.split(/\s+/).length > wordCount ? "..." : "");
}

export default function ListArtikel() {
    const {
        articles = [],
        breadcrumb = [],
    } = usePage().props;

    const [visibleCount, setVisibleCount] = useState(12);
    const [loading, setLoading] = useState(false);
    const loader = useRef(null);

    // Artikel sudah difilter di backend hanya yang Published
    const visibleArticles = articles.slice(0, visibleCount);

    useEffect(() => {
        if (!loader.current) return;
        const handleObserver = (entries) => {
            const target = entries[0];
            if (target.isIntersecting && !loading && visibleCount < articles.length) {
                setLoading(true);
                setTimeout(() => {
                    setVisibleCount((prev) => prev + 12);
                    setLoading(false);
                }, 700); // simulasi loading
            }
        };
        const option = { root: null, rootMargin: "20px", threshold: 1.0 };
        const observer = new IntersectionObserver(handleObserver, option);
        observer.observe(loader.current);
        return () => observer.disconnect();
    }, [loading, visibleCount, articles.length]);

    return (
        <div className="bg-gray-100">
            <Head title="Artikel" />
            <Navbar />
            {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}

            <div className="max-w-7xl mx-auto px-4 py-10">
                {/* Grid Artikel */}
                {visibleArticles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {visibleArticles.map((article) => (
                            <Link
                                href={route("artikel.show", article.slug)}
                                key={article.id}
                            >
                                <div className="bg-white shadow overflow-hidden cursor-pointer flex flex-col h-full min-h-[320px]">
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
                                    <div className="p-4 space-y-2 flex-1 flex flex-col">
                                        <h3 className="text-sm font-bold leading-tight line-clamp-1">
                                            {article.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 line-clamp-3 flex-1">
                                            {excerpt(article.content, 20)}
                                        </p>
                                        <p className="text-xs text-[#A34716] font-semibold">
                                            {article.date}
                                        </p>
                                        {Array.isArray(article.tags) && article.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {article.tags.map((tag, idx) => (
                                                    <span key={idx} className="text-[10px] text-gray-500 italic">
                                                        #{String(tag).trim()}
                                                    </span>
                                                ))}
                                            </div>
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

                {/* Infinite scroll loader */}
                {visibleCount < articles.length && (
                    <div className="text-center mt-8" ref={loader}>
                        {loading && (
                            <div className="flex justify-center items-center">
                                <span className="inline-block w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></span>
                                <span className="ml-3 text-yellow-600 font-semibold"></span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <MarketplaceSection />
            <Footer />
        </div>
    );
}
