import { Head, usePage } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import WhyUs from "./Components/Whyus";
import MarketplaceSection from "./Components/MarketplaceSection";
import Blog from "./Components/Blog";

import { useState } from 'react';

// Props: tentangKami = [{section, title, content, image_url}, ...]
export default function TentangKami({ tentangKami }) {

    const [visi, setVisi] = useState(tentangKami?.visi || "");
    const [misi, setMisi] = useState(tentangKami?.misi || "");
    const [image, setImage] = useState(null);

    const contact = usePage().props.contact;
    const alamat = contact.address || "Jl. Tanah Pasir, Ruko No. 45 G Penjaringan Jakarta-Utara";
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Head>
                <title>Tentang Kami</title>
                <meta
                    name="description"
                    content="Tentang Kami - PT Dhimas"
                />
            </Head>

            <Navbar />

            <main className="flex-grow">
                <section
                    className="relative w-full h-[70vh] bg-cover bg-center text-white"
                    style={{ backgroundImage: "url('/assets/bg-tentang.jpg')" }}
                >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Konten utama */}
                    <div className="relative z-10 h-full container mx-auto px-6 pb-12 flex flex-col justify-end">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6">
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                Manufaktur Importir & Distributor Rubber Industri
                            </h1>
                            <p className="flex items-center text-sm md:text-base gap-2 pb-4">
                                <span className="material-symbols-outlined">
                                    location_on
                                </span>
                               {alamat}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Why Us */}
                <WhyUs />

                {/* Content Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <img
                                src={image ? URL.createObjectURL(image) : (tentangKami?.image ? `/storage/${tentangKami.image}` : "https://dummyimage.com/600x400/ccc/000&text=Tentang+Kami")}
                                alt="Tentang Kami"
                                className="shadow-lg w-full h-auto object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Misi Kami
                            </h2>

                            <p className="text-gray-600 mb-4">{misi ?? "Misi kami adalah membantu bisnis bertumbuh dengan solusi digital modern seperti pengembangan website, aplikasi mobile, dan strategi digital marketing. Kami percaya bahwa teknologi adalah alat untuk kemajuan, dan kami ingin menjadi bagian dari transformasi digital Anda."}</p>

                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Visi Kami
                            </h2>
                            <p className="text-gray-600 mb-4">{visi ?? "Visi kami adalah menjadi perusahaan terdepan dalam solusi digital yang inovatif dan berdampak. Kami berkomitmen untuk memberikan layanan terbaik kepada klien kami dan membantu mereka mencapai tujuan bisnis mereka melalui teknologi."}</p>
                        </div>
                    </div>
                </section>
            </main>

            <Blog />

            <MarketplaceSection />

            <Footer />
        </div>
    );
}