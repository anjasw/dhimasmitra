import { Link, usePage } from '@inertiajs/react';

export default function Footer() {
    const contact = usePage().props.contact;
    const alamat = contact.address || "Jl. Tanah Pasir, Ruko No. 45 G Penjaringan Jakarta-Utara";

    const contactSocialLink = usePage().props.contactSocialLink || {};
    console.log("Contact Social Links:", contactSocialLink);
    // Ambil social links dari contact jika sudah di-merge ke model Contact
    // Jika tidak, bisa ambil dari contact.social_links atau contact langsung
    const social = contact || {};

    return (
        <footer className="bg-[#A55C37] text-white pt-24 md:pt-12">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                    {/* Kolom Kiri */}
                    <div className='md:col-span-2'>
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/logo-dhimasgroup.png" alt="Logo" className="h-20" />
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined">location_on</span>
                                <span>{alamat}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined">call</span>
                                <span>{contact.phone || "021-123456"}</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined">mail</span>
                                <span>{contact.email || "perusahaan@email.com"}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom Tengah */}
                    <div>
                        <h3 className="font-semibold mb-4">Link</h3>
                        <ul className="space-y-2 text-sm">
                            {contactSocialLink.tokopedia_url && (
                                <li>
                                    <a className="hover:text-yellow-400 transition-colors duration-200" href={contactSocialLink.tokopedia_url} target="_blank" rel="noopener noreferrer">
                                        Tokopedia
                                    </a>
                                </li>
                            )}
                            {contactSocialLink.tiktokshop_url && (
                                <li>
                                    <a className="hover:text-yellow-400 transition-colors duration-200" href={contactSocialLink.tiktokshop_url} target="_blank" rel="noopener noreferrer">
                                        Tiktok Shop
                                    </a>
                                </li>
                            )}
                            {contactSocialLink.shopee_url && (
                                <li>
                                    <a className="hover:text-yellow-400 transition-colors duration-200" href={contactSocialLink.shopee_url} target="_blank" rel="noopener noreferrer">
                                        Shopee
                                    </a>
                                </li>
                            )}
                            {contactSocialLink.lazada_url && (
                                <li>
                                    <a className="hover:text-yellow-400 transition-colors duration-200" href={contactSocialLink.lazada_url} target="_blank" rel="noopener noreferrer">
                                        Lazada
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Kolom Kanan */}
                    <div>
                        <h3 className="font-semibold mb-4">Menu</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="/kategori">Kategori</Link></li>
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="/shop">Shop</Link></li>
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="/tentang">Tentang Kami</Link></li>
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="/artikel">Blog</Link></li>
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="/kontak">Kontak</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="bg-white text-[#a65a35] py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-center md:text-left">
                        PT Dhimas Tri Mitra | Copyright 2025 all right reserved
                    </p>
                    <div className="flex gap-4 text-[20px]">
                        {contactSocialLink.tiktok_url && (
                            <a href={contactSocialLink.tiktok_url} className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/tiktok.svg" alt="TikTok" className="h-6" />
                            </a>
                        )}
                        {contactSocialLink.facebook_url && (
                            <a href={contactSocialLink.facebook_url} className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/facebook.svg" alt="Facebook" className="h-6" />
                            </a>
                        )}
                        {contactSocialLink.youtube_url && (
                            <a href={contactSocialLink.youtube_url} className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/youtube.svg" alt="YouTube" className="h-6" />
                            </a>
                        )}
                        {contactSocialLink.instagram_url && (
                            <a href={contactSocialLink.instagram_url} className="hover:opacity-80" target="_blank" rel="noopener noreferrer">
                                <img src="/icons/instagram.svg" alt="Instagram" className="h-6" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
}
