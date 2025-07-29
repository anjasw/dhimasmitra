import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Contact({ contact: initialContact, success }) {
    const [contact, setContact] = useState({
        address: initialContact?.address || "",
        email: initialContact?.email || "",
        phone: initialContact?.phone || "",
        operating_hours: initialContact?.operating_hours || ""
    });
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (success) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    }, [success]);

    const handleChange = (e) => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('pages.contact.store'), contact, {
            preserveScroll: true,
            onSuccess: () => {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000); // toast hilang dalam 3 detik
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
                    {/* ...breadcrumb code... */}
                </nav>
            }
        >
            <Head title="Pages - Contact" />
            <div className="max-w-2xl mx-auto py-10">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-700 flex items-center gap-2">
                        <span className="material-symbols-outlined text-yellow-500">call</span>
                        Form Kontak
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6 text-gray-700">
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-blue-500">location_on</span>
                            <div className="w-full">
                                <label className="block text-gray-800 mb-1 font-medium">Alamat:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={contact.address}
                                    onChange={handleChange}
                                    className="block bg-gray-100 rounded px-3 py-2 w-full border"
                                    placeholder="Masukkan alamat"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-green-500">mail</span>
                            <div className="w-full">
                                <label className="block text-gray-800 mb-1 font-medium">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={contact.email}
                                    onChange={handleChange}
                                    className="block bg-gray-100 rounded px-3 py-2 w-full border"
                                    placeholder="Masukkan email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-purple-500">call</span>
                            <div className="w-full">
                                <label className="block text-gray-800 mb-1 font-medium">Telepon:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={contact.phone}
                                    onChange={handleChange}
                                    className="block bg-gray-100 rounded px-3 py-2 w-full border"
                                    placeholder="Masukkan nomor telepon"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="material-symbols-outlined text-orange-500">schedule</span>
                            <div className="w-full">
                                <label className="block text-gray-800 mb-1 font-medium">Jam Operasional:</label>
                                <input
                                    type="text"
                                    name="operating_hours"
                                    value={contact.operating_hours}
                                    onChange={handleChange}
                                    className="block bg-gray-100 rounded px-3 py-2 w-full border"
                                    placeholder="Masukkan jam operasional"
                                    required
                                />
                            </div>
                        </div>
                        <div className="pt-4 flex justify-end">
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
                            >
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {showToast && (
                <div className="fixed top-16 right-6 z-50 px-6 py-3 rounded transition-all duration-200">
                    <div className="bg-green-100 text-green-800 px-6 py-3 rounded shadow-lg flex items-center gap-2">
                        <span className="material-symbols-outlined">check_circle</span>
                        Data kontak berhasil disimpan!
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
