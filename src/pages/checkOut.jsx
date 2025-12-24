import {useState} from "react";

import {BsChevronUp, BsChevronDown} from "react-icons/bs";
import {useLocation, useNavigate} from "react-router-dom";




export default function CheckoutPage(){
    const location = useLocation();
    const navigate = useNavigate();
    const [cart, setCart] = useState(location.state);
    if (location.state == null) {
        navigate("/products");
    }
    
    function getCartTotal() {
        let total = 0;
        cart.forEach(
            (item)=>{
                total += item.price * item.quantity;
            }
        )
        return total;
    }
    
    return(
        <div className="w-full flex flex-col items-center p-[20px]" >
            {
                cart.map(
                    (item ,)=>{
                        return(
                            <div className="w-[50%] h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between">
                            <img src={item.image} className=" h-full aspect-square object-cover"/>
                            <div className="flex flex-col justify-center pl-5 gap-2 w-[300px]">
                                <h1 className="text-2xl font-semibold relative hover:[&_.tooltip]:opacity-100">
                                    <span className=" opacity-0 tooltip italic text-sm absolute bottom-[-20px] bg-accent text-white p-2 rounded-lg">{item.name}</span>
                                    {item.name .length > 20 ? item.name.substring(0,20) + "..." : item.name}
                                    </h1>
                                {
                                    item.labelPrice > item.price &&
                                    <h2 className="text-lg text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-xl">
                                      LKR. {item.labelPrice.toFixed(2)}
                                      </h2>
                                }
                                <h2 className="text-lg text-secondary/80">Quantity: {item.quantity}</h2>
                                <h3 className="text-lg mt-2">{item.productID}</h3>
                            </div>
                            <div className="h-full flex flex-row items-center gap-4">
                                <div className="h-full flex flex-col justify-center items-center">
                                    <BsChevronUp
                                       onClick={()=>{
                                        const copiedCart = [...cart];
                                        copiedCart[index].quantity += 1;
                                        setCart(copiedCart);
                                       }}
                                     className="text-2xl hover:text-accent cursor-pointer"/>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <BsChevronDown
                                       onClick={()=>{
                                        const copiedCart = [...cart];
                                        copiedCart[index].quantity -= 1;
                                        if (copiedCart[index].quantity <= 1) {
                                            copiedCart.splice(index, 1);
                                        }
                                        setCart(copiedCart);
                                       }}
                                    className="text-2xl hover:text-accent cursor-pointer"/>

                                </div>
                                <span className="pr-4 text-lg font-semibold w-[150px] text-right">LKR. {(item.price * item.quantity).toFixed(2)}</span>

                            </div>
                                </div>
                        )
                    }
                )
            }
            <div className="w-[50%] h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between items-center">
                <button className="self-center ml-4 px-6 py-3 rounded bg-accent text-white hover:bg-accent/90 transition"
                >
                    Order Now
                </button>
                <span className="pr-4 text-xl font-bold min-w-[150px] text-right">
                    LKR. {getCartTotal().toFixed(2)}
                    </span>
            </div>

        </div>
    );
}