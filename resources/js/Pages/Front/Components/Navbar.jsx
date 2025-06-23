import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    const [offcanvasOpen, setOffcanvasOpen] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState(false);

    return (
        <>
            {/* Overlay */}
            {offcanvasOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setOffcanvasOpen(false)}
                ></div>
            )}

            {/* Navbar */}
            <nav className="bg-[#1e1e1e] text-white z-50 relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="h-8 w-auto"
                            />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex md:items-center md:space-x-6 ms-4">
                            <Link
                                href="/"
                                className="text-yellow-400 font-medium"
                            >
                                Home
                            </Link>
                            <div className="relative">
                                <button
                                    className="flex items-center gap-1 peer"
                                    type="button"
                                >
                                    Kategori
                                    <span className="material-symbols-outlined text-sm">
                                        expand_more
                                    </span>
                                </button>

                                <div
                                    className="absolute left-0 top-full mt-2 w-40 bg-white text-black shadow-md z-50
                                    invisible opacity-0 transition-all duration-200
                                    peer-hover:visible peer-hover:opacity-100
                                    hover:visible hover:opacity-100"
                                >
                                    <Link
                                        href="/kategori/produk-a"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Produk A
                                    </Link>
                                    <Link
                                        href="/kategori/produk-b"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Produk B
                                    </Link>
                                    <Link
                                        href="/kategori/produk-c"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Produk C
                                    </Link>
                                </div>
                            </div>

                            <Link href="/shop">Shop</Link>
                            <Link href="/tentang">Tentang Kami</Link>
                            <Link href="/blog">Blog</Link>
                            <Link href="/kontak">Kontak</Link>
                        </div>

                        {/* Search + Cart */}
                        <div className="flex items-center gap-2 md:gap-4 ml-auto">
                            <input
                                type="text"
                                placeholder="Cari"
                                className="px-3 py-1 rounded-sm text-black bg-gray-200 focus:outline-none text-sm"
                            />
                            <div className="relative">
                                <span className="material-symbols-outlined text-[24px] text-white">
                                    shopping_cart
                                </span>
                                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1 rounded-full">
                                    0
                                </span>
                            </div>
                            {/* Toggle Offcanvas */}
                            <button
                                onClick={() => setOffcanvasOpen(true)}
                                className="md:hidden"
                            >
                                <span className="material-symbols-outlined text-[28px]">
                                    menu
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Offcanvas Sidebar Menu */}
            <div
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#1e1e1e] text-white transform transition-transform duration-300 ease-in-out ${
                    offcanvasOpen ? "translate-x-0" : "-translate-x-full"
                } md:hidden`}
            >
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold">Menu</span>
                        <button onClick={() => setOffcanvasOpen(false)}>
                            <span className="material-symbols-outlined text-[28px]">
                                close
                            </span>
                        </button>
                    </div>
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href="/"
                            className="text-yellow-400 font-medium"
                            onClick={() => setOffcanvasOpen(false)}
                        >
                            Home
                        </Link>
                        <div>
                            <button
                                onClick={() => setShowSubmenu(!showSubmenu)}
                                className="flex items-center justify-between w-full"
                            >
                                <span>Kategori</span>
                                <span className="material-symbols-outlined">
                                    {showSubmenu
                                        ? "expand_less"
                                        : "expand_more"}
                                </span>
                            </button>

                            <div
                                className={`mt-2 ml-2 pl-2 border-l border-gray-700 space-y-2 transition-all duration-200 ${
                                    showSubmenu ? "block" : "hidden"
                                }`}
                            >
                                <Link
                                    href="/kategori/produk-a"
                                    onClick={() => setOffcanvasOpen(false)}
                                    className="block"
                                >
                                    Produk A
                                </Link>
                                <Link
                                    href="/kategori/produk-b"
                                    onClick={() => setOffcanvasOpen(false)}
                                    className="block"
                                >
                                    Produk B
                                </Link>
                                <Link
                                    href="/kategori/produk-c"
                                    onClick={() => setOffcanvasOpen(false)}
                                    className="block"
                                >
                                    Produk C
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="/shop"
                            onClick={() => setOffcanvasOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/tentang"
                            onClick={() => setOffcanvasOpen(false)}
                        >
                            Tentang Kami
                        </Link>
                        <Link
                            href="/blog"
                            onClick={() => setOffcanvasOpen(false)}
                        >
                            Blog
                        </Link>
                        <Link
                            href="/kontak"
                            onClick={() => setOffcanvasOpen(false)}
                        >
                            Kontak
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
}
