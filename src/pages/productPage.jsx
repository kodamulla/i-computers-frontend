import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/loader.jsx";
import ProductCard from "../components/productCard.jsx";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products");
                setProducts(res.data);
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoaded(true); 
            }
        };

        if (!loaded) {
            fetchProducts();
        }
    }, [loaded]); 

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        try {
            if (value === "") {
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products");
                setProducts(res.data);
            } else {
                const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + value);
                setProducts(res.data);
            }
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-90px)] bg-gradient-to-b from-blue-50 to-white overflow-y-auto">

            {!loaded ? (
                <Loader />
            ) : (
                <div className="w-full flex flex-col items-center px-4 py-8">

                    {/* Search Bar Section */}
                    <div className="w-full sticky top-0 bg-white/80 backdrop-blur-md z-10 flex justify-center items-center py-6 shadow-sm rounded-xl mb-8">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={query}
                            onChange={handleSearch}
                            className="w-full max-w-xl px-5 py-3 border border-blue-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition duration-300"
                        />
                    </div>

                    {/* Products Grid */}
                    <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.map((item) => (
                                <ProductCard 
                                    key={item.productID || item._id} 
                                    product={item} 
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-gray-500 text-lg mt-10">
                                No products found.
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}
