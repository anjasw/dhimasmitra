import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react'; // pastikan import router

export default function ProductList({ products, limit, flash, search, brands, categories }) {
    console.log(products)
    console.log(brands)
    console.log(categories)
    const [statusFilter, setStatusFilter] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [showToast, setShowToast] = useState(!!(flash && (flash.success || flash.error)));
    const [toastMsg, setToastMsg] = useState(flash?.success || flash?.error || '');
    const [toastType, setToastType] = useState(flash?.success ? 'success' : (flash?.error ? 'error' : ''));
    const [fade, setFade] = useState(false);
    const [searchQuery, setSearchQuery] = useState(search || '');

    const brandOptions = brands?.map(brand => ({ value: brand.id, label: brand.name })) || [];
    const categoryOptions = categories?.map(category => ({ value: category.id, label: category.name })) || [];


    useEffect(() => {
        if (flash && (flash.success || flash.error)) {
            setToastMsg(flash.success || flash.error);
            setToastType(flash.success ? 'success' : 'error');
            setShowToast(true);
            setFade(false);
            const timer = setTimeout(() => setFade(true), 1800); // mulai fade setelah 1.8 detik
            const timer2 = setTimeout(() => setShowToast(false), 2000); // hilang setelah 2 detik
            return () => {
                clearTimeout(timer);
                clearTimeout(timer2);
            };
        }
    }, [flash]);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route(route().current()),
            { limit, search: searchQuery, status: statusFilter, author: authorFilter },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleChangeFilter = (filter, e) => {
        if (filter == 'status') {
            setStatusFilter(e.target.value)
            router.get(
                route(route().current()),
                { limit, search: searchQuery, status: e.target.value, author: authorFilter },
                { preserveState: true, preserveScroll: true }
            );
        }
        if (filter == 'author') {
            setAuthorFilter(e.target.value)
            router.get(
                route(route().current()),
                { limit, search: searchQuery, status: statusFilter, author: e.target.value },
                { preserveState: true, preserveScroll: true }
            );
        }

    }

    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    let number = products.from;
    // Handler saat select berubah
    const handleLimitChange = (e) => {
        router.get(
            route(route().current()), // tetap di route yang sama
            { limit: e.target.value }, // kirim parameter limit
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        router.delete(`product/${deleteId}`);
        setShowConfirm(false);
        setDeleteId(null);
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
                        <li className="inline-flex items-center text-gray-700 font-semibold ml-2">
                            Products
                        </li>
                    </ol>
                </nav>
            }
        >
            <Head title="List Data products" />

            <div className="pb-6 pt-3">
                <div className="max-w-12xl sm:px-0 lg:px-0">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">

                        <div className="p-3 sm:p-3 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
                            {/* Filter Brand */}
                            <div className="w-full sm:w-48">
                                <Select
                                    options={brandOptions}
                                    isClearable
                                    placeholder="Cari Brand..."
                                    value={brandOptions.find(opt => opt.value == statusFilter) || null}
                                    onChange={option => handleChangeFilter("status", { target: { value: option ? option.value : '' } })}
                                    classNamePrefix="react-select"
                                    menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                                    menuPosition="fixed"
                                    styles={{
                                        menuPortal: base => ({ ...base, zIndex: 9999 })
                                    }}
                                />
                            </div>
                            {/* Filter Category */}
                            <div className="w-full sm:w-48">
                                <Select
                                    options={categoryOptions}
                                    isClearable
                                    placeholder="Cari Category..."
                                    value={categoryOptions.find(opt => opt.value == authorFilter) || null}
                                    onChange={option => handleChangeFilter("author", { target: { value: option ? option.value : '' } })}
                                    classNamePrefix="react-select"
                                    menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                                    menuPosition="fixed"
                                    styles={{
                                        menuPortal: base => ({ ...base, zIndex: 9999 })
                                    }}
                                />
                            </div>
                            {/* Tombol Tambah Artikel */}
                            <Link
                                href={route('product.create')}
                                className="flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 bg-grey-600 rounded-lg shadow bg-orange-200 hover:bg-grey-500 active:bg-grey-700 transition mx-auto sm:mx-0"
                                title="Tulis Artikel"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-grey"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                            </Link>
                        </div>

                    </div>
                </div>
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
                <div className="max-w-12xl sm:px-0 lg:px-0 mt-6">
                    <div className="overflow-x-auto bg-white shadow-sm sm:rounded-lg p-2">
                        <div className="lg:p-6 sm:p-2 text-gray-900">
                            <div className="flex items-center justify-between mb-4 flex-row sm:flex-row">
                                <select
                                    name="limit"
                                    id="limit"
                                    value={limit || 10}
                                    onChange={handleLimitChange}
                                    className="w-16 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <form onSubmit={handleSearch} className="w-full sm:w-auto flex justify-end">
                                    <input
                                        type="text"
                                        name="search"
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        placeholder="Cari product..."
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
                            </div>
                            <div className="w-full overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">No</th>
                                            <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Product Name</th>
                                            {/* <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Category</th> */}
                                            {/* <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Brand</th> */}
                                            <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">SKU</th>
                                            <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Price</th>
                                            {/* <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Created At</th> */}
                                            <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                                            <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {products.data.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-2 py-2 whitespace-nowrap">{number++}</td>
                                                <td className="px-2 py-2 whitespace-nowrap">{product.product_name}</td>
                                                {/* <td className="px-2 py-2 whitespace-nowrap">{product.category_name}</td> */}
                                                {/* <td className="px-2 py-2 whitespace-nowrap">{product.brand_name}</td> */}
                                                <td className="px-2 py-2 whitespace-nowrap">{product.sku}</td>
                                                <td className="px-2 py-2 whitespace-nowrap">{product.price}</td>
                                                {/* <td className="px-2 py-2 whitespace-nowrap">
                                                    {new Date(product.created_at).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td> */}
                                                <td className="px-2 py-2 whitespace-nowrap">
                                                    {product.status === 0 && (
                                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded">
                                                            Inactive
                                                        </span>
                                                    )}
                                                    {product.status === 1 && (
                                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                                                            Active
                                                        </span>
                                                    )}
                                                    {product.status === 2 && (
                                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded">
                                                            Draft
                                                        </span>
                                                    )}
                                                    {product.status === 99 && (
                                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-red-200 text-gray-800 rounded">
                                                            Deleted
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap flex gap-2">
                                                    <Link
                                                        href={`product/${product.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-900 flex items-center"
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
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(product.id)}
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
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {showConfirm && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
                                        <div className="mb-4 text-center text-gray-800 font-semibold">
                                            Yakin ingin menghapus product ini?
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
                            <div className="px-6 py-4 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                                <div className="text-center sm:text-left text-gray-500 ">
                                    Showing {products.from} to {products.to} of {products.total} products
                                </div>
                                <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                                    {products.links.map((link, idx) =>
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

        </AuthenticatedLayout>
    );
}
