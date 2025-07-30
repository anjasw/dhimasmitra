// resources/js/Components/Hero.jsx
import { useEffect } from "react";
import { useState, useRef } from "react";

import { Link, usePage } from "@inertiajs/react";

export default function Hero({sliders}) {
    useEffect(() => {}, []);

    const contact = usePage().props.contact;
    const alamat = contact.address || "Jl. Tanah Pasir, Ruko No. 45 G Penjaringan Jakarta-Utara";
    console.log(sliders);
    const images = sliders.map(slider => ({
        src: slider.image,
        href: slider.link
    }));

    const [current, setCurrent] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const startX = useRef(0);
    const isDragging = useRef(false);
    const deltaX = useRef(0);

    const handleStart = (e) => {
        isDragging.current = true;
        startX.current = e.type.includes("mouse")
            ? e.pageX
            : e.touches[0].clientX;
        setIsSwiping(false);
    };

    const handleMove = (e) => {
        if (!isDragging.current) return;
        const clientX = e.type.includes("mouse")
            ? e.pageX
            : e.touches[0].clientX;
        deltaX.current = clientX - startX.current;

        if (Math.abs(deltaX.current) > 10) {
            setIsSwiping(true);
        }
    };

    const handleEnd = () => {
        if (!isDragging.current) return;
        isDragging.current = false;

        const threshold = 50;
        if (deltaX.current > threshold) {
            setCurrent((prev) => (prev - 1 + images.length) % images.length);
        } else if (deltaX.current < -threshold) {
            setCurrent((prev) => (prev + 1) % images.length);
        }

        deltaX.current = 0;
        
        setTimeout(() => setIsSwiping(false), 0);
    };

    return (
        <main>
            <section
                className="relative w-full h-[90vh] bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/bg-hero.jpg')" }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                {/* Konten utama */}
                <div className="relative z-10 h-full container mx-auto px-6 pb-12 flex flex-col justify-end">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-6">
                        {/* Text */}
                        <div className="w-full md:w-1/2 text-white space-y-6">
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                                Manufaktur Importir & Distributor Rubber Industri
                            </h1>
                            <p className="flex items-center text-sm md:text-base gap-2 pb-4">
                                <span className="material-symbols-outlined">
                                    location_on
                                </span>
                                {alamat}
                            </p>
                            <Link href="/shop">
                                <button className="bg-yellow-400 text-black font-semibold px-10 py-2 shadow hover:bg-yellow-300 transition">
                                    Shop Now
                                </button>
                            </Link>
                        </div>

                        {/* Carousel */}
                        <div
                            className="relative w-full md:w-[45%] overflow-hidden mt-6 md:mt-0 cursor-grab active:cursor-grabbing touch-pan-y"
                            onMouseDown={handleStart}
                            onMouseMove={handleMove}
                            onMouseUp={handleEnd}
                            onMouseLeave={handleEnd}
                            onTouchStart={handleStart}
                            onTouchMove={handleMove}
                            onTouchEnd={handleEnd}
                        >
                            <div
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{
                                    transform: `translateX(-${
                                        current * 66.666
                                    }%)`,
                                }}
                            >
                                {images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="min-w-[66.666%] pr-4"
                                    >
                                        <div
                                            onMouseUp={(e) => {
                                                if (!isSwiping) {
                                                    // window.location.href =
                                                    //     img.href;
                                                }
                                            }}
                                            onTouchEnd={(e) => {
                                                if (!isSwiping) {
                                                    // window.location.href =
                                                    //     img.href;
                                                }
                                            }}
                                            className="block"
                                        >
                                            <img
                                                src={`/storage/${img.src}`}
                                                alt={`Slide ${idx + 1}`}
                                                width={800} // ganti sesuai ukuran asli
                                                height={300}
                                                className="w-full h-32 md:h-48 object-cover shadow-md pointer-events-none select-none"
                                                draggable={false}
                                                loading={idx === current ? "eager" : "lazy"} // Prioritaskan gambar aktif
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigasi */}
                            <button
                                onClick={() =>
                                    setCurrent(
                                        (current - 1 + images.length) %
                                            images.length
                                    )
                                }
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1"
                            >
                                ◀
                            </button>
                            <button
                                onClick={() =>
                                    setCurrent((current + 1) % images.length)
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1"
                            >
                                ▶
                            </button>

                            {/* Dots */}
                            <div className="flex justify-center mt-5 gap-2">
                                {images.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-2 h-2 rounded-full ${
                                            i === current
                                                ? "bg-white"
                                                : "bg-white/50"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
