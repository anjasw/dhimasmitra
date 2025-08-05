// resources/js/Components/MarketplaceSection.jsx
import { usePage } from "@inertiajs/react";
import React from "react";


export default function MarketplaceSection() {
    const contactSocialLink = usePage().props.contactSocialLink || {};
    const marketplaces = [
        { name: "Tokopedia", logo: "/icons/tokopedia.png", href: contactSocialLink.tokopedia_url || "#" },
        { name: "TikTok", logo: "/icons/tiktokshop.png", href: contactSocialLink.tiktok_url || "#" },
        { name: "Shopee", logo: "/icons/shopee.png", href: contactSocialLink.shopee_url || "#" },
        { name: "Lazada", logo: "/icons/lazada.png", href: contactSocialLink.lazada_url || "#" },
    ];
    
    console.log("Contact Social Linkssss:", contactSocialLink);
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
                                <a href={marketplace.href} target="_blank" key={marketplace.name}>
                                    <img
                                        
                                        src={marketplace.logo}
                                        alt={marketplace.name}
                                        className="h-12 md:h-24"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
