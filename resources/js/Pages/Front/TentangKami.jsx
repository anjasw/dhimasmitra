import { Head } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import WhyUs from "./Components/Whyus";
import MarketplaceSection from "./Components/MarketplaceSection";
import Blog from "./Components/Blog";

export default function TentangKami() {
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
                                Manufaktur Importir &<br /> Distributor Rubber
                                Industri
                            </h1>
                            <p className="flex items-center text-sm md:text-base gap-2 pb-4">
                                <span className="material-symbols-outlined">
                                    location_on
                                </span>
                                Jl. Tanah Pasir, Ruko No. 45 G Penjaringan
                                Jakarta-Utara
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
                                src="https://dummyimage.com/600x400/ccc/000&text=Tentang+Kami"
                                alt="Tentang Kami"
                                className="shadow-lg w-full h-auto object-cover"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Misi Kami
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Misi kami adalah membantu bisnis bertumbuh
                                dengan solusi digital modern seperti
                                pengembangan website, aplikasi mobile, dan
                                strategi digital marketing.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Kami percaya bahwa teknologi adalah alat untuk
                                kemajuan, dan kami ingin menjadi bagian dari
                                transformasi digital Anda.
                            </p>

                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Visi Kami
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Misi kami adalah membantu bisnis bertumbuh
                                dengan solusi digital modern seperti
                                pengembangan website, aplikasi mobile, dan
                                strategi digital marketing.
                            </p>
                            <p className="text-gray-600 mb-4">
                                Kami percaya bahwa teknologi adalah alat untuk
                                kemajuan, dan kami ingin menjadi bagian dari
                                transformasi digital Anda.
                            </p>
                        </div>
                        
                    </div>
                </section>

                {/* Team Section */}
                <section className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-12">
                            Tim Kami
                        </h2>
                        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="bg-[#A34716] shadow p-6"
                                >
                                    <img
                                        src={`https://dummyimage.com/200x200/aaa/fff&text=Tim+${item}`}
                                        alt={`Tim ${item}`}
                                        className="w-32 h-32 mx-auto rounded-full mb-4"
                                    />
                                    <h3 className="text-xl font-semibold text-white">
                                        Nama Tim {item}
                                    </h3>
                                    <p className="text-gray-100">
                                        Posisi / Role
                                    </p>
                                </div>
                            ))}
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
