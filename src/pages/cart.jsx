import {useState} from "react";
import {getCart} from "../utils/cart";
import {BsChevronUp, BsChevronDown} from "react-icons/bs";
import { addToCart } from "../utils/cart.js";
import { getCartTotal } from "../utils/cart.js";
import { Link } from "react-router-dom";


export default function CartPage(){
    const [cart, setCart] = useState(getCart());
    console.log("Cart contents:", cart);
    return(
        <div className="w-full flex flex-col items-center p-[20px]" >
            {
                cart.map(
                    (item , index)=>{
                        return(
                            <div key={index} className="w-full lg:w-[50%] pt-[20px] relative lg:h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between">
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
                            <div className="hidden lg:flex flex-col justify-center pl-5 gap-2 flex-1">
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
                                <h2 className="text-sm gap-0 flex flex-col text-secondary/80">Quantity: {item.quantity}</h2>
                                <h3 className="text-lg mt-2">{item.productID}</h3>
                            </div>
                            <div className="min-h-full flex flex-row items-center gap-4">
                                <div className="h-full flex flex-col justify-center items-center">
                                    <BsChevronUp
                                       onClick={()=>{
                                        addToCart(item, 1);
                                        const newCart = getCart();
                                        setCart(newCart);
                                       }}
                                     className="text-2xl hover:text-accent cursor-pointer"/>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <BsChevronDown
                                       onClick={()=>{
                                        addToCart(item, -1);
                                        const newCart = getCart();
                                        setCart(newCart);
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
            <div className="w-full lg:w-[50%] h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between items-center">
                <Link to="/checkout" className="self-center ml-4 px-6 py-3 rounded bg-accent text-white hover:bg-accent/90 transition"
                state={
                    cart
                }
                >
                Checkout</Link>
                <span className="pr-4 text-xl font-bold w-[150px] text-right">LKR. {getCartTotal().toFixed(2)}</span>
            </div>

        </div>
    );
}