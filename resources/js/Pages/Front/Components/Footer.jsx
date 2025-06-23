import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-[#A55C37] text-white pt-24 md:pt-12">
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
                    {/* Kolom Kiri */}
                    <div className='md:col-span-2'>
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/logo.png" alt="Logo" className="h-10" />
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                                <span className="material-symbols-outlined">location_on</span>
                                <span>Jl. Tanah Pasir, Ruko No. 45 G Penjaringan Jakarta-Utara</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined">call</span>
                                <span>021-123456</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="material-symbols-outlined">mail</span>
                                <span>perusahaan@email.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom Tengah */}
                    <div>
                        <h3 className="font-semibold mb-4">Link</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="#">Konfirmasi Pembayaran</Link></li>
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="#">Pengiriman & Pembayaran</Link></li>
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="#">Syarat & Ketentuan</Link></li>
                        </ul>
                    </div>

                    {/* Kolom Kanan */}
                    <div>
                        <h3 className="font-semibold mb-4">Menu</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="#">Kategori</Link></li>
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="#">Shop</Link></li>
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="#">Tentang Kami</Link></li>
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="#">Blog</Link></li>
                            <li><Link className="hover:text-yellow-400 transition-colors duration-200" href="#">Kontak</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="bg-white text-[#a65a35] py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-center md:text-left">
                        PT Dhimas Tri Mitra | Copyright 2025 all right reserved
                    </p>
                    <div className="flex gap-4 text-[20px]">
                        
                        <a href="#" className="hover:opacity-80">
                            <img src="/icons/tiktok.svg" alt="TikTok" className="h-6" />
                        </a>
                        <a href="#" className="hover:opacity-80">
                            <img src="/icons/facebook.svg" alt="Facebook" className="h-6" />
                        </a>
                        <a href="#" className="hover:opacity-80">
                            <img src="/icons/youtube.svg" alt="YouTube" className="h-6" />
                        </a>
                        <a href="#" className="hover:opacity-80">
                            <img src="/icons/instagram.svg" alt="Instagram" className="h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
