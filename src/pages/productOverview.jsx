import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProductOverview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + params.productID)
        .then((response) => {
          setProduct(response.data);
          setStatus("success");
        })
        .catch((error) => {
          toast.error("Product Not Found");
          setStatus("error");
        });
    }
  }, []);

  return (
    <>
    {
        status == "loading" && <Loader/>
    }
    {
        status == "error" && <h1 className="text-center mt-10 text-2xl">Error loading product</h1>
    }
    {
        status == "success" && 
        <div className="w-full h-full flex justify-center items-center">
            <img src={product.images[0]} claaName="max-w-[80%] max-h-[80%] object-contain"/>
          <div className="w-1/2 h-full p-10 flex flex-col gap-6">
          <h1 className="text-4xl font-semibold">{product.name}</h1>
          </div>

        </div>
}
    </>
  );
}
