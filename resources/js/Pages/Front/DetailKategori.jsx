import { Head, Link, usePage } from "@inertiajs/react";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import MarketplaceSection from "./Components/MarketplaceSection";
import Breadcrumb from "./Components/Breadcrumb";

export default function DetailKategori() {
    const { props } = usePage();
    const { kategori, sub_selected, products } = props;
    const breadcrumb = props.breadcrumb ?? [];

    return (
        <div className="bg-gray-100">
            <Head title={kategori.name} />
            <Navbar />
            {breadcrumb.length > 0 && <Breadcrumb items={breadcrumb} />}

            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto p-4">
                    {/* Nama Kategori */}
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        {kategori.name}
                    </h1>

                    {/* Subkategori: Carousel on mobile, flex-wrap on desktop */}
                    <div className="mb-6 pb-4 overflow-x-auto md:overflow-visible">
                        <div className="flex md:flex-wrap gap-2 whitespace-nowrap md:whitespace-normal scroll-smooth scroll-px-4 items-center">
                            {/* Tombol Kembali */}
                            {sub_selected && (
                                <Link
                                    href={`/kategori/${kategori.slug}`}
                                    className="flex items-center gap-1 px-4 py-1 text-sm border bg-gray-100 hover:bg-gray-200"
                                >
                                    <span className="material-symbols-outlined text-base text-sm">
                                        arrow_back
                                    </span>
                                    <span>Semua</span>
                                </Link>
                            )}

                            {/* Daftar Subkategori */}
                            {kategori.subcategories.map((sub, idx) => (
                                <Link
                                    key={idx}
                                    href={sub.href}
                                    className={`px-4 py-1 text-sm border inline-block ${
                                        sub.slug === sub_selected
                                            ? "bg-yellow-400 text-black font-semibold"
                                            : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {sub.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Produk */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {products.length > 0 ? (
                            products.map((product, i) => (
                                <Link href={`/${product.slug}`} key={i}>
                                    <div
                                        className="bg-white p-3 shadow text-center hover:shadow-md transition"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-32 w-full object-contain mb-3"
                                        />
                                        <div className="text-sm font-medium text-gray-800 line-clamp-2">
                                            {product.name}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-full text-gray-500 text-center">
                                Tidak ada produk tersedia.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <MarketplaceSection />
            <Footer />
        </div>
    );
}
