import { Head } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function Kontak() {
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
                    <div className="bg-white p-8 shadow-md">
                        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                            Informasi Kontak
                        </h2>
                        <p className="mb-4 text-gray-600">
                            Silakan hubungi kami melalui informasi di bawah ini
                            untuk pertanyaan, konsultasi, atau permintaan kerja
                            sama.
                        </p>
                        <ul className="space-y-4 text-gray-700">
                            <li>
                                <strong>Alamat:</strong>
                                <br />
                                Jl. Contoh Raya No.123, Jakarta, Indonesia
                            </li>
                            <li>
                                <strong>Email:</strong>
                                <br />
                                kontak@ptdhimas.co.id
                            </li>
                            <li>
                                <strong>Telepon:</strong>
                                <br />
                                +62 21 1234 5678
                            </li>
                            <li>
                                <strong>Jam Operasional:</strong>
                                <br />
                                Senin - Jumat, 08.00 - 17.00 WIB
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
