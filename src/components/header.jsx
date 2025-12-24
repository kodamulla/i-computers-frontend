import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function Header() {
    return (
      <header className="w-full h-[100px] bg-accent flex relative"> 
        <img src="/logo.png" className="h-[80px]" alt="logo"/>
        <div className="flex-1 flex text-xl text-primary justify-center items-center gap-[20px]">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/admin">Admin</Link>
        </div>
        <Link to="/cart" className="absolute right-10 top-1/2 -translate-y-1/2 bg-primary">
          <BiShoppingBag/>
        </Link>
      </header>  
    );
}