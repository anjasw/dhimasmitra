import { Link } from "@inertiajs/react";

// Fungsi untuk mengambil beberapa kata pertama dari string dan menghapus tag HTML
function excerpt(html, wordCount = 20) {
    if (!html) return "";
    // Hapus tag HTML
    const text = html.replace(/<[^>]+>/g, "");
    // Ambil beberapa kata pertama
    return (
        text.split(/\s+/).slice(0, wordCount).join(" ") +
        (text.split(/\s+/).length > wordCount ? "..." : "")
    );
}

export default function Blog({ articles = [] }) {
    // articles: array of { id, title, slug, content, thumbnail_url, date }
    return (
        <section className="container mx-auto px-6 py-16">
            {/* Heading */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                    Blog
                </h2>
                <Link
                    href="/artikel"
                    className="text-sm md:text-base text-[#A34716] font-semibold hover:text-[#7a2f0c] transition-colors"
                >
                    Semua Artikel
                </Link>
            </div>

            {/* Grid Artikel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {articles.map((article) => (
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
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
