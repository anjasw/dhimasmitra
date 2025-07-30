import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function List({ links }) {
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [toast, setToast] = useState(null);

    const { flash } = usePage().props;

    const { data, setData, post, put, reset, errors, processing, delete: destroy } = useForm({
        tokopedia_url: "",
        tiktokshop_url: "",
        shopee_url: "",
        lazada_url: "",
        facebook_url: "",
        instagram_url: "",
        tiktok_url: "",
        youtube_url: "",
    });

    useEffect(() => {
        if (links.data && links.data[0]) {
            setData({
                tokopedia_url: links.data[0].tokopedia_url || "",
                tiktokshop_url: links.data[0].tiktokshop_url || "",
                shopee_url: links.data[0].shopee_url || "",
                lazada_url: links.data[0].lazada_url || "",
                facebook_url: links.data[0].facebook_url || "",
                instagram_url: links.data[0].instagram_url || "",
                tiktok_url: links.data[0].tiktok_url || "",
                youtube_url: links.data[0].youtube_url || "",
            });
        }
    }, [links]);

    useEffect(() => {
        if (flash.success) {
            setToast(flash.success);
            setTimeout(() => setToast(null), 3000);
        }
    }, [flash.success]);

    const openCreate = () => {
        reset();
        setEditData(null);
        setShowModal(true);
    };

    const openEdit = (link) => {
        setData({
            tokopedia_url: link.tokopedia_url || "",
            tiktokshop_url: link.tiktokshop_url || "",
            shopee_url: link.shopee_url || "",
            lazada_url: link.lazada_url || "",
            facebook_url: link.facebook_url || "",
            instagram_url: link.instagram_url || "",
            tiktok_url: link.tiktok_url || "",
            youtube_url: link.youtube_url || "",
        });
        setEditData(link);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData) {
            put(route('contact-social-link.update', editData.id), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        } else {
            post(route('contact-social-link.store'), {
                onSuccess: () => {
                    setShowModal(false);
                    reset();
                }
            });
        }
    };

    // const handleDelete = (id) => {
    //     if (confirm('Yakin ingin menghapus link ini?')) {
    //         destroy(route('contact-social-link.destroy', id), {
    //             preserveScroll: true,
    //         });
    //     }
    // };

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
                        <li className="inline-flex items-center text-gray-700 font-semibold ml-2">
                            Contact Social Links
                        </li>
                    </ol>
                </nav>
            }
        >
            <Head title="Contact Social Links" />
            {/* Toast */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-4 py-2 rounded shadow">
                    {toast}
                </div>
            )}
            <div className="bg-white shadow rounded p-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Daftar Social Link</h2>
                    {/* Tampilkan tombol tambah hanya jika belum ada data */}
                    {(!links.data || links.data.length === 0) && (
                        <button
                            onClick={openCreate}
                            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
                        >
                            Tambah Link
                        </button>
                    )}
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead>
                            <tr>
                                <th className="px-2 py-2 text-left">Tokopedia</th>
                                <th className="px-2 py-2 text-left">TiktokShop</th>
                                <th className="px-2 py-2 text-left">Shopee</th>
                                <th className="px-2 py-2 text-left">Lazada</th>
                                <th className="px-2 py-2 text-left">Facebook</th>
                                <th className="px-2 py-2 text-left">Instagram</th>
                                <th className="px-2 py-2 text-left">Tiktok</th>
                                <th className="px-2 py-2 text-left">Youtube</th>
                                <th className="px-2 py-2 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {links.data && links.data.length > 0 ? (
                                links.data.map(link => (
                                    <tr key={link.id}>
                                        <td className="px-2 py-2">{link.tokopedia_url && <a href={link.tokopedia_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Tokopedia</a>}</td>
                                        <td className="px-2 py-2">{link.tiktokshop_url && <a href={link.tiktokshop_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">TiktokShop</a>}</td>
                                        <td className="px-2 py-2">{link.shopee_url && <a href={link.shopee_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Shopee</a>}</td>
                                        <td className="px-2 py-2">{link.lazada_url && <a href={link.lazada_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Lazada</a>}</td>
                                        <td className="px-2 py-2">{link.facebook_url && <a href={link.facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Facebook</a>}</td>
                                        <td className="px-2 py-2">{link.instagram_url && <a href={link.instagram_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Instagram</a>}</td>
                                        <td className="px-2 py-2">{link.tiktok_url && <a href={link.tiktok_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Tiktok</a>}</td>
                                        <td className="px-2 py-2">{link.youtube_url && <a href={link.youtube_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Youtube</a>}</td>
                                        <td className="px-2 py-2 text-center">
                                            <button
                                                onClick={() => openEdit(link)}
                                                className="inline-flex items-center justify-center p-2 rounded-full text-yellow-400 transition"
                                                title="Edit"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 mr-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213l-4 1 1-4 12.362-12.726z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="text-center py-6 text-gray-400">Belum ada data.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {links.links && (
                    <div className="mt-4 flex justify-end gap-2">
                        {links.links.map((link, idx) => (
                            <Link
                                key={idx}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded ${link.active ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                disabled={!link.url}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>
                        <h3 className="text-lg font-bold mb-4">{editData ? "Edit Link" : "Tambah Link"}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {[
                                { label: "Tokopedia", name: "tokopedia_url" },
                                { label: "TiktokShop", name: "tiktokshop_url" },
                                { label: "Shopee", name: "shopee_url" },
                                { label: "Lazada", name: "lazada_url" },
                                { label: "Facebook", name: "facebook_url" },
                                { label: "Instagram", name: "instagram_url" },
                                { label: "Tiktok", name: "tiktok_url" },
                                { label: "Youtube", name: "youtube_url" },
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                                    <input
                                        type="url"
                                        className="mt-1 block w-full border-gray-300 rounded shadow-sm focus:ring-yellow-400 focus:border-yellow-400"
                                        value={data[field.name]}
                                        onChange={e => setData(field.name, e.target.value)}
                                        placeholder={`https://...`}
                                    />
                                    {errors[field.name] && (
                                        <div className="text-red-500 text-xs mt-1">{errors[field.name]}</div>
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    onClick={() => setShowModal(false)}
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-yellow-400 text-black font-semibold hover:bg-yellow-500"
                                    disabled={processing}
                                >
                                    {processing ? "Menyimpan..." : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}