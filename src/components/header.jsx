import { BiShoppingBag } from "react-icons/bi";
import { Link } from "react-router-dom";
import { LuListCollapse } from "react-icons/lu";
import { useState } from "react";
import UserData from "./userData";

export default function Header() {
  const [sideBarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="w-full h-[90px] bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 backdrop-blur-xl shadow-lg flex relative items-center">

      <LuListCollapse 
        onClick={() => setSidebarOpen(true)} 
        className="text-white my-auto text-2xl ml-6 lg:hidden cursor-pointer hover:text-blue-400 transition"
      /> 

      <img src="/logo.png" className="h-[70px] ml-4 drop-shadow-lg" alt="logo"/>

      {/* Desktop Nav */}
      <div className="w-full h-full hidden lg:flex text-lg text-white justify-center items-center gap-10 font-medium">
        <Link className="hover:text-blue-400 transition duration-300" to="/">Home</Link>
        <Link className="hover:text-blue-400 transition duration-300" to="/products">Products</Link>
        <Link className="hover:text-blue-400 transition duration-300" to="/about">About</Link>
        <Link className="hover:text-blue-400 transition duration-300" to="/contact">Contact</Link>
      </div>

      {/* User Section */}
      <div className="absolute right-24 top-0 h-full items-center hidden lg:flex text-white">
        <UserData/>
      </div>

      {/* Cart */}
      <Link 
        to="/cart" 
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md transition duration-300"
      >
        <BiShoppingBag className="text-xl"/>
      </Link>

      {/* Mobile Sidebar */}
      {sideBarOpen && 
        <div className="fixed lg:hidden w-[100vw] h-screen top-0 left-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300">

          <div className="w-[260px] h-screen relative">

            <div className="absolute w-full h-full bg-white shadow-2xl left-[-260px] translate-x-[260px] transition-transform duration-500 flex flex-col">

              {/* Sidebar Header */}
              <div className="w-full h-[90px] bg-gradient-to-r from-blue-900 to-blue-800 flex justify-center items-center relative">
                <img src="/logo.png" className="h-[65px]" alt="logo"/>
                <LuListCollapse 
                  onClick={() => setSidebarOpen(false)} 
                  className="text-white text-2xl absolute right-4 cursor-pointer rotate-180 hover:text-blue-300 transition"
                /> 
              </div>

              {/* Sidebar Links */}
              <div className="w-full h-full flex flex-col gap-6 mt-10 pl-6 text-lg text-gray-700 font-medium">

                <a className="hover:text-blue-500 transition duration-300"
                   href="/"
                   onClick={()=> setSidebarOpen(false)}>
                  Home
                </a>

                <a className="hover:text-blue-500 transition duration-300"
                   href="/products"
                   onClick={()=> setSidebarOpen(false)}>
                  Products
                </a>

                <a className="hover:text-blue-500 transition duration-300"
                   href="/about"
                   onClick={()=> setSidebarOpen(false)}>
                  About
                </a>

                <a className="hover:text-blue-500 transition duration-300"
                   href="/contact"
                   onClick={()=> setSidebarOpen(false)}>
                  Contact
                </a>

                <div className="flex justify-center bg-blue-900 p-3 rounded-full text-white mt-6">
                  <UserData/>
                </div>

              </div>
            </div>
          </div>
        </div>
      }

    </header>  
  );
}
