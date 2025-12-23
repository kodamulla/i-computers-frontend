import{useState} from "react";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../components/loader.jsx";
import ProductCard from "../components/productCard.jsx";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if(!loaded){
             axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
      console.log(res.data);
      setProducts(res.data);
      setLoaded(true);
    });
        }
    });
    return(
        <div className="w-full h-[calc(100vh-100px)]  flex items-center justify-center">
            {
                !loaded?<Loader/>:
                <div className="w-full flex justify-center items-center p-4 flex-row flex-wrap">
                    {
                       products.map(
                        (item) => {
                            return(
                                <ProductCard key={item.productID} product={item}/>
                            )
                        }
                    )
                       
                    }
                    </div>

                
            }
        
            
        </div>
    )
}