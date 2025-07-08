// resources/js/Pages/Welcome.jsx
import { Head } from "@inertiajs/react";
// import Header from './Front/Components/Header';
import Navbar from "./Front/Components/Navbar";
import Footer from "./Front/Components/Footer";
import Body from "./Body";

export default function Welcome({ brands, laravelVersion, phpVersion, listKota, sliders  }) {
    console.log(listKota)
    return (
        <>
            <Head>
                <title>Homepage</title>
                <meta name="description" content="Home page" />
                
            </Head>
            <Navbar />
            <Body brands={brands} sliders={sliders} />
            <Footer laravelVersion={laravelVersion} phpVersion={phpVersion} />
        </>
    );
}
