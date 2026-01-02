
import axios from "axios";
import { useState, useEffect } from "react";
import ViewOrderInfo from "../../components/viewOrderInfo.jsx";


import Loader from "../../components/loader.jsx";


export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!loaded) {
      
    
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).then((res) => {
      console.log(res.data);
      setOrders(res.data);
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
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-winder">
                Order ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-winder">
                Customer email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-winder">
                Customer name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-winder">
                Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-winder">
                Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-winder">
                Total 
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-winder">
               Actions
                </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-secondary text-sm">
            {orders.map((order, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                
                <td className="px-4 py-4 font-mono text-xs text-black uppercase">
                  {order.orderId}
                </td>
                <td className="px-4 py-4 font-mono text-xs  text-black uppercase">
                  {order.email}
                </td>
                <td className="px-4 py-4 font-mono text-xs  text-black uppercase">
                  {order.name}
                </td>
                <td className="px-4 py-4 font-mono text-xs  text-black uppercase">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 font-mono text-xs  text-black uppercase">
                  {order.status}
                </td>
                <td className="px-4 py-4 font-mono text-xs  text-black uppercase">
                    LKR. {order.total.toFixed(2)}
                </td>
                <td className="px-4 py-4 font-mono text-xs  text-black uppercase">
                 <ViewOrderInfo order={order}/> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>:<Loader />}
      </div>

      
    </div>
  );
}