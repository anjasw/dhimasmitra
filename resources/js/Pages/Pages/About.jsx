import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function About({ tentangKami, success }) {
    const [visi, setVisi] = useState(tentangKami?.visi || "");
    const [misi, setMisi] = useState(tentangKami?.misi || "");
    const [image, setImage] = useState(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (success) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    }, [success]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('visi', visi);
        formData.append('misi', misi);
        if (image) {
            formData.append('image', image);
        }
        router.post(route('pages.about.update'), formData, {
            onSuccess: () => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-2">
                        <li className="inline-flex items-center">
                            <Link href={route('dashboard')} className="hover:text-blue-600 flex items-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li className="inline-flex items-center text-gray-500 ml-2">
                            Pages
                        </li>
                        <li>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li className="inline-flex items-center text-gray-700 font-semibold ml-2">
                            About
                        </li>
                    </ol>
                </nav>
            }
        >
            <Head title="Pages - About" />

            <section className="py-16 bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div>
                            <label htmlFor="about-image" className="cursor-pointer">
                                <img
                                    src={image ? URL.createObjectURL(image) : (tentangKami?.image ? `/storage/${tentangKami.image}` : "https://dummyimage.com/600x400/ccc/000&text=Tentang+Kami")}
                                    alt="Tentang Kami"
                                    className="shadow-lg w-full h-auto object-cover"
                                />
                            </label>
                            <input
                                type="file"
                                id="about-image"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Misi Kami</h2>
                            <textarea
                                className="border rounded px-3 py-2 w-full text-gray-700 mb-4"
                                rows={4}
                                value={misi}
                                onChange={e => setMisi(e.target.value)}
                                placeholder="Masukkan misi perusahaan"
                                required
                            />
                            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Visi Kami</h2>
                            <textarea
                                className="border rounded px-3 py-2 w-full text-gray-700"
                                rows={4}
                                value={visi}
                                onChange={e => setVisi(e.target.value)}
                                placeholder="Masukkan visi perusahaan"
                                required
                            />
                            <div className="flex justify-end pt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            {showToast && (
                <div className="fixed top-16 right-6 z-50 px-6 py-3 rounded transition-all duration-200">
                    <div className="bg-green-100 text-green-800 px-6 py-3 rounded shadow-lg flex items-center gap-2">
                        <span className="material-symbols-outlined">check_circle</span>
                        Data berhasil disimpan!
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
