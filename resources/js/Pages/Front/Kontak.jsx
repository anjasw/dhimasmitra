import { Head } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { useState } from 'react';

export default function Kontak({contacts}) {

    console.log(contacts,"contacts.address")
    const [contact, setContact] = useState({
            address: contacts?.address || "Jl. Tanah Pasir, Ruko No. 45 G Penjaringan Jakarta-Utara",
            email: contacts?.email || "kontak@ptdhimas.co.id",
            phone: contacts?.phone || "+62 21 1234 5678",
            operating_hours: contacts?.operating_hours || "Senin - Jumat, 08.00 - 17.00 WIB"
        });
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Head>
                <title>Kontak Kami</title>
                <meta
                    name="description"
                    content="Hubungi PT Dhimas untuk pertanyaan, konsultasi, atau kerja sama bisnis."
                />
            </Head>

            <Navbar />

            <section
                className="relative w-full h-[30vh] bg-cover bg-center text-white"
                style={{ backgroundImage: "url('/assets/bg-product.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Konten utama */}
                <div className="relative z-10 h-full container mx-auto px-6 pb-12 flex flex-col justify-end">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6">
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                            Hubungi Kami
                        </h1>
                    </div>
                </div>
            </section>

            <main className="flex-grow container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Informasi Kontak */}
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-500">call</span>
                            Informasi Kontak
                        </h2>
                        <p className="mb-6 text-gray-600">
                            Silakan hubungi kami melalui informasi di bawah ini untuk pertanyaan, konsultasi, atau permintaan kerja sama.
                        </p>
                        <ul className="space-y-6 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-blue-500">location_on</span>
                                <div>
                                    <strong className="block text-gray-800 mb-1">Alamat:</strong>
                                    <span className="block bg-gray-100 rounded px-3 py-2">{contact.address}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-green-500">mail</span>
                                <div>
                                    <strong className="block text-gray-800 mb-1">Email:</strong>
                                    <span className="block bg-gray-100 rounded px-3 py-2">{contact.email}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-purple-500">call</span>
                                <div>
                                    <strong className="block text-gray-800 mb-1">Telepon:</strong>
                                    <span className="block bg-gray-100 rounded px-3 py-2">{contact.phone}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-orange-500">schedule</span>
                                <div>
                                    <strong className="block text-gray-800 mb-1">Jam Operasional:</strong>
                                    <span className="block bg-gray-100 rounded px-3 py-2">{contact.operating_hours}</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Formulir Kontak */}
                    <div className="bg-white p-8 shadow-md">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                            Formulir Kontak
                        </h2>
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Masukkan nama Anda"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="nama@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Pesan
                                </label>
                                <textarea
                                    className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    rows="5"
                                    placeholder="Tulis pesan Anda di sini..."
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-400 py-3 hover:bg-yellow-300 transition"
                                >
                                    Kirim Pesan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
