import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    // location.state null නම් navigate කරවනවා
    const [cart, setCart] = useState(location.state || []);
    
    if (location.state == null) {
        navigate("/products");
    }

    function getCartTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    function submitOrder() {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("You must be logged in to place an order");
            navigate("/login");
            return;
        }

        const orderItems = cart.map(item => ({
            productID: item.productID,
            quantity: item.quantity,
        }));

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
            name: name,
            address: address,
            phone: phone,
            items: orderItems,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => {
            toast.success("Order placed successfully");
            navigate("/orders");
        }).catch((err) => {
            console.log(err);
            toast.error("Failed to place order. Please check login.");
        });
    }

    return (
        
        <div className="w-full flex flex-col items-center p-[20px]">
            {cart.map((item, index) => (
               
                <div key={item.productID || index} className="w-full lg:w-[50%] pt-[20px] relative lg:h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between">
                    <h1 className="lg:hidden absolute w-full h-[20px] overflow-hidden top-[0px]">{item.name}</h1>
                     <div className="h-full flex flex-col"><img src={item.image} className="h-[80px] lg:h-full aspect-square object-cover"/>
                    {
                                    item.labelPrice > item.price &&
                                    <h2 className="text-lg text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-xl">
                                      LKR. {item.labelPrice.toFixed(2)}
                                      </h2>
                                }
                                <h2 className="text-sm text-accent font-semibold">
                                    LKR. {item.price.toFixed(2)}
                                </h2>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center pl-5 gap-2 w-[300px]">
                        <h1 className="text-2xl font-semibold relative hover:[&_.tooltip]:opacity-100">
                            <span className="opacity-0 tooltip italic text-sm absolute bottom-[-20px] bg-accent text-white p-2 rounded-lg">{item.name}</span>
                            {item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name}
                        </h1>
                        {item.labelPrice > item.price && (
                            <h2 className="text-lg text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2">
                                LKR. {item.labelPrice.toFixed(2)}
                            </h2>
                        )}
                        <h2 className="text-lg text-secondary/80">Quantity: {item.quantity}</h2>
                    </div>
                    <div className="min-h-full flex flex-row items-center gap-4">
                        <div className="h-full flex flex-col justify-center items-center">
                            <BsChevronUp
                                onClick={() => {
                                    const copiedCart = [...cart];
                                    copiedCart[index].quantity += 1;
                                    setCart(copiedCart);
                                }}
                                className="text-2xl hover:text-accent cursor-pointer" />
                            <span className="text-lg font-semibold">{item.quantity}</span>
                            <BsChevronDown
                                onClick={() => {
                                    const copiedCart = [...cart];
                                    if (copiedCart[index].quantity > 1) {
                                        copiedCart[index].quantity -= 1;
                                    } else {
                                        copiedCart.splice(index, 1);
                                    }
                                    setCart(copiedCart);
                                }}
                                className="text-2xl hover:text-accent cursor-pointer" />
                        </div>
                        <span className="pr-4 text-lg font-semibold w-[150px] text-right">
                            LKR. {(item.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                </div>
            ))}

            
            <div className="lg:w-[50%] p-4 rounded-xl shadow-2xl my-1 flex flex-wrap justify-between items-center bg-white">
                <div className="flex flex-col lg:w-[50%]">
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded" />
                </div>
                <div className="flex flex-col lg:w-[50%]">
                    <label>Phone Number</label>
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-2 border rounded" />
                </div>
                <div className="flex flex-col w-full ">
                    <label>Address</label>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="p-2 border rounded" />
                </div>
            </div>

            <div className="w-full lg:w-[50%] h-[150px] rounded-xl shadow-2xl my-4 flex justify-between items-center bg-white p-4">
                <button onClick={submitOrder} className="px-6 py-3 rounded bg-black text-white font-bold">
                    Order Now
                </button>
                <span className="text-xl font-bold">LKR. {getCartTotal().toFixed(2)}</span>
            </div>
        </div>
    );
}