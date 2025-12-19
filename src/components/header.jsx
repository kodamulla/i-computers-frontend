import { Link } from "react-router-dom";

export default function Header() {
    return (
      <header className="w-full h-[100px] bg-accent flex items-center px-4"> 
        <img src="/logo.png" className="h-[80px]" alt="logo"/>
        <div className="flex-1 flex text-xl text-primary justify-center items-center gap-[20px]">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </header>  
    );
}