import { Head, Link } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
export default function DetailProduk({ product }) {
    return (
        <div>
            <Head>
                <title>{product.name}</title>
                <meta name="description" content={`Detail of ${product.name}`} />
            </Head>

            <Navbar />

            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
                <img src={product.image} alt={product.name} className="w-full h-auto mb-4" />
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-lg font-semibold text-green-600">Price: ${product.price}</p>
            </div>

            <Footer />
        </div>
    );
}