// resources/js/Pages/Welcome.jsx
import { Head } from "@inertiajs/react";
// import Header from './Front/Components/Header';
import Navbar from "./Front/Components/Navbar";
import Footer from "./Front/Components/Footer";
import Body from "./Body";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head>
                <title>Dashboard</title>
                <meta name="description" content="Dashboard page" />
            </Head>
            <Navbar />
            <Body />
            <Footer laravelVersion={laravelVersion} phpVersion={phpVersion} />
        </>
    );
}
