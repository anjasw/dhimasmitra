import { Link } from "@inertiajs/react";

export default function Brand({brands}) {
    // const logos = [
    //     "branson.png",
    //     "abc.png",
    //     "acis.png",
    //     "alcatel.png",
    //     "anex.png",
    //     "biosol.png",
    //     "bayer.png",
    //     "baseus.png",
    //     "baer.png",
    //     "buffalo.png",
    //     "bilima.png",
    //     "betty-crocker.png",
    // ];

    return (
        <div className="container mx-auto px-6 py-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-black">
                    Brand
                </h2>
                <Link
                    href="/{brands}"
                    className="text-sm md:text-base text-[#A34716] font-semibold no-underline hover:text-[#7a2f0c] transition-colors"
                >
                    Semua Brand
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
                {brands.map((img, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-2 shadow-md rounded flex items-center justify-center"
                    >
                        <img
                            src={`/storage/${img.image}`}
                            alt={img.name}
                            className="max-h-12 object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
