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
    if (firstName.trim() === "") {
      toast.error("First name is required");
      return;
    }
    if (lastName.trim() === "") {
      toast.error("Last name is required");
      return;
    }
    if (email.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if (password.trim() === "") {
      toast.error("Password is required");
      return;
    }
    if (confirmPassword.trim() === "") {
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
    <div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex items-center justify-center relative overflow-hidden py-10 md:py-0">
      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between px-6 gap-10">
        
        {/* Branding */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <img src="/logo.png" alt="logo" className="w-24 h-24 md:w-40 md:h-40 mb-6 drop-shadow-2xl object-contain" />
          
          <h1 className="text-4xl md:text-6xl text-blue-500 font-black uppercase tracking-tighter leading-tight">
            Plug In.<br /> Power Up.<br /> <span className="text-white">Play Hard.</span>
          </h1>

          <p className="mt-4 text-lg md:text-xl text-white/80 font-medium italic">
            Your Ultimate Destination for Gaming Gear
          </p>
        </div>

        {/* Register Card */}
        <div className="w-full md:w-[500px]">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl p-8">
            
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-white/60 text-sm">Join the elite gaming community</p>
            </div>
            
            <div className="space-y-4">
              
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                />
              </div>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
              
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Create Password"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />

              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
            </div>

            <div className="mt-8">
              <button 
                onClick={register}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 transform active:scale-95 transition-all duration-200"
              >
                Register Now
              </button>
            </div>
            
            <p className="text-center text-white/60 mt-6 text-sm">
              Already have an account? 
              <Link to="/login" className="text-blue-400 font-bold ml-1 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {isLoading && <Loader />}
    </div>
  );
}
