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
        <div className="w-full min-h-[calc(100vh-100px)] overflow-y-auto">
            {!loaded ? (
                <Loader />
            ) : (
                <div className="w-full flex flex-col items-center p-4">
                    <div className="w-full h-[100px] sticky top-0 bg-white z-10 flex justify-center items-center">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={query}
                            onChange={handleSearch}
                            className="w-[400px] p-2 border border-gray-300 rounded"
                        />
                    </div>
                    
                    <div className="w-full flex flex-row flex-wrap justify-center gap-6">
                        {products.length > 0 ? (
                            products.map((item) => (
                                <ProductCard key={item.productID || item._id} product={item} />
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}