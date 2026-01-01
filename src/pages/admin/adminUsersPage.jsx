import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import axios from "axios";
import { useState, useEffect } from "react";


import Loader from "../../components/loader.jsx";
import { GoVerified } from "react-icons/go";


export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
 

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/users-all",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }).then((res) => {
      console.log(res.data);
      setUsers(res.data);
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
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4">First Name</th>
              <th className="px-4 py-4">Last Name</th>
              <th className="px-4 py-4 italic opacity-80">Role</th>
              <th className="px-4 py-4 text-center">Status</th>
                <th className="px-4 py-4">Action</th>
             
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-secondary text-sm">
            {users.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4">
                  <img 
                    src={item.image} 
                    className="w-10 h-10 object-cover rounded shadow-sm" 
                    alt="product"
                  />
                </td>
                <td className="px-4 py-4 font-mono text-xs text-gray-500 uppercase">
                  {item.email}{item.isEmailVerified ? <GoVerified className="text-blue-400"/> : ""}
                </td>
                <td className="px-4 py-4 font-bold">
                  {item.firstName}
                </td>
                <td className="px-4 py-4 font-semibold text-secondary">
                  {item.lastName}
                </td>
                <td className="px-4 py-4 font-semibold text-secondary ">
                  {item.role}
                </td>
                <td className="px-4 py-4 text-sm ">
                     <button 
                     className="px-3 py-1 bg-accent text-white rounded hover:bg-red-600 transition"
                     >{
                        item.isBlocked ? "Blocked" : "Active"
                     }</button>
                 
                </td>
                <td className="px-4 py-4 text-sm ">
                   <button 
                     className="px-3 py-1 bg-accent text-white rounded hover:bg-red-600 transition"
                     onClick={async() => {
                        
                        await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/users/toggle-block/${item.email}`,{
                            isBlocked: !item.isBlocked
                        },{
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        });
                        setLoaded(false);
                     }
                    }
                     >{
                        item.isBlocked ? "Unblock User" : " Block User"
                     }</button>
                  
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