import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function FormEdit({posts}) {
    const { data, setData, post, processing, errors } = useForm({
        title: posts.title,
        content: posts.content,
        thumbnail: null, // <--- harus null, bukan string path
        meta_description: posts.meta_description,
        slug: posts.slug,
        tags: posts.tags,
        status: posts.status ,
        language: posts.language ,
    });
    const [preview, setPreview] = useState(posts.thumbnail ? `/storage/${posts.thumbnail}` : null);

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setData('thumbnail', file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
            // setData('thumbnail', file);
            console.log(data)
        } else {
            setPreview(posts.thumbnail ? `/storage/${posts.thumbnail}` : null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)

        post(route('post.update', posts.id));
        // post(route('post.update', posts.id), { forceFormData: true });
    };

    const generateSlug = (e) => {
        const title = e.target.value;
        const slug = title
            .toLowerCase()
            .replace(/&/g, ' dan ') // Ganti & dengan " dan "
            .replace(/[^a-z0-9\s-]/g, '') // Hapus karakter non-alfanumerik kecuali spasi dan tanda hubung
            .trim()
            .replace(/\s+/g, '-') // Ganti spasi dengan tanda hubung
            .substring(0, 255); // Batasi panjang slug maksimal 255 karakter
        setData('slug', slug);
        setData('title', title);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Form Create Posts
                </h2>
            }
        >
            <Head title="Form Create Posts" />

            <div className="pt-6 pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-8">
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Kiri */}
                                <div className="space-y-4 col-span-1">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            value={data.title}
                                            onChange={generateSlug}
                                        />
                                        {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title}</div>}
                                    </div>
                                    {/* upload thumbnail */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 block w-full rounded border-gray-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            onChange={handleThumbnailChange}
                                        />
                                        {preview && (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="mt-2 rounded shadow max-h-40 object-contain border"
                                            />
                                        )}
                                        {errors.thumbnail && <div className="text-red-500 text-xs mt-1">{errors.thumbnail}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            value={data.meta_description}
                                            onChange={e => setData('meta_description', e.target.value)}
                                        />
                                        {errors.meta_description && <div className="text-red-500 text-xs mt-1">{errors.meta_description}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            value={data.slug}
                                            onChange={e => setData('slug', e.target.value)}
                                        />
                                        {errors.slug && <div className="text-red-500 text-xs mt-1">{errors.slug}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tags (pisahkan dengan koma)</label>
                                        <input
                                            type="text"
                                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            value={data.tags}
                                            onChange={e => setData('tags', e.target.value)}
                                        />
                                        {errors.tags && <div className="text-red-500 text-xs mt-1">{errors.tags}</div>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Status</label>
                                        <select
                                            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                            value={data.status}
                                            onChange={e => setData('status', e.target.value)}
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                        {errors.status && <div className="text-red-500 text-xs mt-1">{errors.status}</div>}
                                    </div>
                                    <div className="hidden md:flex items-center justify-between pt-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 disabled:opacity-25 transition"
                                        >
                                            Simpan
                                        </button>
                                        <Link href={route('post.index')} className="text-gray-600 hover:text-blue-600 text-sm">Kembali</Link>
                                    </div>
                                </div>
                                {/* Kanan */}
                                <div className="col-span-1 md:col-span-2 flex flex-col">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                    <ReactQuill
                                        theme="snow"
                                        value={data.content}
                                        onChange={value => setData('content', value)}
                                        className="bg-white flex-1 mb-12"
                                        style={{ minHeight: 350, height: '100%' }}
                                        modules={{
                                            toolbar: [
                                                [{ header: [1, 2, false] }],
                                                ['bold', 'italic', 'underline', 'strike'],
                                                [{ list: 'ordered' }, { list: 'bullet' }],
                                                ['link', 'image'],
                                                ['clean'],
                                            ],
                                        }}
                                        formats={[
                                            'header', 'bold', 'italic', 'underline', 'strike',
                                            'list', 'bullet', 'link', 'image'
                                        ]}
                                    />
                                    {errors.content && <div className="text-red-500 text-xs mt-1">{errors.content}</div>}
                                </div>
                            </div>
                            <div className="flex flex-col-reverse gap-2 pt-6 md:hidden">
                                <Link
                                    href={route('post.index')}
                                    className="text-gray-600 hover:text-blue-600 text-sm text-center"
                                >
                                    Kembali
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-500 active:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 disabled:opacity-25 transition"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
