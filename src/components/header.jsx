import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LuListCollapse } from "react-icons/lu";
import { useState } from "react";


export default function Header() {
  const [sideBarOpen, setSidebarOpen] = useState(false);
    return (
      <header className="w-full h-[100px] bg-accent flex relative">
        <LuListCollapse onClick={() => setSidebarOpen(true)} className="text-white my-auto text-2xl ml-6 lg:hidden" /> 
        <img src="/logo.png" className="h-[80px]" alt="logo"/>
        <div className="w-full h-full hidden lg:flex text-xl text-primary justify-center items-center gap-[20px]">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/admin">Admin</Link>
        </div>
        <Link to="/cart" className="absolute right-10 top-1/2 -translate-y-1/2 bg-primary">
          <BiShoppingBag/>
        </Link>
        {sideBarOpen&&<div className="fixed lg:hidden w-[100vw] h-screen top-0 left-0 bg-black/50 z-50 transition-opacity duration-300">
        <div className =" w-[250px] h-screen flex-col   relative">
          <div className="absolute w-full h-full bg-white left-[-250px]  translate-x-[250px] transform-flat transition-transform duration-1000 flex flex-col">
            <div className="w-full h-[100px] bg-accent flex justify-center items-center">
              <img src="/logo.png" className="h-[80px]" alt="logo"/>
              <LuListCollapse onClick={() => setSidebarOpen(false)} className="text-white my-auto text-2xl ml-6 lg:hidden rotate-180" /> 
               
                
            </div>
            <div className="w-full h-full flex flex-col gap-6 mt-10 pl-6 text-lg">
            <a className="hover:text-secondary transition"
               href="/"
               onClick={()=> setSidebarOpen(false)}
            >
              Home
              </a>
            <a className="hover:text-secondary transition"
               href="/products"
               onClick={()=> setSidebarOpen(false)}
            >
              Products
              </a>
            <a className="hover:text-secondary transition"
               href="/about"
               onClick={()=> setSidebarOpen(false)}
            >
              About 
              </a>
            <a className="hover:text-secondary transition"
                href="/contact"
               onClick={()=> setSidebarOpen(false)}
            >
              Contact 
              </a>
             
            </div>

          </div>

        </div>

        </div>}
      </header>  
    );
}