import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function ProductDeleteButton(props) {
    const productID = props.productId;
    const reload=props.reload;
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDelete() {
        setIsDeleting(true);
        const token = localStorage.getItem("token");

        axios.delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productID, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(() => {
            toast.success("Product deleted successfully");
            setIsDeleting(false);
            setIsMessageOpen(false);
            reload();
            
            
            if (props.onDeleteSuccess) {
                props.onDeleteSuccess();
            }
        })
        .catch((error) => {
            console.error(error);
            toast.error("Error deleting product");
            setIsDeleting(false);
        });
    }

    return (
        <>
            {/* පළමු Button එක - මෙහිදී handleDelete call නොකරන්න */}
            <button 
                onClick={() => setIsMessageOpen(true)} 
                className="bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-full text-xs font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 active:scale-95 shadow-sm"
            >
                Delete
            </button>

            {isMessageOpen && (
                <div className="w-screen h-screen inset-0 z-[9999] fixed top-0 left-0 bg-black/55 flex justify-center items-center"> 
                    <div className="w-[600px] h-[300px] bg-white rounded-2xl relative flex flex-col items-center justify-center p-6 shadow-2xl">
                        
                        {/* වසන (X) බොත්තම */}
                        <button 
                            onClick={() => setIsMessageOpen(false)} 
                            className="w-[40px] h-[40px] bg-red-600 rounded-full text-white text-xl font-bold cursor-pointer hover:bg-red-800 absolute right-[-15px] top-[-15px] shadow-md"
                        >
                            ×
                        </button>

                        <h1 className="text-center text-2xl font-bold mb-8 text-gray-800">
                            Are you sure you want to delete this product?
                        </h1>

                        <div className="flex gap-4">
                            {/* Popup එකේ ඇති Delete Button එක - handleDelete call කරන්නේ මෙතැනදී පමණි */}
                            <button
                                disabled={isDeleting}
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-8 py-2 rounded-full font-bold hover:bg-red-700 transition-all active:scale-95 disabled:bg-gray-400"
                            >
                                {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </button>

                            {/* Cancel බොත්තම */}
                            <button 
                                onClick={() => setIsMessageOpen(false)}
                                className="bg-gray-200 text-gray-700 px-8 py-2 rounded-full font-bold hover:bg-gray-300 transition-all active:scale-95 ml-4"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}