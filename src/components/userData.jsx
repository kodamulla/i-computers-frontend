import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function UserData(){
const [user,setUser]=useState(null);

useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        setUser(response.data);
      }).catch(() => {
        setUser(null);
      });
    }
}, []);
const [selectedOption, setSelectedOption] = useState("user");
return (
    <>
    {user ?
    <div className="w-[150px] flex flex-row">
        <img src={user.image} className="w-[50px] h-[50px] rounded-full" />
        <select className="bg-accent text-white ml-2 rounded-md p-1" value={selectedOption}
        onChange={
            (e) =>{ if(e.target.value==="logout"){
                localStorage.removeItem("token");
                window.location.href="/login";
            }else if(e.target.value==="my-orders"){
                window.location.href="/orders";
            }
            setSelectedOption("user")
            }
        }>
            <option value={"user"}>{user.firstName}</option>
            <option value={"logout"}>Logout</option>
            <option value={"my-orders"}>My Orders</option>
            </select>
    </div>:
    <div className="w-[150px] flex flex-row">
        <Link to="/login" className="  mx-2 px-4 py-2 bg-white text-accent rounded-full">Login</Link> / 
        <Link to="/register" className="  mx-2 px-4 py-2 bg-white text-accent rounded-full">Register</Link>
    </div>
    }
    </>
)

}

