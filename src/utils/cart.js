// const sampleCart =[
//     {
//         productID: "PROD001",
//         name: "Sample Product 1",
//         price: 1000,
//         labelPrice: 1200,
//         quantity: 2,
//         image: "https://via.placeholder.com/150"
//     },
//     {
//         productID: "PROD002",
//         name: "Sample Product 2",
//         price: 2000,
//         labelPrice: 2500,
//         quantity: 1,
//         image: "https://via.placeholder.com/150"

//     }
// ]



import { toast } from "react-hot-toast";
export function getCart(){
    const cartString = localStorage.getItem("cart");
    if (cartString == null) {
        localStorage.setItem("cart", "[]");
        return[];
    }else{
        const cart = JSON.parse(cartString);
        return cart;
    }
}

export function addToCart(product, quantity){
    const cart = getCart();
    const index = cart.findIndex(
    (item) =>{
         return item.productID === product.productID});
    if (index == -1){
        cart.push({
        productID: product.productID,
        name: product.name,
        price: product.price,
        labelPrice: product.labelPrice,
        quantity: quantity,
        image: product.images[0]
        })
        toast.success(`${product.name} added to cart`);
    }else{
        const newQty = cart[index].quantity + quantity;
        if(newQty<= 0){
            cart.splice(index, 1);
            toast.success(`${product.name} removed from cart`);
        }else{
            cart[index].quantity = newQty;
            toast.success(`Updated ${product.name} quantity to ${newQty}`);
        }
    }
    const cartString = JSON.stringify(cart);
    localStorage.setItem("cart", cartString);
}
export function emptyCart(){
    localStorage.setItem("cart", "[]");
}

export function getCartTotal(){
    let total = 0;
    const cart = getCart();
    cart.forEach(
        (item)=>{
            total += item.price * item.quantity;
        }
    )
    return total;
}