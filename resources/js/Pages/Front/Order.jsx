import { Head } from "@inertiajs/react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function Order() {
    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Dashboard page" />
            </Head>
            <Navbar />
            
            <Footer />
        </>
    );
}
