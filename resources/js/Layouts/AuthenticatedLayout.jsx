import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState,useEffect } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    
    const user = usePage().props.auth.user;
    const [showSidebar, setShowSidebar] = useState(false);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     // Simulasi loading pada saat halaman pertama kali di-mount
    //     setTimeout(function(){
    //         setLoading(false)
    //     }, 2000)
    // }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
                    <div className="flex flex-col items-center gap-2">
                        <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        <span className="text-blue-600 font-semibold">Loading...</span>
                    </div>
                </div>
            )} */}
            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transition-transform duration-200
                flex flex-col
                ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
                sm:translate-x-0 sm:fixed sm:static sm:w-64
            `}>
                <div className="flex items-center justify-between px-4 py-4 border-b">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-full !w-full fill-current text-gray-800" />
                    </Link>
                    <button
                        className="sm:hidden text-gray-500"
                        onClick={() => setShowSidebar(false)}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="flex-1 px-4 py-6 flex flex-col gap-3">
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded transition
                            ${isActive ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'}
                            `
                        }
                        style={{ textDecoration: 'none' }}
                    >
                        {/* Heroicons: Home */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
                        </svg>
                        Dashboard
                    </NavLink>
                    <NavLink
                        href={route('post.index')}
                        active={route().current('post.index') || route().current('post.create') || route().current('post.edit')}
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 rounded transition
                            ${isActive ? 'bg-gray-100 text-gray-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'}
                            `
                        }
                        style={{ textDecoration: 'none' }}
                    >
                        {/* Heroicons: DocumentText */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
                        </svg>
                        Posts
                    </NavLink>
                </nav>
                <div className="mt-auto border-t px-4 py-4">
                    <div className="font-semibold text-gray-800 text-center">{user.name}</div>
                    <div className="text-sm text-gray-500 text-center">{user.email}</div>
                    <div className="mt-3 flex justify-center gap-2">
                        <NavLink href={route('profile.edit')} className="flex-1 text-center">
                            Profile
                        </NavLink>
                        <NavLink method="post" href={route('logout')} as="button" className="flex-1 text-center">
                            Log Out
                        </NavLink>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {showSidebar && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-40 sm:hidden"
                    onClick={() => setShowSidebar(false)}
                />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen overflow-x-auto sm:ml-64">
                {/* Topbar */}
                <nav className="bg-white border-b px-4 py-3 flex items-center sm:hidden">
                    <button
                        className="text-gray-500 mr-3"
                        onClick={() => setShowSidebar(true)}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    {/* <span className="font-semibold text-lg text-gray-800">Menu</span> */}
                </nav>
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}
                <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4">
                    {children}
                </main>
            </div>
        </div>
    );
}