import { useEffect, useState } from "react";
import Hero from "./Front/Components/Hero";
import Brand from "./Front/Components/Brand";
import Category from "./Front/Components/Category";
import WhyUs from "./Front/Components/Whyus";
import ProductList from "./Front/Components/ProductList";
import Blog from "./Front/Components/Blog";
import MarketplaceSection from "./Front/Components/MarketplaceSection";

export default function Body({ brands, sliders, products, categories, articles }) {
    const [showBelowFold, setShowBelowFold] = useState(false);

    useEffect(() => {
        // Tampilkan komponen bawah setelah 300ms (atau pakai IntersectionObserver)
        const timer = setTimeout(() => setShowBelowFold(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="bg-gray-100">
            <Hero sliders={sliders} />
            {showBelowFold && (
                <>
                    <Brand brands={brands}/>
                    <Category categories={categories} />
                    <WhyUs />
                    <ProductList products={products} />
                    <Blog articles={articles} />
                    <MarketplaceSection />
                </>
            )}
        </main>
    );
}
