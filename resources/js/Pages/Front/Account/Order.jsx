
import { Head } from "@inertiajs/react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Order({ categories, carts }) {

    console.log(categories, carts);
    return (
        
        <div>
            <Head>
                <title>Order</title>
                <meta name="description" content="Order page" />
            </Head>
                        
                        
            <Navbar category={categories} carts={carts} />

            <h1>Order</h1>
            <p>This is the order where you can manage your orders.</p>
            <Footer />
        </div>
    );
}