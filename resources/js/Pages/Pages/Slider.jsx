import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Slider({ sliders = [], flash }) {
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);

    // Tambahkan state untuk konfirmasi hapus
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [showToast, setShowToast] = useState(!!(flash && (flash.success || flash.error)));
    const [toastMsg, setToastMsg] = useState(flash?.success || flash?.error || '');
    const [toastType, setToastType] = useState(flash?.success ? 'success' : (flash?.error ? 'error' : ''));
    const [fade, setFade] = useState(false);

    const [showImageModal, setShowImageModal] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const openModal = (slider = null) => {
        setEditData(slider);
        setShowModal(true);
    };

    const closeModal = () => {
        setEditData(null);
        setShowModal(false);
        reset();
    };

    // Form state
    const { data, setData, post, put, processing, errors, reset } = useForm({
        title: '',
        subtitle: '',
        image: null,
        link: '',
        order: 0,
        is_active: true,
    });

    useEffect(() => {
        if (editData) {
            setData({
                title: editData.title || '',
                subtitle: editData.subtitle || '',
                image: null,
                link: editData.link || '',
                order: editData.order || 0,
                is_active: !!editData.is_active,
            });
        } else {
            reset();
        }

        if (flash && (flash.success || flash.error)) {
            setToastMsg(flash.success || flash.error);
            setToastType(flash.success ? 'success' : 'error');
            setShowToast(true);
            setFade(false);
            const timer = setTimeout(() => setFade(true), 1800);
            const timer2 = setTimeout(() => setShowToast(false), 2000);
            return () => {
                clearTimeout(timer);
                clearTimeout(timer2);
            };
        }
    }, [editData, flash]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editData) {
            post(route('pages.slider.update', editData.id), {
                onSuccess: closeModal,
            });
        } else {
            post(route('pages.slider.add'), {
                onSuccess: closeModal,
            });
        }
    };

    // Ubah handleDelete: buka modal konfirmasi
    const handleDelete = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    // Fungsi konfirmasi hapus
    const confirmDelete = () => {
        router.delete(route('pages.slider.delete', deleteId), {
            onSuccess: () => {
                setShowDeleteModal(false);
                setDeleteId(null);
            },
            onFinish: () => setDeleteId(null),
        });
    };

    const handleShowAdd = () => {
        openModal()
        setData({
            title: '',
            subtitle: '',
            image: null,
            link: '',
            order: null,
            is_active: true,
        });
    }

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
                            Slider
                        </li>
                    </ol>
                </nav>
            }
        >
            <Head title="Slider Management" />

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Slider List</h1>
                <button
                    onClick={handleShowAdd}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    + Tambah Slider
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 py-2 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">#</th>
                            <th className="px-3 py-2 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Gambar</th>
                            <th className="px-3 py-2 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Judul</th>
                            <th className="px-3 py-2 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Subjudul</th>
                            <th className="px-3 py-2 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Link</th>
                            <th className="px-3 py-2 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Urutan</th>
                            <th className="px-3 py-2 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                            <th className="px-3 py-2 font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sliders.map((slider, idx) => (
                            <tr key={slider.id} className="hover:bg-gray-50">
                                <td className="px-3 py-2 text-center">{idx + 1}</td>
                                <td className="px-3 py-2 text-center">
                                    <button
                                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs"
                                        onClick={() => {
                                            setImagePreview(`/storage/${slider.image}`);
                                            setShowImageModal(true);
                                        }}
                                    >
                                        Lihat Gambar
                                    </button>
                                </td>
                                <td className="px-3 py-2">{slider.title}</td>
                                <td className="px-3 py-2">{slider.subtitle}</td>
                                <td className="px-3 py-2">{slider.link}</td>
                                <td className="px-3 py-2 text-center">{slider.order}</td>
                                <td className="px-3 py-2 align-center">
                                    {slider.is_active ? (
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Aktif</span>
                                    ) : (
                                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">Nonaktif</span>
                                    )}
                                </td>
                                <td className="px-3 py-2 flex gap-2">
                                    <button
                                        onClick={() => openModal(slider)}
                                        className="px-2 py-1 text-blue-600 rounded hover:text-blue-700 text-xs"
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
                                    <button
                                        onClick={() => handleDelete(slider.id)}
                                        className="px-2 py-1 text-red-600 rounded hover:text-red-700 text-xs"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h10" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {sliders.length === 0 && (
                            <tr>
                                <td colSpan={8} className="text-center py-6 text-gray-400">Belum ada slider</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <h2 className="text-lg font-semibold mb-4">{editData ? 'Edit Slider' : 'Tambah Slider'}</h2>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <label className="block text-sm mb-1">Judul</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-red-500 text-xs">{errors.title}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm mb-1">Subjudul</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    value={data.subtitle}
                                    onChange={e => setData('subtitle', e.target.value)}
                                />
                                {errors.subtitle && <div className="text-red-500 text-xs">{errors.subtitle}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm mb-1">Gambar {editData && <span className="text-xs text-gray-400">(Kosongkan jika tidak ganti)</span>}</label>
                                <input
                                    type="file"
                                    className="w-full border rounded px-3 py-2"
                                    accept='image/*'
                                    onChange={e => setData('image', e.target.files[0])}
                                />
                                {errors.image && <div className="text-red-500 text-xs">{errors.image}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm mb-1">Link</label>
                                <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    value={data.link}
                                    onChange={e => setData('link', e.target.value)}
                                />
                                {errors.link && <div className="text-red-500 text-xs">{errors.link}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm mb-1">Urutan</label>
                                <input
                                    type="number"
                                    className="w-full border rounded px-3 py-2"
                                    value={data.order}
                                    onChange={e => setData('order', e.target.value)}
                                />
                                {errors.order && <div className="text-red-500 text-xs">{errors.order}</div>}
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm mb-1">Status</label>
                                <select
                                    className="w-full border rounded px-3 py-2"
                                    value={data.is_active ? 1 : 0}
                                    onChange={e => setData('is_active', e.target.value === "1")}
                                >
                                    <option value={1}>Aktif</option>
                                    <option value={0}>Nonaktif</option>
                                </select>
                                {errors.is_active && <div className="text-red-500 text-xs">{errors.is_active}</div>}
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    disabled={processing}
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Konfirmasi Hapus */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6 relative">
                        <h2 className="text-lg font-semibold mb-4 text-center">Konfirmasi Hapus</h2>
                        <p className="mb-6 text-center">Apakah Anda yakin ingin menghapus slider ini?</p>
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Batal
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Lihat Gambar */}
            {showImageModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-4 relative max-w-lg">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowImageModal(false)}
                        >
                            &times;
                        </button>
                        <img src={imagePreview} alt="Slider" className="max-w-full max-h-[60vh] rounded" />
                    </div>
                </div>
            )}

            {/* Toast */}
            {showToast && (
                <div
                    className={`fixed top-6 right-6 z-50 px-6 py-3 rounded shadow-lg transition-all duration-200
                        ${toastType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                        ${fade ? 'opacity-0' : 'opacity-100'}
                    `}
                >
                    {toastMsg}
                </div>
            )}
        </AuthenticatedLayout>
    );
}