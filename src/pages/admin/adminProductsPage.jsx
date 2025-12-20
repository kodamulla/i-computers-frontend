import { Link } from "react-router-dom";
import { BiPlus } from "react-icons/bi";

export default function AdminProductsPage() {
  return (
    <div className="w-full h-full flex justify-center items-center text-6xl relative">
      <h1 > Products Page</h1>
      <Link to= "/admin/add-product" className=" absolute right-[50px] bottom-[20px] w-[50px] h-[50px] flex justify-center items-center text 6xl border-[2px] rounded-full hover:text-white hover:bg-accent text-accent border-accent"><BiPlus/></Link>
    </div>
  );
}