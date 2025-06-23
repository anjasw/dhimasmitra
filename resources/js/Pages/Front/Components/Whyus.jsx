export default function WhyUs() {
    return (
        <section className="bg-[#f9f9f9]">
            <div className="container mx-auto p-6 py-16 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-12">
                    Kenapa Memilih Kami
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Fitur 1 */}
                    <div className="flex flex-col items-center text-center px-4">
                        <span className="material-symbols-outlined text-[120px] text-[#A34716] mb-4">
                            delivery_truck_speed
                        </span>
                        <h3 className="font-semibold text-lg mb-2">
                            Stok Lengkap & Siap Kirim
                        </h3>
                        <p className="text-sm text-gray-700">
                            Dengan jaringan distribusi yang luas dan stok yang selalu
                            tersedia, kami memastikan pengiriman cepat dan tepat waktu
                            ke seluruh Indonesia.
                        </p>
                    </div>

                    {/* Fitur 2 */}
                    <div className="flex flex-col items-center text-center px-4">
                        <span className="material-symbols-outlined text-[120px] text-[#A34716] mb-4">
                            credit_card_heart
                        </span>
                        <h3 className="font-semibold text-lg mb-2">
                            Harga Kompetitif dari Sumber Utama
                        </h3>
                        <p className="text-sm text-gray-700">
                            Sebagai importir dan produsen langsung, kami menawarkan harga
                            yang lebih kompetitif tanpa perantara. Efisiensi biaya untuk
                            kebutuhan industri Anda.
                        </p>
                    </div>

                    {/* Fitur 3 */}
                    <div className="flex flex-col items-center text-center px-4">
                        <span className="material-symbols-outlined text-[120px] text-[#A34716] mb-4">
                            engineering
                        </span>
                        <h3 className="font-semibold text-lg mb-2">
                            Produk Berkualitas Industri
                        </h3>
                        <p className="text-sm text-gray-700">
                            Kami menyediakan produk karet industri dengan standar mutu tinggi,
                            langsung dari manufaktur kami. Cocok untuk berbagai sektor seperti
                            otomotif, konstruksi, dan pertambangan.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}