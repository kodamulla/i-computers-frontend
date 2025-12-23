import { Routes, Route, Link } from "react-router-dom";
import AdminProductsPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPage"; 
import AdminUpdateProductPage from "./admin/adminUpdateProductPage";
import { FaClipboardList } from "react-icons/fa";
import { BsBoxes } from "react-icons/bs";
import { LuUsers } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex bg-accent overflow-hidden">
      {/* Sidebar Section */}
      <div className="w-[300px] bg-accent h-full flex flex-col">
        <div className="w-full h-[100px] flex items-center p-4 border-b border-white/20">
          <img src="/logo.png" className="h-16" alt="logo" />
          <h1 className="text-2xl text-primary font-bold ml-2">Admin</h1>
        </div>
        
        <nav className="w-full flex flex-col pt-8 pl-4 space-y-2">
          {/* Link paths values should match the Route paths below */}
          <Link to="/admin" className="text-white text-xl flex items-center h-12 gap-3 hover:bg-white/10 p-2 rounded-l-lg transition-colors">
            <FaClipboardList /> Orders
          </Link>
          <Link to="/admin/products" className="text-white text-xl flex items-center h-12 gap-3 hover:bg-white/10 p-2 rounded-l-lg transition-colors">
            <BsBoxes /> Products
          </Link>
          <Link to="/admin/users" className="text-white text-xl flex items-center h-12 gap-3 hover:bg-white/10 p-2 rounded-l-lg transition-colors">
            <LuUsers /> Users
          </Link>
          <Link to="/admin/reviews" className="text-white text-xl flex items-center h-12 gap-3 hover:bg-white/10 p-2 rounded-l-lg transition-colors">
            <MdOutlineRateReview /> Reviews
          </Link>
        </nav>
      </div>
      
      {/* Content Area Section */}
      <div className="flex-1 h-full bg-primary rounded-l-[40px] overflow-y-auto border-l-8 border-accent">
        <div className="p-8">
          <Routes>
            <Route path="/" element={<h1 className="text-2xl font-bold">Orders Management</h1>} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="add-product" element={<AdminAddProductPage />} />
            <Route path="update-product" element={<AdminUpdateProductPage />} />
            <Route path="users" element={<h1 className="text-2xl font-bold">Users Management</h1>} />
            <Route path="reviews" element={<h1 className="text-2xl font-bold">Reviews Management</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}