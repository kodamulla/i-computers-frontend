import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/loader";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      setIsLoading(true);
      axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/google-login", {
        token: response.access_token,
      }).then((res) => {
        localStorage.setItem("token", res.data.token);
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        toast.success("Google Login Successful");
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    },
    onError: () => { toast.error("Google Login Failed"); },
    onNonOAuthError: () => { toast.error("Google Login Failed"); },
  });

  async function login() {
    console.log("Login process started...");
    setIsLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const cleanUrl = backendUrl.endsWith('/') ? `${backendUrl}api/users/login` : `${backendUrl}/api/users/login`;

      const res = await axios.post(cleanUrl, {
        email: email,
        password: password
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message || "Login successful!");

        setTimeout(() => {
          if (res.data.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        }, 500);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between px-6 gap-12">
        
        {/* Branding */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <img src="/logo.png" alt="logo" className="w-32 h-32 md:w-48 md:h-48 mb-6 drop-shadow-2xl object-contain" />
          
          <h1 className="text-4xl md:text-6xl text-blue-500 font-black uppercase tracking-tighter leading-tight drop-shadow-lg">
            Plug In.<br /> Power Up.<br /> <span className="text-white">Play Hard.</span>
          </h1>

          <p className="mt-4 text-lg md:text-xl text-white/80 font-medium italic">
            Your Ultimate Destination for Gaming Gear
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full md:w-[450px]">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl p-8 md:p-10">
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-white/60 text-sm">Please enter your details to sign in</p>
            </div>
            
            <div className="space-y-4">
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
                placeholder="Password"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
            </div>

            <div className="flex justify-end mt-3 mb-6">
              <Link to="/forgot-password" className="text-blue-400 text-sm hover:text-white transition-colors duration-200">
                Forgot password?
              </Link>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={login}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 transform active:scale-95 transition-all duration-200"
              >
                Sign In
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-white/20"></div>
                <span className="flex-shrink mx-4 text-white/40 text-xs uppercase tracking-widest">or</span>
                <div className="flex-grow border-t border-white/20"></div>
              </div>

              <button 
                onClick={googleLogin}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl border border-white/20 flex items-center justify-center gap-3 backdrop-blur-sm transition-all duration-200"
              >
                <GrGoogle className="text-xl text-blue-500" />
                Continue with Google
              </button>
            </div>
            
            <p className="text-center text-white/60 mt-8 text-sm">
              Don't have an account? 
              <Link to="/register" className="text-blue-400 font-bold ml-1 hover:underline">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {isLoading && <Loader />}
    </div>
  );
}
