import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState,useEffect, useRef } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const [showProductDropdown, setShowProductDropdown] = useState(false);
    const [showPagesDropdown, setShowPagesDropdown] = useState(false);
    
    const productMenuRef = useRef(null);

    console.log(productMenuRef)

    const [showNotifDropdown, setShowNotifDropdown] = useState(false);
    const notifRef = useRef(null);

    const user = usePage().props.auth.user;
    const [showSidebar, setShowSidebar] = useState(false);
    
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const profileRef = useRef(null);

    // Close dropdown jika klik di luar
    useEffect(() => {
        console.log(showProductDropdown,"showProductDropdown")
        if(
            route().current('product.index') ||
            route().current('product.create') ||
            route().current('brand.index') ||
            route().current('category.index') ||
            route().current('sub_category.list')
        ){
            setShowProductDropdown(true)
        }else{
            setShowProductDropdown(false)
        }

        if(
            route().current('pages.about') ||
            route().current('pages.contact') ||
            route().current('pages.slider')
        ){
            setShowPagesDropdown(true)
        }else{
            setShowPagesDropdown(false)
        }
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfileDropdown(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifDropdown(false);
            }

            // if (productMenuRef.current && !productMenuRef.current.contains(event.target)) {
            //     setShowProductDropdown(false);
            // }
            
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const notifProducts = [
        {
            id: 1,
            name: 'Anjas Wicaksana',
            product: 'Gayung',
            image: '/storage/thumbnails/0TvAJqk1ZIizOzEiZffBZRpOfdxdnWwJlm7rb2p6.png',
            qty: 2,
        },
        {
            id: 2,
            name: 'Kiyotaka Mori',
            product: 'Ember',
            image: '/storage/thumbnails/0TvAJqk1ZIizOzEiZffBZRpOfdxdnWwJlm7rb2p6.png',
            qty: 1,
        },
        {
            id: 3,
            name: 'Widyo Santoso',
            product: 'Sikat Gigi',
            image: '/storage/thumbnails/0TvAJqk1ZIizOzEiZffBZRpOfdxdnWwJlm7rb2p6.png',
            qty: 4,
        },
    ];

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
                <div className="flex items-center justify-between px-4 py-4 border-b" style={{ height: "80px" }}>
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-full !w-full fill-current text-gray-800" />
                    </Link>
                    {/* <button
                        className="sm:hidden text-gray-500"
                        onClick={() => setShowSidebar(false)}
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button> */}
                </div>
                <nav className="flex-1 px-4 py-6 flex flex-col gap-3">
                    <ul className="flex flex-col gap-3">
                        <li
                            className={`flex items-center gap-2 px-3 py-2 rounded transition relative text-sm
                                ${route().current('dashboard')
                                    ? 'bg-gray-100 text-gray-900 font-semibold'
                                    : 'text-gray-500 hover:bg-gray-50'}
                            `}
                            style={{ textDecoration: 'none' }}
                        >
                            <NavLink
                                href={route('dashboard')}
                                className={`no-underline hover:no-underline flex items-center gap-2 w-full text-sm
                                    ${(route().current('dashboard'))
                                            ? 'bg-gray-100 text-gray-900 font-semibold'
                                            : 'text-gray-500 hover:bg-gray-50'}
                                `}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 
                                    ${(route().current('dashboard'))
                                        ? 'text-gray-700'
                                        : 'text-gray-500'}    
                                `} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
                                </svg>
                                Dashboard
                            </NavLink>
                        </li>
                        {/* Posts */}
                        <li
                            className={`flex items-center gap-2 px-3 py-2 rounded transition relative text-sm
                                ${(route().current('post.index') || route().current('post.create') || route().current('post.edit'))
                                    ? 'bg-gray-100 text-gray-900 font-semibold'
                                    : 'text-gray-500 hover:bg-gray-50'}
                            `}
                            style={{ textDecoration: 'none' }}
                        >
                            <NavLink
                                href={route('post.index')}
                                className={` no-underline hover:no-underline flex items-center gap-2 w-full text-sm
                                    ${(route().current('post.index') || route().current('post.create') || route().current('post.edit'))
                                        ? 'bg-gray-100 text-gray-900 font-semibold'
                                        : 'text-gray-500 hover:bg-gray-50'}
    `}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 
                                    ${(route().current('post.index') || route().current('post.create') || route().current('post.edit'))
                                        ? 'text-gray-700'
                                        : 'text-gray-500'}
                                `} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8H6a2 2 0 01-2-2V6a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
                                </svg>
                                Posts
                            </NavLink>
                        </li>
                        {/* Product Dropdown */}
                        <li
                            ref={productMenuRef}
                            className={`flex flex-col relative text-sm
                                ${showProductDropdown ? 'z-20' : ''}
                            `}
                            style={{ textDecoration: 'none' }}
                        >
                            <button
                                type="button"
                                className={`flex items-center gap-2 px-4 py-2 rounded transition w-full text-left text-sm
                                    ${
                                        route().current('product.index') || 
                                        route().current('product.create') || 
                                        route().current('brand.index') || 
                                        route().current('category.index') ||
                                        route().current('sub_category.list') 
                                        ? 'bg-gray-100 text-gray-900 font-semibold'
                                        : 'text-gray-500 hover:bg-gray-50'}
                                `}
                                onClick={() => setShowProductDropdown((v) => !v)}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-500
                                    ${
                                        route().current('product.index') || 
                                        route().current('product.create') || 
                                        route().current('brand.index') || 
                                        route().current('category.index') ||
                                        route().current('sub_category.list') 
                                        ? 'text-gray-700'
                                        : 'text-gray-500'}
                                `} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0v6a8 8 0 11-16 0V7m16 0L12 11M4 7l8 4" />
                                </svg>
                                My Shop
                                <svg className={`ml-auto h-4 w-4 text-gray-400 transition-transform duration-200 ${showProductDropdown ? 'rotate-180 text-gray-00' : 'group-hover:text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                className={`
                                    w-full
                                    transition-all duration-200
                                    ${showProductDropdown ? 'max-h-60 opacity-100 visible mt-1' : 'max-h-0 opacity-0 invisible'}
                                    overflow-hidden
                                `}
                            >
                                <ul className="flex flex-col gap-1 py-0">
                                    <li
                                        className={`block pl-10 py-2 text-sm rounded no-underline
                                            ${route().current('brand.index')
                                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'}
                                        `}
                                    >
                                        <NavLink
                                            href={route('brand.index')}
                                            className=" no-underline block w-full"
                                        >
                                            Brands
                                        </NavLink>
                                    </li>
                                    <li
                                        className={`block pl-10 py-2 text-sm rounded no-underline
                                            ${(
                                                route().current('category.index') ||
                                                route().current('sub_category.list')
                                            )
                                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'}
                                        `}
                                    >
                                        <NavLink
                                            href={route('category.index')}
                                            className=" no-underline block w-full"
                                        >
                                            Categories
                                        </NavLink>
                                    </li>
                                    <li
                                        className={`block pl-10 py-2 text-sm rounded no-underline
                                            ${(
                                                route().current('product.index') ||
                                                route().current('product.create') || 
                                                route().current('product.edit') 

                                            )
                                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'}
                                        `}
                                    >
                                        <NavLink
                                            href={route('product.index')}
                                            className=" no-underline block w-full"
                                        >
                                            List Products
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        {/* Order */}
                        <li
                            className={`flex items-center gap-2 px-3 py-2 rounded transition relative text-sm
                                ${route().current('orders')
                                    ? 'bg-gray-100 text-gray-900 font-semibold'
                                    : 'text-gray-500 hover:bg-gray-100'}
                            `}
                            style={{ textDecoration: 'none' }}
                        >
                            <NavLink
                                href={route('orders')}
                                className={` no-underline hover:no-underline flex items-center gap-2 w-full text-sm
                                    ${route().current('orders')
                                        ? 'bg-gray-100 text-gray-900 font-semibold'
                                        : 'text-gray-500 hover:bg-gray-100'}
                                `}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 
                                    ${(route().current('orders'))
                                        ? 'text-gray-700'
                                        : 'text-gray-500'}
                                `} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007 17h10a1 1 0 00.95-.68L21 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
                                </svg>
                                Orders
                            </NavLink>
                        </li>
                        <li
                            ref={productMenuRef}
                            className={`flex flex-col relative text-sm
                                ${showPagesDropdown ? 'z-20' : ''}
                            `}
                            style={{ textDecoration: 'none' }}
                        >
                            <button
                                type="button"
                                className={`flex items-center gap-2 px-4 py-2 rounded transition w-full text-left text-sm
                                    ${
                                        route().current('pages.about') || 
                                        route().current('pages.contact') ||
                                        route().current('pages.slider')
                                        ? 'bg-gray-100 text-gray-900 font-semibold'
                                        : 'text-gray-500 hover:bg-gray-50'}
                                `}
                                onClick={() => setShowPagesDropdown((v) => !v)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5
                                        ${route().current('pages.about') || route().current('pages.contact') || route().current('pages.slider') ? 'text-gray-700' : 'text-gray-500'}
                                `} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7V3a1 1 0 011-1h8a1 1 0 011 1v18a1 1 0 01-1 1H8a1 1 0 01-1-1v-4" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h8M7 11h8M7 15h4" />
                                </svg>
                                Pages
                                <svg className={`ml-auto h-4 w-4 text-gray-400 transition-transform duration-200 ${showPagesDropdown ? 'rotate-180 text-gray-00' : 'group-hover:text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div
                                className={`
                                    w-full
                                    transition-all duration-200
                                    ${showPagesDropdown ? 'max-h-60 opacity-100 visible mt-1' : 'max-h-0 opacity-0 invisible'}
                                    overflow-hidden
                                `}
                            >
                                <ul className="flex flex-col gap-1 py-0">
                                    <li
                                        className={`block pl-10 py-2 text-sm rounded no-underline
                                            ${route().current('pages.slider')
                                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'}
                                        `}
                                    >
                                        <NavLink
                                            href={route('pages.slider')}
                                            className=" no-underline block w-full"
                                        >
                                            Slider
                                        </NavLink>
                                    </li>
                                    <li
                                        className={`block pl-10 py-2 text-sm rounded no-underline
                                            ${route().current('pages.about')
                                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'}
                                        `}
                                    >
                                        <NavLink
                                            href={route('pages.about')}
                                            className=" no-underline block w-full"
                                        >
                                            About
                                        </NavLink>
                                    </li>
                                    <li
                                        className={`block pl-10 py-2 text-sm rounded no-underline
                                            ${route().current('pages.contact')
                                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'}
                                        `}
                                    >
                                        <NavLink
                                            href={route('pages.contact')}
                                            className=" no-underline block w-full"
                                        >
                                            Contact
                                        </NavLink>
                                    </li>
                                    {/* <li
                                        className={`block pl-10 py-2 text-sm rounded no-underline
                                            ${(
                                                route().current('category.index') ||
                                                route().current('sub_category.list')
                                            )
                                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'}
                                        `}
                                    >
                                        <NavLink
                                            href={route('category.index')}
                                            className="no-underline block w-full"
                                        >
                                            Categories
                                        </NavLink>
                                    </li>
                                    <li
                                        className={`block pl-10 py-2 text-sm rounded no-underline
                                            ${(
                                                route().current('product.index') ||
                                                route().current('product.create') || 
                                                route().current('product.edit') 

                                            )
                                                ? 'bg-blue-50 text-blue-700 font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'}
                                        `}
                                    >
                                        <NavLink
                                            href={route('product.index')}
                                            className="no-underline block w-full"
                                        >
                                            List Products
                                        </NavLink>
                                    </li> */}
                                </ul>
                            </div>
                        </li>
                        {/* ...menu lain... */}
                        <li
                            className={`flex items-center gap-2 px-3 py-2 rounded transition relative text-sm
                                ${route().current('reporting.index')
                                    ? 'bg-gray-100 text-gray-900 font-semibold'
                                    : 'text-gray-500 hover:bg-gray-100'}
                            `}
                            style={{ textDecoration: 'none' }}
                        >
                            <NavLink
                                href={route('reporting.index')}
                                className={` no-underline hover:no-underline flex items-center gap-2 w-full text-sm
                                    ${route().current('reporting.index')
                                        ? 'bg-gray-100 text-gray-900 font-semibold'
                                        : 'text-gray-500 hover:bg-gray-100'}
                                `}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 
                                    ${route().current('reporting.index') ? 'text-gray-700' : 'text-gray-500'}
                                `} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h-1V4a1 1 0 00-2 0v3H9a1 1 0 000 2h6a1 1 0 000-2z" />
                                </svg>
                                Reporting
                            </NavLink>
                        </li>
                    </ul>
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
                <nav className="bg-white border-b px-4 py-3 flex items-center justify-between" style={{ height: 80 }}>
                    <div className="flex items-center">
                        <button
                            className="text-gray-500 mr-3 sm:hidden"
                            onClick={() => setShowSidebar(true)}
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        {/* <span className="font-semibold text-lg text-gray-800">Menu</span> */}
                    </div>
                    <div className="flex items-center gap-8">
                        {/* Notifikasi */}
                        <div className="relative" ref={notifRef}>
                            <button
                                className="relative focus:outline-none"
                                onClick={() => setShowNotifDropdown((v) => !v)}
                            >
                                <svg className="h-7 w-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                                    {notifProducts.length}
                                </span>
                            </button>
                            <div
                                className={`
                                    absolute right-0 w-80 bg-white rounded shadow-lg py-2 z-50 border mt-2
                                    transition-all duration-200
                                    ${showNotifDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
                                `}
                                style={{ top: '49px' }}
                            >
                                <div className="px-4 py-2 text-gray-800 font-semibold border-b flex items-center justify-between">
                                    <span>
                                        Notifikasi
                                    </span>
                                    <button
                                        className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-blue-200 transition"
                                        onClick={() => {/* aksi mark as read di sini */}}
                                        type="button"
                                    >
                                        Mark as Read
                                    </button>
                                </div>
                                {notifProducts.length === 0 && (
                                    <div className="px-4 py-4 text-gray-500 text-center text-sm">Tidak ada notifikasi</div>
                                )}
                                {notifProducts.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-10 h-10 rounded object-cover border"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-800">{item.name}</div>
                                            <div className="text-xs text-gray-500">Berhasil membeli {item.product} sebanyak {item.qty}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Profile */}
                        <div className="relative" ref={profileRef}>
                            <button
                                className="focus:outline-none"
                                onClick={() => setShowProfileDropdown((v) => !v)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-20 w-10 object-cover  text-gray-400 "
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.001 9.001 0 0112 15c2.21 0 4.21.805 5.879 2.146M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <div
                                className={`
                                    absolute right-0 w-44 bg-white rounded shadow-lg py-2 z-50 border
                                    transition-all duration-200
                                    ${showProfileDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
                                `}
                                style={{ top: '83px' }} // sejajar bawah topbar
                            >
                                <div className="px-4 py-2 text-gray-800 font-semibold border-b">{user.name}</div>
                                <Link
                                    href={route('profile.edit')}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Profile
                                </Link>
                                <NavLink
                                    method="post"
                                    href={route('logout')}
                                    as="button"
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Log Out
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
                {header && (
                    <header className="bg-white shadow" style={{ height: 65 }}>
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