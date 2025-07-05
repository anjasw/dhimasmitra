import { Link } from "@inertiajs/react";

export default function Breadcrumb({ items }) {
    if (!items || items.length === 0) {
        const pathSegments = window.location.pathname
            .split("/")
            .filter(Boolean);

        items = pathSegments.map((seg, idx) => ({
            label: decodeURIComponent(
                seg.charAt(0).toUpperCase() + seg.slice(1)
            ),
            href: "/" + pathSegments.slice(0, idx + 1).join("/"),
        }));

        items.unshift({ label: "Home", href: "/" });
    }

    return (
        <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600 py-3 font-semibold" aria-label="Breadcrumb">
                <ol className="list-reset flex flex-wrap items-center">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center">
                            {index !== items.length - 1 ? (
                                <>
                                    <Link
                                        href={item.href}
                                        className="hover:text-yellow-600"
                                    >
                                        {item.label}
                                    </Link>
                                    <span className="mx-2 text-gray-400">
                                        /
                                    </span>
                                </>
                            ) : (
                                <span className="text-yellow-600">
                                    {item.label}
                                </span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
            <hr className="border-t-1 border-gray-200" />
        </div>
    );
}
