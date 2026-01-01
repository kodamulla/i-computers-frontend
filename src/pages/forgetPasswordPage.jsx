import { useState ,} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";


export default function ForgetPasswordPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/validate-otp", {
        email: email,
        otp: otp,
        newPassword: newPassword,
        });
        toast.success("Password reset successful");
        setLoading(false);
        navigate("/login");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
      setLoading(false);
    }
  }

  async function sendOtp() {
    setLoading(true);
    try{
        await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp/"+email, {
            email: email
        });
        toast.success("OTP sent to your email");
        setLoading(false);
        setOtpSent(true);
        
    }catch(err){
        console.log(err);
        toast.error("Failed to send OTP. Please try again.");
        setLoading(false);
        
    }
   
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
        
        
       { loading && 
        (
            <Loader />
        )}
      {otpSent ? (
        <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Enter OTP and New Password</h2>
        <input
          type="text"
          placeholder="Enter OTP"
            className="w-[400px] p-2 mb-4 border border-gray-300 rounded"
            onChange={(e)=> setOtp(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
            className="w-[400px] p-2 mb-4 border border-gray-300 rounded"
            onChange={(e)=> setNewPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
            className="w-[400px] p-2 mb-4 border border-gray-300 rounded"
            onChange={(e)=> setConfirmPassword(e.target.value)}
        />
        <button
          onClick={resetPassword}
          className="w-full p-2 bg-accent text-white font-bold rounded hover:bg-accent-dark transition"
        >
          Reset Password
        </button>
        </div>

      ):(
        <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={sendOtp}
            className="w-full p-2 bg-accent text-white font-bold rounded hover:bg-accent-dark transition"
          >
            Send OTP
          </button>
        </div>
      ) 
        
      }
    </div>
  );
}
