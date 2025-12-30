import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-hot-toast";



Modal.setAppElement("#root");

export default function ViewOrderInfo(props) {
  const order = props.order;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState(order.notes || "");
  const [status, setStatus] = useState(order.status || "Pending");

  return (
    <>
      {/* View Button */}
      <button
        className="bg-accent/80 hover:bg-accent transition p-2 rounded-lg text-white cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        View Info
      </button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-primary max-w-4xl mx-auto mt-20 rounded-2xl shadow-2xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
      >
        <div className="p-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-2xl font-bold text-secondary">
              🧾 Order Details
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2 text-sm">
              <p><span className="font-semibold">Order ID:</span> {order.orderId}</p>
              <p><span className="font-semibold">Customer:</span> {order.name}</p>
              <p><span className="font-semibold">Email:</span> {order.email}</p>
              <p><span className="font-semibold">Phone:</span> {order.phone || "—"}</p>
            </div>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Order Date:</span>{" "}
                {new Date(order.date).toLocaleString()}
              </p>
              
              <p className="flex items-center gap-2">
  <span className="font-semibold">Status:</span>
  <div className="flex flex-row items-center">
    {/* මෙතන order.status වෙනුවට status භාවිතා කරන්න */}
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold mr-4
        ${
          status === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : status === "Completed"
            ? "bg-green-100 text-green-700"
            : status === "Cancelled"
            ? "bg-red-100 text-red-700" // Cancelled සඳහා රතු පැහැය
            : "bg-blue-100 text-blue-700" // Processing සඳහා නිල් පැහැය
        }`}
    >
      {status}
    </span>

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
      className="p-1 rounded border text-sm"
    >
      <option value="Pending">Pending</option>
      <option value="Processing">Processing</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  </div>
</p>

              <p>
                <span className="font-semibold">Total:</span>{" "}
                <span className="text-gold font-bold">
                  Rs. {order.total.toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">📍 Delivery Address</h3>
            <p className="text-sm text-gray-700 bg-gray-100 p-3 rounded-lg">
              {order.address}
            </p>
          </div>

          {/* Notes */}
          
            <div className="mb-6">
              <p className="font-semibold text-lg mb-2">📝 Additional Notes</p>
              <textarea className="text-sm text-gray-700 bg-white p-3 rounded-lg w-full" 
              value={notes} 
              onChange={(e) => {
                if(e.target.value == "") {
                  setNotes(null)
                } else {
              setNotes(e.target.value)}} 
                }
                
              ></textarea>
            </div>
          

          {/* Items */}
          <div>
            <h3 className="font-semibold text-lg mb-4">🛒 Ordered Items</h3>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center bg-white rounded-xl shadow p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-secondary">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Product ID: {item.productID}
                    </p>
                    <p className="text-sm">
                      Price: Rs. {item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold text-gold">
                      Rs. {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-end gap-2">
             {(order.notes !== notes || order.status != status) && 
             
                <button
                
              onClick={() => {
                const token = localStorage.getItem("token");
                axios.put(import.meta.env.VITE_BACKEND_URL + `/api/orders/${order._id}`,{
                notes: status,
              notes:notes},
              {                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
             ).then(()=>{
                toast.success("Order updated successfully");
                setIsModalOpen(false);
                window.location.reload();
             }).catch(()=>{
                toast.error("Error updating order");
             });
              }
              }
              
              className="px-6 py-2 rounded-lg bg-secondary text-white hover:opacity-90 transition"
            >
              Save Changes

            </button>}
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 rounded-lg bg-secondary text-white hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
