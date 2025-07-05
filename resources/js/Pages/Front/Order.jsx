import { Head } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function Order() {
    return (
        <>
            <Head>
                <title>Order</title>
                <meta name="description" content="Order page" />
            </Head>
            <Navbar />
            
            <Footer />
        </>
    );
}
