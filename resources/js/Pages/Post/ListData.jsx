import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react'; // pastikan import router

export default function ListData({ posts, limit, flash, search }) {
    console.log(posts)
    console.log(limit)
    console.log(flash)
    const [showToast, setShowToast] = useState(!!(flash && (flash.success || flash.error)));
    const [toastMsg, setToastMsg] = useState(flash?.success || flash?.error || '');
    const [toastType, setToastType] = useState(flash?.success ? 'success' : (flash?.error ? 'error' : ''));
    const [fade, setFade] = useState(false);
    const [searchQuery, setSearchQuery] = useState(search || '');


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
            { limit, search: searchQuery },
            { preserveState: true, preserveScroll: true }
        );
    };
    
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    let number = posts.from;
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
        router.delete(`post/${deleteId}`);
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
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    List of Posts
                </h2>
            }
        >
            <Head title="List Data Posts" />

            <div className="pb-12 pt-6">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        
                        {/* tombol tambah */}
                        <div className="p-6 flex">
                            <Link
                                href={route('post.create')}
                                className="flex items-center justify-center w-16 h-16 bg-grey-600 rounded-lg shadow bg-orange-200 hover:bg-grey-500 active:bg-grey-700 transition"
                                title="Tulis Artikel"
                            >
                                {/* Heroicons: DocumentText (Article) */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-grey"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-6">
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
                                        placeholder="Cari artikel..."
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
                                            <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Title</th>
                                            <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Author</th>
                                            <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Created At</th>
                                            <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                                            <th scope="col" className="px-2 py-3 text-left font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {posts.data.map((post) => (
                                            <tr key={post.id} className="hover:bg-gray-50">
                                                <td className="px-2 py-2 whitespace-nowrap">{number++}</td>
                                                <td className="px-2 py-2 whitespace-nowrap">{post.title}</td>
                                                <td className="px-2 py-2 whitespace-nowrap">{post.user_name}</td>
                                                <td className="px-2 py-2 whitespace-nowrap">
                                                    {new Date(post.created_at).toLocaleDateString('id-ID', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap">
                                                    {post.status === 'published' && (
                                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded">
                                                            Published
                                                        </span>
                                                    )}
                                                    {post.status === 'draft' && (
                                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded">
                                                            Draft
                                                        </span>
                                                    )}
                                                    {post.status === 'archived' && (
                                                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded">
                                                            Archived
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-2 py-2 whitespace-nowrap flex gap-2">
                                                    <Link
                                                        href={`post/${post.id}/edit`}
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
                                                        onClick={() => handleDelete(post.id)}
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
                                            Yakin ingin menghapus post ini?
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
                                <div className="text-center sm:text-left">
                                    Showing {posts.from} to {posts.to} of {posts.total} posts
                                </div>
                                <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                                    {posts.links.map((link, idx) =>
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
