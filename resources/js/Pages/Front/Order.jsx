import { useEffect, useState } from 'react';
import { Head, useForm } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function Order({ categories, carts }) {
    const [snapToken, setSnapToken] = useState(null);
    const [loading, setLoading] = useState(false); // state loading
    // Gunakan useForm untuk data order
    const { data, setData, post, processing } = useForm({
        gross_amount: 10000,
        first_name: 'Budi',
        email: 'budi@example.com',
        item_details: [
            {
                id: "SKU-1",
                price: 5000,
                quantity: 1,
                name: "Produk A"
            },
            {
                id: "SKU-2",
                price: 5000,
                quantity: 1,
                name: "Produk B"
            }
        ]
    });

    
    useEffect(() => {
        
        if (!window.snap) {
            const script = document.createElement('script');
            script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
            script.setAttribute('data-client-key', import.meta.env.MIDTRANS_CLIENT_KEY || 'YOUR_CLIENT_KEY');
            script.async = true;
            document.body.appendChild(script);
            return () => {
                document.body.removeChild(script);
            };
        }
    }, []);

    const handlePay = async (e) => {
        setLoading(true);
        if(snapToken){
            window.snap.pay(snapToken, {
                onClose: () => setLoading(false),
                onSuccess: () => setLoading(false),
                onPending: () => setLoading(false),
                onError: () => setLoading(false),
            });
        }else{
            try {
                const res = await fetch('/snap/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                    },
                    body: JSON.stringify(data),
                });
                const result = await res.json();
                setSnapToken(result.token);
                if (window.snap && result.token) {
                    window.snap.pay(result.token, {
                        onClose: () => setLoading(false),
                        onSuccess: () => setLoading(false),
                        onPending: () => setLoading(false),
                        onError: () => setLoading(false),
                    });
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setLoading(false);
            }
        }
    };

    return (
        <div>
            <Head>
                <title>Order</title>
                <meta name="description" content="Order page" />
                <meta name="csrf-token" content="{{ csrf_token() }}" />
            </Head>
            <Navbar category={categories} carts={carts} />


            {/* button ini di comment aja */}
            <button
                    onClick={handlePay}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                {loading ? "Memproses..." : "Bayar dengan Midtrans"}
            </button>
            <Footer />
        </div>
    );
}