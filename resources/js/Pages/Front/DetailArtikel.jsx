import { Head, usePage, Link } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MarketplaceSection from "./Components/MarketplaceSection";

export default function DetailArtikel() {
    const { article, relatedArticles = [] } = usePage().props;

    return (
        <div className="bg-gray-100">
            <Head>
                <title>{article.title}</title>
                {article.meta_description && (
                    <meta name="description" content={article.meta_description} />
                )}
            </Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-10">
                {/* Back Link */}
                <div className="mb-4">
                    <Link
                        href={route("artikel.index")}
                        className="text-sm text-[#A34716] hover:underline"
                    >
                        ← Kembali ke Daftar Artikel
                    </Link>
                </div>

                {/* Main Content + Sidebar */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Artikel Konten */}
                    <div className="w-full lg:w-2/3 bg-white shadow p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {article.title}
                        </h1>
                        <p className="text-sm text-gray-500 mb-6">{article.date}</p>

                        {article.thumbnail_url && (
                            <img
                                src={article.thumbnail_url}
                                alt={article.title}
                                className="w-full h-auto max-h-[450px] object-cover mb-6"
                            />
                        )}

                        <div
                            className="text-gray-800 text-base leading-relaxed whitespace-pre-line mb-8"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {article.tags && article.tags.length > 0 && (
                            <div className="text-sm text-gray-600 mt-4 flex flex-wrap gap-1">
                                {article.tags.map((tag, idx) => (
                                    <span key={idx} className="text-[10px] text-gray-500 italic">
                                        #{String(tag).replace(/['"]/g, '').trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Rekomendasi Artikel */}
                    {relatedArticles.length > 0 && (
                        <aside className="w-full lg:w-1/3">
                            <div className="bg-white shadow p-4 lg:sticky lg:top-20">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">
                                    Artikel Lainnya
                                </h2>
                                <div className="space-y-4">
                                    {relatedArticles.map((item) => (
                                        <Link
                                            href={route("artikel.show", item.slug)}
                                            key={item.id}
                                            className="flex gap-4 items-start hover:bg-gray-50 p-2 transition"
                                        >
                                            {item.thumbnail_url && (
                                                <img
                                                    src={item.thumbnail_url}
                                                    alt={item.title}
                                                    className="w-20 h-20 object-cover"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-xs text-gray-600 line-clamp-2">
                                                    {item.meta_description}
                                                </p>
                                                <p className="text-xs text-[#A34716] font-semibold mt-1">
                                                    {item.date}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    )}
                </div>
            </main>

            <MarketplaceSection />
            <Footer />
        </div>
    );
}
