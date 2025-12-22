import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { useState, useEffect } from "react";

import Loader from "../../components/loader.jsx";
import ProductDeleteButton from "../../components/productDeleteButton.jsx";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products").then((res) => {
      console.log(res.data);
      setProducts(res.data);
      setLoaded(true);
    });
  }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen bg-primary flex justify-center p-4 md:p-8">
      
      <div className="w-full max-w-[1400px] bg-white shadow-md rounded-xl border border-gray-100 overflow-x-auto">
        {loaded ?<table className="w-full  table-auto text-left border-collapse min-w-[1000px]">
          <thead className="bg-accent text-primary uppercase text-xs tracking-wider">
            <tr>
              <th className="px-4 py-4">Image</th>
              <th className="px-4 py-4">ID</th>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Price</th>
              <th className="px-4 py-4 italic opacity-80">Labelled</th>
              <th className="px-4 py-4 text-center">Cat.</th>
              <th className="px-4 py-4">Brand</th>
              <th className="px-4 py-4">Model</th>
              <th className="px-4 py-4 text-center">Stock</th>
              <th className="px-4 py-4 text-center">Status</th>
              <th className="px-4 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-secondary text-sm">
            {products.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4">
                  <img 
                    src={item.images[0]} 
                    className="w-10 h-10 object-cover rounded shadow-sm" 
                    alt="product"
                  />
                </td>
                <td className="px-4 py-4 font-mono text-xs text-gray-500 uppercase">
                  {item.productID}
                </td>
                <td className="px-4 py-4 font-bold">
                  {item.name}
                </td>
                <td className="px-4 py-4 font-bold text-gold text-base">
                  {item.price}
                </td>
                <td className="px-4 py-4 text-gray-400 line-through text-xs">
                  {item.labelPrice}
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-4">{item.brand}</td>
                <td className="px-4 py-4 text-gray-600">{item.model}</td>
                <td className="px-4 py-4 text-center font-semibold">{item.stock}</td>
                <td className="px-4 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.isAvailable ? "AVAILABLE" : "NO"}
                  </span>
                </td>
                <td className="px-4 py-4 text-center text-xs">
                  <div>
                   <ProductDeleteButton productId = {item.productID}/>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>:<Loader />}
      </div>

      <Link 
        to="/admin/add-product" 
        className="fixed right-8 bottom-8 w-14 h-14 flex justify-center items-center bg-accent text-primary rounded-full shadow-lg hover:bg-gold hover:scale-105 transition-all z-20"
      >
        <BiPlus className="text-3xl" />
      </Link>
    </div>
  );
}