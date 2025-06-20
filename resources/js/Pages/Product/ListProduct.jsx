import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react'; // pastikan import router

export default function ListProduct({ posts, limit, flash }) {
    console.log(posts)
    console.log(flash)
    let number = posts.from;
    // Handler saat select berubah
    const handleLimitChange = (e) => {
        router.get(
            route(route().current()), // tetap di route yang sama
            { limit: e.target.value }, // kirim parameter limit
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Posts
                </h2>
            }
        >
            <Head title="List Data Posts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            List of Posts
                        </div>
                        {/* tombol tambah */}
                        <div className="p-6 flex">
                            <Link
                                href={route('post.create')}
                                className="flex items-center justify-center w-16 h-16 bg-grey-600 rounded-lg shadow hover:bg-grey-500 active:bg-grey-700 transition"
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
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-6">
                    
                    <div className="overflow-scroll bg-white shadow-sm sm:rounded-lg p-2">
                        <div className="p-6 text-gray-900">
                            <select
                                name="limit"
                                id="limit"
                                value={limit || 10}
                                onChange={handleLimitChange}
                                className="w-16 mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            No
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created At
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text -xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {
                                    // number = 1
                                    posts.data.map((post) => (
                                        <tr key={post.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {number++}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {post.title}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {new Date(post.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link href={`post/${post.id}/edit`} className="text-blue-600 hover:text-blue-900">Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="px-6 py-4 flex justify-between items-center">
                                <div>
                                    Showing {posts.from} to {posts.to} of {posts.total} posts
                                </div>
                                <div className="flex space-x-1">
                                    {posts.links.map((link, idx) => (
                                        link.url ? (
                                            <Link
                                                key={idx}
                                                href={link.url}
                                                className={`px-3 py-1 rounded ${link.active ? 'bg-blue-600 text-white border border-blue-600' : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'} `}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ) : (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 rounded bg-white text-gray-400 border border-gray-200 pointer-events-none"
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
