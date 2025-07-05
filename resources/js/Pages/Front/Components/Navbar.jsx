import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    const [offcanvasOpen, setOffcanvasOpen] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState(false);

    const categories = [
        {
            name: "Produk A",
            href: "/kategori/produk-a",
            subcategories: [
                { name: "Sub A1", href: "/kategori/produk-a/sub-a1" },
                { name: "Sub A2", href: "/kategori/produk-a/sub-a2" },
                { name: "Sub A3", href: "/kategori/produk-a/sub-a3" },
                { name: "Sub A4", href: "/kategori/produk-a/sub-a4" },
                { name: "Sub A5", href: "/kategori/produk-a/sub-a5" },
            ],
        },
        {
            name: "Produk B",
            href: "/kategori/produk-b",
            subcategories: [
                { name: "Sub B1", href: "/kategori/produk-b/sub-b1" },
                { name: "Sub B2", href: "/kategori/produk-b/sub-b2" },
                { name: "Sub B3", href: "/kategori/produk-b/sub-b3" },
            ],
        },
        {
            name: "Produk C",
            href: "/kategori/produk-c",
            subcategories: [],
        },
        {
            name: "Produk D",
            href: "/kategori/produk-a",
            subcategories: [
                { name: "Sub A1", href: "/kategori/produk-a/sub-a1" },
                { name: "Sub A2", href: "/kategori/produk-a/sub-a2" },
                { name: "Sub A3", href: "/kategori/produk-a/sub-a3" },
                { name: "Sub A4", href: "/kategori/produk-a/sub-a4" },
                { name: "Sub A5", href: "/kategori/produk-a/sub-a5" },
            ],
        },
        {
            name: "Produk E",
            href: "/kategori/produk-b",
            subcategories: [
                { name: "Sub B1", href: "/kategori/produk-b/sub-b1" },
                { name: "Sub B2", href: "/kategori/produk-b/sub-b2" },
                { name: "Sub B3", href: "/kategori/produk-b/sub-b3" },
            ],
        },
        {
            name: "Produk F",
            href: "/kategori/produk-c",
            subcategories: [],
        },
        {
            name: "Produk G",
            href: "/kategori/produk-a",
            subcategories: [
                { name: "Sub A1", href: "/kategori/produk-a/sub-a1" },
                { name: "Sub A2", href: "/kategori/produk-a/sub-a2" },
                { name: "Sub A3", href: "/kategori/produk-a/sub-a3" },
                { name: "Sub A4", href: "/kategori/produk-a/sub-a4" },
                { name: "Sub A5", href: "/kategori/produk-a/sub-a5" },
            ],
        },
        {
            name: "Produk H",
            href: "/kategori/produk-b",
            subcategories: [
                { name: "Sub B1", href: "/kategori/produk-b/sub-b1" },
                { name: "Sub B2", href: "/kategori/produk-b/sub-b2" },
                { name: "Sub B3", href: "/kategori/produk-b/sub-b3" },
            ],
        },
        {
            name: "Produk I",
            href: "/kategori/produk-c",
            subcategories: [],
        },
        {
            name: "Produk J",
            href: "/kategori/produk-a",
            subcategories: [
                { name: "Sub A1", href: "/kategori/produk-a/sub-a1" },
                { name: "Sub A2", href: "/kategori/produk-a/sub-a2" },
                { name: "Sub A3", href: "/kategori/produk-a/sub-a3" },
                { name: "Sub A4", href: "/kategori/produk-a/sub-a4" },
                { name: "Sub A5", href: "/kategori/produk-a/sub-a5" },
            ],
        },
        {
            name: "Produk K",
            href: "/kategori/produk-b",
            subcategories: [
                { name: "Sub B1", href: "/kategori/produk-b/sub-b1" },
                { name: "Sub B2", href: "/kategori/produk-b/sub-b2" },
                { name: "Sub B3", href: "/kategori/produk-b/sub-b3" },
            ],
        },
        {
            name: "Produk L",
            href: "/kategori/produk-c",
            subcategories: [],
        },
        {
            name: "Produk M",
            href: "/kategori/produk-a",
            subcategories: [
                { name: "Sub A1", href: "/kategori/produk-a/sub-a1" },
                { name: "Sub A2", href: "/kategori/produk-a/sub-a2" },
                { name: "Sub A3", href: "/kategori/produk-a/sub-a3" },
                { name: "Sub A4", href: "/kategori/produk-a/sub-a4" },
                { name: "Sub A5", href: "/kategori/produk-a/sub-a5" },
            ],
        },
        {
            name: "Produk N",
            href: "/kategori/produk-b",
            subcategories: [
                { name: "Sub B1", href: "/kategori/produk-b/sub-b1" },
                { name: "Sub B2", href: "/kategori/produk-b/sub-b2" },
                { name: "Sub B3", href: "/kategori/produk-b/sub-b3" },
            ],
        },
        {
            name: "Produk O",
            href: "/kategori/produk-c",
            subcategories: [],
        },
    ];

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
            <nav className="bg-[#1e1e1e] text-white z-50 relative sticky top-0 shadow-md">
                <div className="container mx-auto px-4">
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
                            >
                                Home
                            </Link>

                            <div className="relative group hover:text-yellow-400 transition">
                                <button
                                    className="flex items-center gap-1 h-16"
                                    type="button"
                                >
                                    Kategori
                                    <span className="material-symbols-outlined text-sm">
                                        expand_more
                                    </span>
                                </button>

                                <div
                                    className="fixed top-16 left-0 w-screen bg-[#2a2a2a] text-white shadow-md z-40 py-6
    opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200"
                                >
                                    <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-sm">
                                        {categories
                                            .slice(0, 10)
                                            .map((category, idx) => (
                                                <div key={idx}>
                                                    <Link
                                                        href={category.href}
                                                        className="font-semibold hover:text-yellow-400 transition px-2 block mb-1"
                                                    >
                                                        {category.name}
                                                    </Link>
                                                    <ul className="ml-2 space-y-1">
                                                        {category.subcategories
                                                            .slice(0, 4)
                                                            .map(
                                                                (
                                                                    sub,
                                                                    subIdx
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            subIdx
                                                                        }
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                sub.href
                                                                            }
                                                                            className="hover:text-yellow-300 transition px-2"
                                                                        >
                                                                            {
                                                                                sub.name
                                                                            }
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            )}
                                                        {category.subcategories
                                                            .length > 4 && (
                                                            <li>
                                                                <Link
                                                                    href={
                                                                        category.href
                                                                    }
                                                                    className="text-blue-400 hover:text-yellow-400 transition px-2 font-medium"
                                                                >
                                                                    Lihat Semua
                                                                    Subkategori
                                                                </Link>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                            ))}

                                        {categories.length > 10 && (
                                            <div className="col-span-full text-center mt-4">
                                                <hr className="mb-4 border-t-1 border-gray-600 " />
                                                <Link
                                                    href="/kategori"
                                                    className="inline-block text-blue-400 font-semibold hover:text-yellow-400 transition px-2"
                                                >
                                                    Lihat Semua Kategori
                                                </Link>
                                            </div>
                                        )}
                                    </div>
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
                                className="px-3 py-1 text-black bg-gray-200 focus:outline-none focus:ring focus:ring-yellow-300 text-sm"
                            />
                            <Link href="/order" className="relative">
                                <span className="material-symbols-outlined text-[24px] text-white">
                                    shopping_cart
                                </span>
                                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1 rounded-full">
                                    0
                                </span>
                            </Link>

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
                        {categories.slice(0, 10).map((category, index) => {
                            const [openSub, setOpenSub] = useState(false);

                            return (
                                <div key={index}>
                                    <div className="flex justify-between items-center">
                                        <Link
                                            href={category.href}
                                            onClick={() =>
                                                setOffcanvasOpen(false)
                                            }
                                            className="flex-1"
                                        >
                                            {category.name}
                                        </Link>
                                        <button
                                            onClick={() =>
                                                setShowSubmenu((prev) => ({
                                                    ...prev,
                                                    [index]: !prev[index],
                                                }))
                                            }
                                        >
                                            <span className="material-symbols-outlined text-sm">
                                                {showSubmenu[index]
                                                    ? "expand_less"
                                                    : "expand_more"}
                                            </span>
                                        </button>
                                    </div>

                                    {/* Subkategori */}
                                    {showSubmenu[index] && (
                                        <div className="ml-4 mt-1 space-y-1 text-sm">
                                            {category.subcategories
                                                .slice(0, 4)
                                                .map((sub, subIdx) => (
                                                    <Link
                                                        key={subIdx}
                                                        href={sub.href}
                                                        onClick={() =>
                                                            setOffcanvasOpen(
                                                                false
                                                            )
                                                        }
                                                        className="block"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}

                                            {category.subcategories.length >
                                                4 && (
                                                <Link
                                                    href={category.href}
                                                    onClick={() =>
                                                        setOffcanvasOpen(false)
                                                    }
                                                    className="block text-blue-400"
                                                >
                                                    Lihat Semua Subkategori
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {categories.length > 10 && (
                            <Link
                                href="/kategori"
                                onClick={() => setOffcanvasOpen(false)}
                                className="text-blue-400"
                            >
                                Lihat Semua Kategori
                            </Link>
                        )}

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
