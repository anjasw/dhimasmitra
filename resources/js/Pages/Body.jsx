import Hero from "./Front/Components/Hero";
import Brand from "./Front/Components/Brand";
import Category from "./Front/Components/Category";
import WhyUs from "./Front/Components/Whyus";
import ProductList from "./Front/Components/ProductList";
import Blog from "./Front/Components/Blog";
import MarketplaceSection from "./Front/Components/MarketplaceSection";

export default function Body({brands, sliders}) {
    console.log(brands)
    return (
        <main className="bg-gray-100">
            <Hero sliders={sliders} />
            <Brand brands={brands}/>
            <Category />
            <WhyUs />
            <ProductList />
            <Blog />
            <MarketplaceSection />
        </main>
    );
}
