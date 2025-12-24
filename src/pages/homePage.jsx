import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage.jsx";
import ProductOverview from"./productOverview";
import CartPage from "./cart.jsx";
import CheckoutPage from "./checkOut.jsx";
export default function HomePage() {

    return(
        <div className="w-full h-full overflow-y-scroll max-h-full">
        <Header/>
        <div className="w-full main-h-[calc(100%-100px)] ">
            <Routes>
                <Route path="/" element={<h1>Home Page</h1>} />
                <Route path="/about" element={<h1>About Page</h1>} />
                <Route path="/contact" element={<h1>Contact Page</h1>} />
                <Route path="/overview/:productID" element={<ProductOverview/>} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/products" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/*" element={<h1>Page Not Found</h1>} />
            </Routes>
        
        </div>
        </div>
    )
}