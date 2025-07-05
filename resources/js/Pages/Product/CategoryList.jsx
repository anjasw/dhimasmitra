import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function CategoryList({ categories, flash, search: initialSearch = '', limit: initialLimit = 10 }) {
    console.log(categories)
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const [searchQuery, setSearchQuery] = useState(initialSearch);
    const [limit, setLimit] = useState(initialLimit);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
    const [form, setForm] = useState({ name: '', slug: '', status: 1, id: null, image: null });
    const [errors, setErrors] = useState({});
    const [showToast, setShowToast] = useState(!!(flash && (flash.success || flash.error)));
    const [toastMsg, setToastMsg] = useState(flash?.success || flash?.error || '');
    const [toastType, setToastType] = useState(flash?.success ? 'success' : (flash?.error ? 'error' : ''));
    const [fade, setFade] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [oldImage, setOldImage] = useState(null);

    useEffect(() => {
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
    }, [flash]);

    const slugify = (text) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('category.index'), { search: searchQuery, limit }, { preserveState: true, preserveScroll: true });
    };

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
        router.get(route('category.index'), { search: searchQuery, limit: e.target.value }, { preserveState: true, preserveScroll: true });
    };

    let number = (categories.current_page - 1) * categories.per_page + 1;

    const openAddModal = () => {
        setForm({ name: '', slug: '', status: 1, id: null, image: null });
        setModalType('add');
        setErrors({});
        setShowModal(true);
        setOldImage(null); // simpan path lama untuk preview
    };

    const openEditModal = (category) => {
        setForm({
            name: category.name,
            slug: category.slug,
            status: category.status,
            id: category.id,
            image: null,
        });
        // console.log(category.image)
        setModalType('edit');
        setErrors({});
        setShowModal(true);
        setOldImage(category.image || null); // simpan path lama untuk preview

    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => {
            if (name === 'name') {
                return { ...prev, name: value, slug: slugify(value) };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        if (modalType === 'add') {
            router.post(route('category.store'), form, {
                onSuccess: () => {
                    setShowModal(false);
                    setOldImage(null);
                },
                onError: (err) => setErrors(err),
                forceFormData: true,
            });
            
        } else {
            router.post(route('category.update', form.id), form, {
                onSuccess: () => {
                    setShowModal(false);
                    setOldImage(null);
                },
                onError: (err) => setErrors(err),
                forceFormData: true,
            });
        }
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        router.put(route('category.delete', deleteId), { status: 2 }, {
            preserveScroll: true,
            onSuccess: () => {
                setShowConfirm(false);
                setDeleteId(null);
            }
        });
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setDeleteId(null);
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
                            My Shop
                        </li>
                        <li>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </li>
                        <li className="inline-flex items-center text-gray-700 font-semibold ml-2">
                            Categories
                        </li>
                        
                    </ol>
                </nav>
            }
        >
            <Head title="List of Categories" />

            <div className="pb-6 pt-3">
                <div className="max-w-12xl sm:px-0 lg:px-0">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-3 sm:p-3 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                            <form onSubmit={handleSearch} className="flex w-full sm:w-auto gap-2">
                                <input
                                    type="text"
                                    name="search"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Cari kategori..."
                                    className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition w-full sm:w-64"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
                                    title="Cari"
                                >
                                    Cari
                                </button>
                            </form>
                            <select
                                name="limit"
                                id="limit"
                                value={limit}
                                onChange={handleLimitChange}
                                className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <button
                                onClick={openAddModal}
                                className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 bg-orange-200 rounded-lg shadow hover:bg-orange-300 active:bg-orange-400 transition mx-auto sm:mx-0"
                                title="Tambah Kategori"
                                type="button"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="max-w-12xl sm:px-0 lg:px-0 mt-6">
                    <div className="overflow-x-auto bg-white shadow-sm sm:rounded-lg p-2">
                        <div className="lg:p-6 sm:p-2 text-gray-900">
                            <div className="w-full overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">No</th>
                                            <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Nama Kategori</th>
                                            <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Gambar</th>
                                            <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                                            <th className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {categories.data.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="text-center py-4 text-gray-500">Tidak ada data kategori</td>
                                            </tr>
                                        )}
                                        {categories.data.map((category, idx) => (
                                            <tr key={category.id} className="hover:bg-gray-50">
                                                <td className="px-2 py-2 whitespace-nowrap">{number++}</td>
                                                <td className="px-2 py-2 whitespace-nowrap">{category.name}</td>
                                                <td className="px-2 py-2 whitespace-nowrap">
                                                    {category.image ? (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setImageUrl(`/storage/${category.image}`);
                                                                setShowImageModal(true);
                                                            }}
                                                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs"
                                                        >
                                                            Lihat Gambar
                                                        </button>
                                                    ) : (
                                                        <span className="text-gray-400 text-xs">Tidak ada</span>
                                                    )}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap">
                                                    {category.status === 1 ? (
                                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                                                            Aktif
                                                        </span>
                                                    ) : (
                                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded">
                                                            Tidak Aktif
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap flex gap-2">
                                                    <button
                                                        onClick={() => openEditModal(category)}
                                                        className="text-blue-600 hover:text-blue-900 flex items-center"
                                                        title="Edit"
                                                        type="button"
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
                                                        type="button"
                                                        onClick={() => handleDelete(category.id)}
                                                        className="text-red-600 hover:text-red-800 flex items-center"
                                                        title="Delete"
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
                                                    <Link
                                                        href={route('sub_category.list', category.id)}
                                                        className="text-green-600 hover:text-green-900 flex items-center"
                                                        title="Detail Sub Category"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5 mr-1"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                        Detail
                                                    </Link>
                                                   
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="px-6 py-4 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                                <div className="text-center sm:text-left text-gray-500 ">
                                    Menampilkan {categories.from} sampai {categories.to} dari {categories.total} kategori
                                </div>
                                <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                                    {categories.links.map((link, idx) =>
                                        link.url ? (
                                            <Link
                                                key={idx}
                                                href={link.url}
                                                className={`px-3 py-1 rounded text-xs sm:text-sm transition
                                                    ${link.active
                                                        ? 'bg-blue-600 text-white border border-blue-600'
                                                        : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 rounded bg-white text-gray-400 border border-gray-200 pointer-events-none text-xs sm:text-sm"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showImageModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full flex flex-col items-center">
                        <img src={imageUrl} alt="Brand" className="max-h-[70vh] object-contain mb-4 w-full" />
                        <button
                            onClick={() => setShowImageModal(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
            {/* Modal Tambah/Edit */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">
                            {modalType === 'add' ? 'Tambah Kategori' : 'Edit Kategori'}
                        </h3>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category Image<span className="text-red-400">*</span></label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={e => setForm(prev => ({ ...prev, image: e.target.files[0] }))}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                                {oldImage && !form.image && (
                                    <img src={`/storage/${oldImage}`} alt="Logo" className="h-16 mt-2" />
                                )}
                                {form.image && typeof form.image !== 'string' && (
                                    <img src={URL.createObjectURL(form.image)} alt="Logo" className="h-16 mt-2" />
                                )}
                                {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}

                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kategori<span className="text-red-400">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleFormChange}
                                    required
                                    className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                />
                                {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Slug<span className="text-red-400">*</span></label>
                                <input
                                    type="text"
                                    name="slug"
                                    value={form.slug}
                                    onChange={handleFormChange}
                                    className={`w-full border ${errors.slug ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none`}
                                    readOnly
                                />
                                {errors.slug && <div className="text-red-500 text-xs mt-1">{errors.slug}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status<span className="text-red-400">*</span></label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleFormChange}
                                    className={`w-full border ${errors.status ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                                >
                                    <option value={1}>Aktif</option>
                                    <option value={0}>Tidak Aktif</option>
                                </select>
                                {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Konfirmasi Hapus */}
            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
                        <div className="mb-4 text-center text-gray-800 font-semibold">
                            Yakin ingin menghapus kategori ini?
                        </div>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Hapus
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                Batal
                            </button>
                        </div>
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