import { useEffect, useState, useRef } from "react";
import { Link } from "@inertiajs/react";

export default function Navbar({ category, carts }) {
    const [offcanvasOpen, setOffcanvasOpen] = useState(false);
    const [showSubmenu, setShowSubmenu] = useState(false);

    console.log(carts, 'carts')
    const [cartOpen, setCartOpen] = useState(false);
    const cartRef = useRef(null);
    const cartButtonRef = useRef(null);

    const cartItems = carts.map((cart) => ({
        id: cart.id,
        name: cart.name,
        qty: cart.qty,
        price: cart.product.fix_price_formatted,
        href: cart.href,
        image: cart.product.images[0] ? '/storage/' + cart.product.images[0].image : "/assets/dummy-image.jpg",
    }));

    console.log(cartItems, 'cartItems')

    // const cartItems = [
    //     {
    //         id: 1,
    //         name: "Produk A",
    //         qty: 2,
    //         price: 50000,
    //         href: "/produk-a",
    //         image: "/assets/dummy-image.jpg",
    //     },
    //     {
    //         id: 2,
    //         name: "Produk B",
    //         qty: 1,
    //         price: 75000,
    //         href: "/produk-b",
    //         image: "/assets/dummy-image.jpg",
    //     },
    // ];
    console.log(category);

    const categories = category.map((cat) => ({
        name: cat.name,
        href: cat.href,
        subcategories: cat.subcategories,
    }));

    // const categories = [
    //     {
    //         name: "Produk A",
    //         href: "/kategori/produk-a",
    //         subcategories: [
    //             { name: "Sub A1", href: "/kategori/produk-a/sub-a1" },
    //             { name: "Sub A2", href: "/kategori/produk-a/sub-a2" },
    //             { name: "Sub A3", href: "/kategori/produk-a/sub-a3" },
    //             { name: "Sub A4", href: "/kategori/produk-a/sub-a4" },
    //             { name: "Sub A5", href: "/kategori/produk-a/sub-a5" },
    //         ],
    //     },
    //     {
    //         name: "Produk B",
    //         href: "/kategori/produk-b",
    //         subcategories: [
    //             { name: "Sub B1", href: "/kategori/produk-b/sub-b1" },
    //             { name: "Sub B2", href: "/kategori/produk-b/sub-b2" },
    //             { name: "Sub B3", href: "/kategori/produk-b/sub-b3" },
    //         ],
    //     },
    //     {
    //         name: "Produk C",
    //         href: "/kategori/produk-c",
    //         subcategories: [],
    //     },
    //     {
    //         name: "Produk D",
    //         href: "/kategori/produk-a",
    //         subcategories: [
    //             { name: "Sub A1", href: "/kategori/produk-a/sub-a1" },
    //             { name: "Sub A2", href: "/kategori/produk-a/sub-a2" },
    //             { name: "Sub A3", href: "/kategori/produk-a/sub-a3" },
    //             { name: "Sub A4", href: "/kategori/produk-a/sub-a4" },
    //             { name: "Sub A5", href: "/kategori/produk-a/sub-a5" },
    //         ],
    //     },
    //     {
    //         name: "Produk E",
    //         href: "/kategori/produk-b",
    //         subcategories: [
    //             { name: "Sub B1", href: "/kategori/produk-b/sub-b1" },
    //             { name: "Sub B2", href: "/kategori/produk-b/sub-b2" },
    //             { name: "Sub B3", href: "/kategori/produk-b/sub-b3" },
    //         ],
    //     },
    //     {
    //         name: "Produk F",
    //         href: "/kategori/produk-c",
    //         subcategories: [],
    //     },
    //     {
    //         name: "Produk G",
    //         href: "/kategori/produk-a",
    //         subcategories: [
    //             { name: "Sub A1", href: "/kategori/produk-a/sub-a1" },
    //             { name: "Sub A2", href: "/kategori/produk-a/sub-a2" },
    //             { name: "Sub A3", href: "/kategori/produk-a/sub-a3" },
    //             { name: "Sub A4", href: "/kategori/produk-a/sub-a4" },
    //             { name: "Sub A5", href: "/kategori/produk-a/sub-a5" },
    //         ],
    //     },
    //     {
    //         name: "Produk H",
    //         href: "/kategori/produk-b",
    //         subcategories: [
    //             { name: "Sub B1", href: "/kategori/produk-b/sub-b1" },
    //             { name: "Sub B2", href: "/kategori/produk-b/sub-b2" },
    //             { name: "Sub B3", href: "/kategori/produk-b/sub-b3" },
    //         ],
    //     },
    //     {
    //         name: "Produk I",
    //         href: "/kategori/produk-c",
    //         subcategories: [],
    //     },
    //     {
    //         name: "Produk J",
    //         href: "/kategori/produk-a",
    //         subcategories: [
    //             { name: "Sub A1", href: "/kategori/produk-a/sub-a1" },
    //             { name: "Sub A2", href: "/kategori/produk-a/sub-a2" },
    //             { name: "Sub A3", href: "/kategori/produk-a/sub-a3" },
    //             { name: "Sub A4", href: "/kategori/produk-a/sub-a4" },
    //             { name: "Sub A5", href: "/kategori/produk-a/sub-a5" },
    //         ],
    //     },
    //     {
    //         name: "Produk K",
    //         href: "/kategori/produk-b",
    //         subcategories: [
    //             { name: "Sub B1", href: "/kategori/produk-b/sub-b1" },
    //             { name: "Sub B2", href: "/kategori/produk-b/sub-b2" },
    //             { name: "Sub B3", href: "/kategori/produk-b/sub-b3" },
    //         ],
    //     },
    //     {
    //         name: "Produk L",
    //         href: "/kategori/produk-c",
    //         subcategories: [],
    //     },
    //     {
    //         name: "Produk M",
    //         href: "/kategori/produk-a",
    //         subcategories: [
    //             { name: "Sub A1", href: "/kategori/produk-a/sub-a1" },
    //             { name: "Sub A2", href: "/kategori/produk-a/sub-a2" },
    //             { name: "Sub A3", href: "/kategori/produk-a/sub-a3" },
    //             { name: "Sub A4", href: "/kategori/produk-a/sub-a4" },
    //             { name: "Sub A5", href: "/kategori/produk-a/sub-a5" },
    //         ],
    //     },
    //     {
    //         name: "Produk N",
    //         href: "/kategori/produk-b",
    //             { name: "Sub B1", href: "/kategori/produk-b/sub-b1" },
    //             { name: "Sub B2", href: "/kategori/produk-b/sub-b2" },
    //             { name: "Sub B3", href: "/kategori/produk-b/sub-b3" },
    //         ],
    //     },
    //     {
    //         name: "Produk O",
    //         href: "/kategori/produk-c",
    //         subcategories: [],
    //     },
    // ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                cartRef.current &&
                !cartRef.current.contains(event.target) &&
                cartButtonRef.current &&
                !cartButtonRef.current.contains(event.target)
            ) {
                setCartOpen(false);
            }
        }

        if (cartOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cartOpen]);

    useEffect(() => {
        const isMobile =
            typeof window !== "undefined" && window.innerWidth < 768;
        const shouldLockScroll = isMobile && (cartOpen || offcanvasOpen);

        if (shouldLockScroll) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [cartOpen, offcanvasOpen]);

    return (
        <>
            {/* Overlay */}
            {(cartOpen || offcanvasOpen) && (
                <div
                    className="fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden"
                    onClick={() => {
                        if (cartOpen) setCartOpen(false);
                        if (offcanvasOpen) setOffcanvasOpen(false);
                    }}
                ></div>
            )}

            {/* Navbar */}
            <nav className="bg-[#1e1e1e] text-white z-50 relative sticky top-0 shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <Link href="/">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex md:items-center md:space-x-6 ms-4">
                            <Link href="/">Home</Link>

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
                            <div className="relative">
                                <button
                                    ref={cartButtonRef}
                                    onClick={() => setCartOpen(!cartOpen)}
                                    className="relative"
                                >
                                    <span className="material-symbols-outlined text-[24px] text-white">
                                        shopping_cart
                                    </span>
                                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1 rounded-full">
                                        {cartItems.length}
                                    </span>
                                </button>

                                {/* Dropdown Cart (Desktop) */}
                                {cartOpen && (
                                    <div
                                        ref={cartRef}
                                        className="hidden md:block absolute right-0 mt-4 w-64 bg-white text-black shadow-lg z-50"
                                    >
                                        <div className="p-4 relative">
                                            <span className="absolute -top-5 -right-1 text-white">
                                                <span className="material-symbols-outlined text-4xl">
                                                    arrow_drop_up
                                                </span>
                                            </span>
                                            {cartItems.length === 0 ? (
                                                <div className="text-center text-sm text-gray-500">
                                                    Keranjang kosong.
                                                    <Link
                                                        href="/shop"
                                                        className="block mt-2 text-blue-500 font-medium"
                                                        onClick={() =>
                                                            setCartOpen(false)
                                                        }
                                                    >
                                                        Lihat Produk
                                                    </Link>
                                                </div>
                                            ) : (
                                                <>
                                                    <ul className="space-y-3 max-h-40 overflow-y-auto">
                                                        {cartItems.map(
                                                            (item) => (
                                                                <li
                                                                    key={
                                                                        item.id
                                                                    }
                                                                >
                                                                    <Link
                                                                        href={
                                                                            item.href
                                                                        }
                                                                        className="flex items-center gap-2 hover:bg-gray-100 p-2 transition"
                                                                        onClick={() =>
                                                                            setCartOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={
                                                                                item.image
                                                                            }
                                                                            alt={
                                                                                item.name
                                                                            }
                                                                            className="w-10 h-10 object-cover"
                                                                        />
                                                                        <div className="flex-1 text-sm">
                                                                            <div className="font-medium">
                                                                                {
                                                                                    item.name
                                                                                }
                                                                            </div>
                                                                            <div className="text-xs text-gray-600">
                                                                                Qty:{" "}
                                                                                {
                                                                                    item.qty
                                                                                }
                                                                            </div>
                                                                            <div className="text-xs text-gray-600">
                                                                                Harga: {item.price}
                                                                            </div>
                                                                        </div>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>

                                                    <Link
                                                        href="/order"
                                                        onClick={() =>
                                                            setCartOpen(false)
                                                        }
                                                        className="mt-4 block w-full bg-yellow-400 text-center text-black font-bold py-2 hover:bg-yellow-300"
                                                    >
                                                        Checkout
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
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
                className={`fixed top-0 left-0 z-[70] h-full w-64 bg-[#1e1e1e] text-white transform transition-transform duration-300 ease-in-out ${
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

            {/* Bottom Sheet Cart (Mobile) */}
            <div
                className={`fixed bottom-0 left-0 w-full h-[75%] bg-[#1e1e1e] text-white z-[70] transform transition-transform duration-300 ease-in-out ${
                    cartOpen ? "translate-y-0" : "translate-y-full"
                } md:hidden`}
            >
                <div className="p-4 h-full flex flex-col">
                    {/* Header + List Product (Scrollable) */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-bold">Keranjang</span>
                            <button onClick={() => setCartOpen(false)}>
                                <span className="material-symbols-outlined text-[28px]">
                                    close
                                </span>
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <div className="text-center text-sm text-gray-300">
                                Keranjang kosong.
                                <Link
                                    href="/shop"
                                    onClick={() => setCartOpen(false)}
                                    className="block mt-2 text-blue-400 font-medium"
                                >
                                    Lihat Produk
                                </Link>
                            </div>
                        ) : (
                            <ul className="space-y-3">
                                {cartItems.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={item.href}
                                            className="flex items-center gap-2 hover:bg-gray-800 p-2 transition"
                                            onClick={() => setCartOpen(false)}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-10 h-10 object-cover"
                                            />
                                            <div className="flex-1 text-sm">
                                                <div className="font-medium text-white">
                                                    {item.name}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    Qty: {item.qty}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    Harga: {item.price}
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Sticky Checkout Button */}
                    {cartItems.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                            <Link
                                href="/order"
                                onClick={() => setCartOpen(false)}
                                className="block bg-yellow-400 text-center text-black font-bold py-2 hover:bg-yellow-300"
                            >
                                Checkout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
