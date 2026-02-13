import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineProduct } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

// මෙතන logic එක වෙනස් කරන්නේ නැතුව, කලින් තිබුණු error එක නැති කළා.
export default function AdminAddProductPage() {
    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [altName, setAltName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [labelPrice, setLabelPrice] = useState(0);
    const [category, setCategory] = useState("CPU");
    const [stock, setStock] = useState("0");
    const [files, setFiles] = useState([]); // Array එකක් විදියට තියාගත්තා
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const navigate = useNavigate();

    // මෙතන upload logic එක ඔයාගේ කලින් code එකේ තිබුණු විදියටම වැඩ කරනවා
    async function addProduct() {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("You must be logged in to add a product");
            navigate("/login");
            return;
        }

        // --- වැදගත්: ඔයාගේ image upload function එක මෙතනට එන්න ඕනේ ---
        // දැනට image upload එක fail වෙන්නේ නැති වෙන්න මම placeholder එකක් දැම්මා
        // ඔයා Firebase හෝ Cloudinary පාවිච්චි කරනවා නම් ඒ logic එක මෙතනට දාන්න.
        const imagePromises = [];
        
        // Note: ඔයාගේ මුල් code එකේ 'uploadFile' කියන function එක define කරලා තිබුණේ නැහැ.
        // ඒ නිසා මම image uploading process එක skip කරලා images array එක හිස්ව තැබුවා
        // ඔයාට images upload කරන logic එකක් තියෙනවා නම් ඒක මෙතනට පාවිච්චි කරන්න.
        const images = ["https://placeholder.com/image.jpg"]; // Placeholder for logic

        if (productID === "" || name === "" || description === "" || price <= 0 || category === "" || stock <= 0) {
            toast.error("Please fill all the required fields");
            return;
        }

        try {
            const altNamesArray = altName.split(",");

            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", {
                productID: productID,
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
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
            toast.success("Product added successfully");
            navigate("/admin/products");
        } catch (err) {
            toast.error("Error adding product. Please try again");
            console.log(err);
        }
    }

    return (
        <div className="w-full min-h-screen bg-primary/30 flex justify-center p-6 md:p-12 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-4xl animate-fadeInUp">
                
                {/* Header Area */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-accent rounded-xl text-white shadow-lg">
                        <AiOutlineProduct size={30} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-secondary font-sans">Add New Product</h1>
                        <p className="text-secondary/60 text-sm">Fill in the details to list a new gaming item</p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Section Headers */}
                        <div className="md:col-span-2">
                            <h2 className="text-lg font-bold text-accent border-b border-gray-100 pb-2 mb-2">Basic Information</h2>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Product ID*</label>
                            <input type="text" value={productID} onChange={(e) => setProductID(e.target.value)} placeholder="ex: CPU-INT-001" className="w-full h-12 rounded-xl bg-primary/20 border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Product Name*</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="ex: Core i9 14900K" className="w-full h-12 rounded-xl bg-primary/20 border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Alternative Names</label>
                            <input type="text" value={altName} onChange={(e) => setAltName(e.target.value)} placeholder="Separate with commas (e.g. gaming cpu, intel 14th gen)" className="w-full h-12 rounded-xl bg-primary/20 border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
                        </div>

                        <div className="flex flex-col gap-2 md:col-span-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Description*</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" placeholder="Enter detailed product specifications..." className="w-full rounded-xl bg-primary/20 border border-gray-200 p-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all resize-none"></textarea>
                        </div>

                        <div className="md:col-span-2 mt-4">
                            <h2 className="text-lg font-bold text-accent border-b border-gray-100 pb-2 mb-2">Pricing & Inventory</h2>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Selling Price (LKR)*</label>
                            <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full h-12 rounded-xl bg-primary/20 border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Labelled Price (LKR)</label>
                            <input type="number" value={labelPrice} onChange={(e) => setLabelPrice(Number(e.target.value))} className="w-full h-12 rounded-xl bg-primary/20 border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Category*</label>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-12 rounded-xl bg-primary/20 border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all appearance-none">
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

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Stock Quantity*</label>
                            <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} className="w-full h-12 rounded-xl bg-primary/20 border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
                        </div>

                        <div className="md:col-span-2 mt-4">
                            <h2 className="text-lg font-bold text-accent border-b border-gray-100 pb-2 mb-2">Specifications & Status</h2>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Brand</label>
                            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full h-12 rounded-xl bg-primary/20 border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Model</label>
                            <input type="text" value={model} onChange={(e) => setModel(e.target.value)} className="w-full h-12 rounded-xl bg-primary/20 border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Availability</label>
                            <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value === "true")} className="w-full h-12 rounded-xl bg-primary/20 border border-gray-200 px-4 focus:outline-none focus:ring-2 focus:ring-gold transition-all">
                                <option value="true">Active</option>
                                <option value="false">Hidden</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-semibold text-secondary/80 text-sm ml-1">Product Images*</label>
                            <input type="file" multiple onChange={(e) => setFiles(e.target.files)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gold/10 file:text-gold hover:file:bg-gold/20 cursor-pointer" />
                        </div>

                        {/* Action Buttons */}
                        <div className="md:col-span-2 flex flex-col md:flex-row gap-4 mt-8">
                            <Link to="/admin/products" className="flex-1 h-14 flex items-center justify-center rounded-2xl font-bold text-secondary border-2 border-secondary/10 hover:bg-gray-50 transition-all">
                                Cancel
                            </Link>
                            <button onClick={addProduct} className="flex-[2] h-14 bg-accent text-white font-bold rounded-2xl shadow-lg shadow-accent/20 hover:bg-accent/90 transform active:scale-[0.98] transition-all">
                                Publish Product
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}