import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect,  } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/loader";
import ImageSlider from "../components/imageSlider";
import { CgChevronRight } from "react-icons/cg";

import { addToCart } from "../utils/cart.js";

export default function ProductOverview() {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  

 useEffect(() => {
		setStatus("loading");
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + params.productID)
				.then((response) => {
    console.log("API Response:", response.data);
    setProduct(response.data); 
    setStatus("success");
})
				.catch(() => {
					toast.error("Product Not Found");
					setStatus("error");
				});
		
	}, [params.productID]);

  return (
    <>
      {status === "loading" && <Loader />}

      {status === "error" && (
        <h1 className="text-center mt-10 text-2xl">
          Error loading product
        </h1>
      )}

      {status === "success" && 
        <div className="w-full h-[calc(100vh-100px)] flex ">
            <div className = "w-1/2 h-full flex justify-center items-start pt-20">
          <ImageSlider images={product.images} />
            
           </div> 
            
          <div className="w-1/2 h-full p-10 flex flex-col gap-6">
            <h1 className="text-4xl font-semibold">
              {product.name}</h1>
            <h2 className="text-lg text-secondary/80">
              {product.productID}</h2>
              <h3 className="text-lg text-secondary/80 flex items-center"><CgChevronRight/>{product.category}</h3>
              <p className="text-md text-secondary/90 flex items-center h-32 overflow-y-auto">
              {product.description}</p>
              <div className="w-full">
                {product.labelPrice > product.price &&
                <h2 className="text-2xl text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-xl">
                  LKR. {product.labelPrice.toFixed(2)}
                  </h2>
                  }
                  <h2 className="text-accent font-semibold text-3xl">
                    LKR. {product.price.toFixed(2)}</h2>

              </div>
              <div className="w-full flex flex-row gap-4 mt-4">
                <button
                onClick={()=>{
                  addToCart(product, 1);
                }}
                 className="bg-accent text-white px-5 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 active:scale-95 shadow-md">
                  Add to Cart
                </button>
                <button
                onClick={()=>{
                 navigate("/checkout",{state:[
                  {productID: product.productID,
                  name: product.name,
                  price: product.price,
                  labelPrice: product.labelPrice,
                  image: product.images[0],
                     quantity: 1}
                 ]});
                }} 
                className="bg-secondary/10 text-secondary px-5 py-2 rounded-lg font-semibold hover:bg-secondary/20 transition-all duration-300 active:scale-95 shadow-md">
                  Buy Now
                </button>
              </div>

          </div>
        </div>
}
      
    </>
    
  );
}
