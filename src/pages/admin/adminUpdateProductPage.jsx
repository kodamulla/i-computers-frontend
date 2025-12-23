import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { uploadFile } from "../../utils/mediaUpload.js";
import { useLocation } from "react-router-dom";




export default function AdminUpdateProductPage() {
    const location = useLocation();
    const [files, setFiles] = useState([]);
    const [productID, setProductID] = useState(location.state.productID);
    const [name, setName] = useState(location.state.name);
    const [altName, setAltName] = useState(location.state.altNames.join(","));
    const [description, setDescription] = useState(location.state.description);
    const [price, setPrice] = useState(location.state.price);
    const [labelPrice, setLabelPrice] = useState(location.state.labelPrice);
    const [category, setCategory] = useState(location.state.category);
    const [stock, setStock] = useState("0");
   
    const [brand, setBrand] = useState(location.state.brand);
    const [model, setModel] = useState(location.state.model);
    const[isAvailable, setIsAvailable] = useState(location.state.isAvailable);
    const navigate = useNavigate();

    if(!location.state){
        window.location.href = "/admin/products";
    }


    async function updateProduct(){

        
        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("You must be logged in to update a product");
            navigate("/login");
            return;
        }

        
        const imagePromises = []
        
    //     files.forEach((file) => {
    //         const promise = upload(file);
    //         imagePromises.push(promise);
    //     }
    // )

    for (let i = 0; i < files.length; i++) {
        const promise = uploadFile(files[i]);
        imagePromises.push(promise);
    }

    let images = await Promise.all(imagePromises).catch((error) => {
        toast.error("Error uploading images. Please try again.");
        console.log(error);
        return;
    });

        if(images.length==0){
            images = location.state.images;
        }
        if(productID=="" || name=="" || description=="" || price <= 0 || category=="" || stock <=0 || images==""){
            toast.error("Please fill all the required fields");
            return;

    }
    try{
        const altNamesArray = altName.split(",")
       
        await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productID, {
           
            name: name,
            altNames: altNamesArray,
            description: description,
            price: price,
            labelPrice: labelPrice,
            category: category,
            stock: stock,
            images: images,
            brand: brand,
            model: model,
            isAvailable: isAvailable
        },{
            headers: {
                Authorization: "Bearer " +token
            }
        });
        toast.success("Product updated successfully");
        navigate("/admin/products");
    }catch(err){
        toast.error("Error updating product.Please try again");
       
        console.log(err);
        }
    }
    
    


    return (
        <div className="w-full h-full flex justify-center p-[50px] items-start overflow-y-scroll ">
           <div className=" bg-accent/80 rounded-2xl p-[40px] h-auto w-[800px] shadow-2xl  ">
           <h1 className="w-full text-xl text-primary  mb-[20px] flex  items-center gap-[5px]"><AiOutlineProduct />Update Product</h1>
           <div className="w-full bg-white p-[20px] flex flex-row flex-wrap justify-between rounded-xl shadow-2xl">
            
            <div className="my-[10px] w-[40%]">
            <label>Product ID</label>
            <input disabled type="text" value={productID} onChange={(e) => setProductID(e.target.value)} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]" />
            
            </div>
            <div className="my-[10px] w-[40%]">
            <label>Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]" />
            </div>
            <div className="my-[10px] w-full">
            <label>Alternative Name</label>
            <input type="text" value={altName} onChange={(e) => setAltName(e.target.value)} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]" />
            <p className="text-sm text-gray-500 w-full text-right">Separate multiple names with commas</p>
            </div>
            <div className="my-[10px] w-full">
            <label>Description</label>
            <textarea  value={description} onChange={(e) => setDescription(e.target.value)} className="w-full h-[100px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]" ></textarea>
            </div>
            <div className="my-[10px] w-[40%]">
            <label>Price</label>
            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]" />
            </div>
            <div className="my-[10px] w-[40%]">
            <label>LabelledPrice</label>
            <input type="number" value={labelPrice} onChange={(e) => setLabelPrice(Number(e.target.value))} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]" />
            </div>
            <div className="my-[10px] w-full">
            <label>Images</label>
            <input 
            type="file" 
            multiple={true}
            onChange={(e) => setFiles(e.target.files)}
            
            

            
            className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]" />
            </div>
            <div className="my-[10px] flex flex-col w-[30%]">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]">
                <option value="CPU">CPU</option>
                <option value="Graphic Cards">Graphic Cards</option>
                <option value="Motherboards">Motherboards</option>
                <option value="RAM">RAM</option>
                <option value="Storage Devices">Storage Devices</option>
                <option value="Power Supplies">Power Supplies</option>
                <option value="Computer Cases">Computer Cases</option>
                <option value="Cooling Solutions">Cooling Solutions</option>
                <option value="Mouse and Keyboard">Mouse and Keyboard</option>
                <option value="Monitors">Monitors</option>
                <option value="Computers">Computers</option>
                <option value="Accessories">Accessories</option>
                <option value="Laptops">Laptops</option>
                <option value="Cables">Cables</option>
                <option value="Others">Others</option>

            </select>
            </div>
             <div className="my-[10px] w-[30%]">
            <label>Brand</label>
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]" />
            </div>
             <div className="my-[10px] w-[30%]">
            <label>Model</label>
            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]" />
            </div>
            <div className="my-[10px] w-[40%]">
            <label>Stock</label>
            <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]" />
            </div>
           <div className="my-[10px] w-[40%]">
    <label>Availability</label>
    <select 
        value={isAvailable} 
        onChange={(e) => setIsAvailable(e.target.value === "true")} 
        className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
    >
        <option value="true">Available</option>
        <option value="false">Not Available</option>
    </select>
    </div>
    <div className="flex justify-between items-center w-full mt-[20px] gap-4">
    
    <Link 
        to="/admin/products" 
        className="w-[50%] h-[50px] bg-red-500 text-white font-bold flex justify-center items-center rounded-2xl  hover:bg-red-700"
    >
        Cancel
    </Link>

    <button onClick={updateProduct}
        className="w-[50%] h-[50px] bg-accent text-white font-bold flex justify-center items-center rounded-2xl  hover:bg-accent/80"
    >
        Update Product
    </button>
    
</div>
            
           </div>
           </div>

        </div>

    );

}
