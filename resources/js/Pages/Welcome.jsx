// resources/js/Pages/Welcome.jsx
import { Head } from "@inertiajs/react";
// import Header from './Front/Components/Header';
import Navbar from "./Front/Components/Navbar";
import Footer from "./Front/Components/Footer";
import Body from "./Body";

export default function Welcome({ brands, laravelVersion, phpVersion, listKota, sliders, categories, carts  }) {
    // console.log(categories)
    return (
        <>
            <Head>
                <title>Homepage</title>
                <meta name="description" content="Home page" />
                
            </Head>
            <Navbar category={categories} carts={carts} />
            <Body brands={brands} sliders={sliders} />
            <Footer laravelVersion={laravelVersion} phpVersion={phpVersion} />
        </>
    );
}
