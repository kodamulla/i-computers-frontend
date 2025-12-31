import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/loader";


export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function register() {
    
   if(firstName.trim() === "" ){
        toast.error("First name is required");
        return;
    }
    if(lastName.trim() === "" ){
        toast.error("Last name is required");
        return;
    }
    if(email.trim() === "" ){
        toast.error("Email is required");
        return;
    }
    if(password.trim() === "" ){
        toast.error("Password is required");
        return;
    }
    if(confirmPassword.trim() === "" ){
        toast.error("Please confirm your password");
        return;
    }

   if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);

   
try {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  
  const cleanUrl = backendUrl.endsWith('/') 
    ? `${backendUrl}api/users/register` 
    : `${backendUrl}/api/users/register`;

  const res = await axios.post(cleanUrl, {
    email: email.trim(),
    password: password.trim(),
    firstName: firstName.trim(),
    lastName: lastName.trim(),
  });

  navigate("/");
  toast.success("Registration successful! Welcome to I Computers.");
  setIsLoading(false);

} catch (error) {
 
  console.error("Register Error:", error.response?.data || error.message);
  
  const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
  toast.error(errorMessage);
  setIsLoading(false);
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
          <h1 className="text-[20px] font-semibold mb-[20px] text-white text-shadow-white">Register</h1>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            placeholder="your first name"
            className="w-full h-[50px] mb-[20px] rounded-lg p-[10px] text-[20px] border-2 border-accent focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            placeholder="your last name"
            className="w-full h-[50px] mb-[20px] rounded-lg p-[10px] text-[20px] border-2 border-accent focus:outline-none focus:ring-2 focus:ring-gold"
          />
          
          
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
            className="w-full h-[50px] mb-[20px] rounded-lg p-[10px] text-[20px] border-2 border-accent focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="confirm your password"
            className="w-full h-[50px] mb-[20px] rounded-lg p-[10px] text-[20px] border-2 border-accent focus:outline-none focus:ring-2 focus:ring-gold"
          />
          
          
          
          
          <button 
            onClick={register}
            className="w-full h-[50px] bg-accent text-white text-[20px] font-bold rounded-lg border-[2px] border-accent hover:bg-transparent hover:text-accent transition-all duration-300"
          >
            Register
          </button>
          
          <p className="text-white mt-4">
            Already have an account? <Link to="/login" className="text-gold underline">Login here</Link>
          </p>
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}