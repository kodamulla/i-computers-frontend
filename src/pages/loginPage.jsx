import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    
    console.log("Login process started...");
    console.log("Using URL:", import.meta.env.VITE_BACKEND_URL + "api/users/login");

    try {
      
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const cleanUrl = backendUrl.endsWith('/') ? `${backendUrl}api/users/login` : `${backendUrl}/api/users/login`;

      const res = await axios.post(cleanUrl, {
        email: email,
        password: password
      });

      console.log("Server Response:", res.data);

      if (res.data.token) {
       
        localStorage.setItem("token", res.data.token);
        
        
        toast.success(res.data.message || "Login successful!");

        
        setTimeout(() => {
          if (res.data.role === "admin") {
            console.log("Redirecting to Admin Dashboard");
            navigate("/admin");
          } else {
            console.log("Redirecting to Home");
            navigate("/");
          }
        }, 500);
      }

    } catch (error) {
      console.error("Login Error Details:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex">
     
      <div className="w-[50%] h-full flex justify-center items-center flex-col p-12.5">
        <img src="/logo.png" alt="logo" className="w-[200px] h-[200px] mb-[20px] object-cover" />
        <h1 className="text-[50px] text-gold text-shadow-accent text-shadow-2xs text-center font-bold">
          Plug In. Power Up. Play Hard.
        </h1>
        <p className="text-[30px] text-white italic">Your Ultimate Destination for Gaming Gear</p>
      </div>

      
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-2xl flex flex-col justify-center items-center p-[30px]">
          <h1 className="text-[40px] font-bold mb-[20px] text-white text-shadow-white">Login</h1>
          
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="your email"
            className="w-full h-[50px] mb-[20px] rounded-lg p-[10px] text-[20px] border-2 border-accent focus:outline-none focus:ring-2 focus:ring-gold"
          />
          
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="your password"
            className="w-full h-[50px] rounded-lg p-[10px] text-[20px] border-2 border-accent focus:outline-none focus:ring-2 focus:ring-gold"
          />
          
          <p className="text-white noy-italic w-full text-right mb-[20px]">
            Forget your password? <Link to="/register" className="text-gold underline">Reset it here</Link>
          </p>
          
          <button 
            onClick={login}
            className="w-full h-[50px] bg-accent text-white text-[20px] font-bold rounded-lg border-[2px] border-accent hover:bg-transparent hover:text-accent transition-all duration-300"
          >
            Login
          </button>
          
          <p className="text-white mt-4">
            Don't have an account? <Link to="/register" className="text-gold underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}