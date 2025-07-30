import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Category({ categories = [] }) {
    // categories: array of { id, name, slug, image_url, products_count }
    const [activeIndex, setActiveIndex] = useState(0);
    const activeCategory = categories[activeIndex] || {};


    console.log("Category rendered with categories:", categories);
    return (
        <div className="container mx-auto px-6 py-16">
            {/* Heading */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                    Kategori
                </h2>
                <Link
                    href="/kategori"
                    className="text-sm md:text-base text-[#A34716] font-semibold hover:text-[#7a2f0c] transition-colors"
                >
                    Semua Kategori
                </Link>
            </div>

            {/* Content */}
            <div className="bg-white shadow-md grid grid-cols-1 md:grid-cols-2">
                {/* Kiri: Daftar Kategori */}
                <div className="max-h-[140px] md:max-h-[400px] overflow-y-auto scrollbar-left direction-rtl p-2">
                    <div className="direction-ltr">
                        {categories.map((cat, index) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveIndex(index)}
                                className={`w-full text-left px-4 py-2 md:py-3 border-b ${
                                    index === activeIndex
                                        ? "text-[#A34716] font-semibold bg-[#fef9f6]"
                                        : "text-black hover:bg-gray-50"
                                } transition`}
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div>{cat.name}</div>
                                        <div className="text-sm text-gray-500">
                                            {cat.products_count} item
                                        </div>
                                    </div>
                                    {index === activeIndex && (
                                        <span className="material-symbols-rounded text-[#A34716] text-2xl">
                                            chevron_right
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Kanan: Gambar Aktif */}
                <div className="relative flex items-center justify-center p-2">
                    <div className="w-full h-full max-h-[384px] overflow-hidden shadow-md relative">
                        {activeCategory.image_url && (
                            <img
                                src={activeCategory.image_url}
                                alt={activeCategory.name}
                                className="w-full h-full object-cover"
                            />
                        )}
                        {/* Overlay Box */}
                        <Link href={`/kategori/${activeCategory.slug}`}>
                            <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 p-3 flex justify-between items-center">
                                <div className="text-sm font-medium text-black">
                                    {activeCategory.name}
                                    <br />
                                    <span className="text-xs font-bold text-black/80">
                                        Lihat Semua Produk
                                    </span>
                                </div>

                                <span className="material-symbols-rounded text-black text-2xl">
                                    chevron_right
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
