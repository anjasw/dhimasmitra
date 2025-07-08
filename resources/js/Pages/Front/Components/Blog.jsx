import { Link } from "@inertiajs/react";

const articles = [
    {
        title: "Jenis Alat Listrik dan Cara Memilihnya",
        date: "12 Juni 2025",
        excerpt:
            "Ada berbagai jenis alat listrik seperti mesin potong, bor, sander (alat yang berfungsi untuk memoles), dan",
        image: "/assets/dummy-image.jpg",
    },
    {
        title: "Cara Menggunakan Obeng",
        date: "12 Juni 2025",
        excerpt:
            "Ada berbagai jenis alat listrik seperti mesin potong, bor, sander (alat yang berfungsi untuk memoles), dan",
        image: "/assets/dummy-image.jpg",
    },
    {
        title: "Cara Memilih Peralatan Pelindung Kedap Suara",
        date: "12 Juni 2025",
        excerpt:
            "Ada berbagai jenis alat listrik seperti mesin potong, bor, sander (alat yang berfungsi untuk memoles), dan",
        image: "/assets/dummy-image.jpg",
    },
    {
        title: "Cara Menggunakan Torque Wrench",
        date: "12 Juni 2025",
        excerpt:
            "Ada berbagai jenis alat listrik seperti mesin potong, bor, sander (alat yang berfungsi untuk memoles), dan",
        image: "/assets/dummy-image.jpg",
    },
];

export default function Blog() {
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
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className="bg-white shadow overflow-hidden"
                    >
                        <div className="relative">
                            <img
                                src={article.image}
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
                                {article.excerpt}
                            </p>
                            <p className="text-xs text-[#A34716] font-semibold">
                                {article.date}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
