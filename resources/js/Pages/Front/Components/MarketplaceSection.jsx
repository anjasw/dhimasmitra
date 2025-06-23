// resources/js/Components/MarketplaceSection.jsx
import React from "react";

const marketplaces = [
    { name: "Tokopedia", logo: "/icons/tokopedia.png" },
    { name: "TikTok", logo: "/icons/tiktokshop.png" },
    { name: "Shopee", logo: "/icons/shopee.png" },
    { name: "Lazada", logo: "/icons/lazada.png" },
];

export default function MarketplaceSection() {
    return (
        <div className="bg-[#A55C37] mt-24 pb-12 px-4 relative">
            {/* Card Putih */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl z-10 px-4">
                <div className="bg-white shadow-md p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        {/* Teks */}
                        <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
                            Dapatkan Produk Kami di Marketplace
                        </h2>

                        {/* Logo Marketplace */}
                        <div className="flex justify-center md:justify-end items-center gap-4 flex-wrap w-full md:w-auto">
                            {marketplaces.map((marketplace) => (
                                <img
                                    key={marketplace.name}
                                    src={marketplace.logo}
                                    alt={marketplace.name}
                                    className="h-12 md:h-24"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
