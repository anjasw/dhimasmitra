
import { Head } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function OrderFail() {

    return (
        
        <div>
            <Head>
                <title>Order</title>
                <meta name="description" content="Order page" />
            </Head>
                        
                        
            <Navbar />

            <h1>Order Fail Page</h1>
            <p>This is the order fail page where you can manage your orders.</p>
            <Footer />
        </div>
    );
}