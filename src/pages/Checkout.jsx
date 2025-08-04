import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Simulate getting userId (replace with your auth logic)


const userId = localStorage.getItem("userId");

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

 

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    deliveryAddress: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const order = {
    customerName: formData.customerName,
    email: formData.email,
    foodItem: cartItems.map((item) => ({
      name: item.name,
      quantity: item.quantity,
    })),
    quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    deliveryAddress: formData.deliveryAddress,
    orderTime: new Date().toISOString(),
    status: "Pending",
    userId: userId,
  };

  try {
    const res = await fetch("http://localhost:5000/api/orderFood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!res.ok) throw new Error("Failed to place order");

    clearCart(); // ✅ Clear cart right after successful response
    setShowSuccessModal(true); // ✅ Show modal

  } catch (err) {
    alert("Error placing order. Please try again.");
  }
};

  

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar />
      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6 text-orange-700">Checkout</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow max-w-lg mx-auto"
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Delivery Address</label>
            <textarea
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border p-3 rounded"
            ></textarea>
          </div>

          <div className="mb-4">
            <p>
              <strong>Food Items:</strong>{" "}
              {cartItems
                .map((item) => `${item.name} (x${item.quantity})`)
                .join(", ")}
            </p>
            <p>
              <strong>Total Quantity:</strong>{" "}
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </p>
            <p>
              <strong>Total: #</strong> {total.toFixed(2)}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-3 rounded hover:bg-orange-700"
          >
            Place Order
          </button>
        </form>
      </main>
      <Footer />

      {/* ✅ Beautiful success modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white  bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/dashboard");
              }}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-green-700">
              ✅ Order Placed!
            </h2>
            <p className="text-gray-700 mb-4">
              Your order has been placed successfully. <br />
              Reference: <strong>{userId}</strong>
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/dashboard");
              }}
              className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import {
//   UserCircleIcon,
//   CheckCircleIcon,
//   ClockIcon,
//   XCircleIcon,
// } from "@heroicons/react/24/solid";

// const statusIcon = (status) => {
//   if (status === "Completed")
//     return <CheckCircleIcon className="w-5 h-5 text-green-500 inline mr-1" />;
//   if (status === "Pending")
//     return <ClockIcon className="w-5 h-5 text-yellow-500 inline mr-1" />;
//   return <XCircleIcon className="w-5 h-5 text-red-500 inline mr-1" />;
// };

// const Dashboard = () => {
//   const [user, setUser] = useState({ name: "", email: "" });
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [orderToDelete, setOrderToDelete] = useState(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userRes = await fetch(`http://localhost:5000/api/fetchuser`);
//         if (!userRes.ok) throw new Error("Failed to fetch user");

//         const userData = await userRes.json();
//         if (Array.isArray(userData.users) && userData.users.length > 0) {
//           const firstUser = userData.users[0];
//           setUser({
//             name: firstUser.username || "Unknown",
//             email: firstUser.email || "unknown@example.com",
//           });
//         }

//         const userId = localStorage.getItem("userId");
//         const orderRes = await fetch(`http://localhost:5000/api/orders/${userId}`);
//         if (!orderRes.ok) throw new Error("Failed to fetch user orders");

//         const orderData = await orderRes.json();
//         const fetchedOrders = Array.isArray(orderData.orders)
//           ? orderData.orders
//           : [];
//         setOrders(fetchedOrders);
//       } catch (err) {
//         console.error(err);
//         navigate("/signin");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [navigate]);

//   const handleDelete = async () => {
//     if (!orderToDelete) return;
//     try {
//       await fetch(`http://localhost:5000/api/orders/${orderToDelete}`, {
//         method: "DELETE",
//       });
//       setOrders((prev) => prev.filter((o) => o._id !== orderToDelete));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete order");
//     } finally {
//       setOrderToDelete(null);
//     }
//   };

//   const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
//   const completedCount = orders.filter((o) => o.status === "Completed").length;
//   const pendingCount = orders.filter((o) => o.status === "Pending").length;

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
//       <Navbar />

//       <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
//         {/* User Info */}
//         <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <div className="flex items-center gap-4 mb-4 md:mb-0">
//             <UserCircleIcon className="w-16 h-16 text-orange-400 bg-white rounded-full shadow" />
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-orange-700">
//                 {loading ? "Loading..." : user.name}
//               </h1>
//               <p className="text-gray-500">{loading ? "" : user.email}</p>
//             </div>
//           </div>

//           {/* Summary Cards */}
//           <div className="flex gap-4 flex-wrap">
//             <div className="flex flex-col items-center bg-orange-50 border border-orange-200 rounded-xl px-5 py-3 shadow-sm">
//               <span className="text-xl font-bold text-orange-600">
//                 #{totalSpent.toFixed(2)}
//               </span>
//               <span className="text-xs text-gray-500">Total Spent</span>
//             </div>
//             <div className="flex flex-col items-center bg-green-50 border border-green-200 rounded-xl px-5 py-3 shadow-sm">
//               <span className="text-xl font-bold text-green-600">
//                 {completedCount}
//               </span>
//               <span className="text-xs text-gray-500">Completed</span>
//             </div>
//             <div className="flex flex-col items-center bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-3 shadow-sm">
//               <span className="text-xl font-bold text-yellow-600">
//                 {pendingCount}
//               </span>
//               <span className="text-xs text-gray-500">Pending</span>
//             </div>
//           </div>
//         </div>

//         {/* Orders */}
//         <div>
//           <h2 className="text-xl font-semibold mb-4 text-orange-700">
//             Your Orders
//           </h2>
//           {loading ? (
//             <div className="p-8 text-gray-500 text-lg">Loading orders...</div>
//           ) : orders.length > 0 ? (
//             <div className="grid gap-6 md:grid-cols-2">
//               {orders.map((order, index) => (
//                 <div
//                   key={index}
//                   className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border-l-4 border-orange-400 hover:shadow-lg transition"
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="font-semibold text-gray-700">
//                       Order #{index + 1}
//                     </span>
//                     <span>
//                       {statusIcon(order.status)}
//                       <span
//                         className={`text-xs font-semibold ${
//                           order.status === "Completed"
//                             ? "text-green-600"
//                             : order.status === "Pending"
//                             ? "text-yellow-600"
//                             : "text-red-600"
//                         }`}
//                       >
//                         {order.status}
//                       </span>
//                     </span>
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {order.orderTime
//                       ? new Date(order.orderTime).toLocaleString()
//                       : ""}
//                   </div>
//                   <div className="mt-2">
//                     <span className="font-medium text-gray-600">Items:</span>
//                     <ul className="list-disc pl-5 text-gray-700">
//                       {order.foodItem?.map((item, idx) => (
//                         <li key={idx}>
//                           {item.name}{" "}
//                           <span className="text-xs text-gray-400">
//                             x{item.quantity}
//                           </span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div className="mt-2 flex items-center justify-between">
//                     <span className="font-semibold text-orange-500 text-lg">
//                       {order.total?.toFixed(2)}
//                     </span>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => setOrderToDelete(order._id)}
//                         className="bg-red-500 text-white px-3 py-1 rounded text-xs"
//                       >
//                         Delete
//                       </button>
//                       <a
//                         href="#"
//                         className="bg-green-600 text-white px-3 py-1 rounded text-xs"
//                       >
//                         Pay Now
//                       </a>
//                     </div>
//                   </div>
//                   <div className="text-xs text-gray-400 mt-1">
//                     Delivery: {order.deliveryAddress}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="p-8 text-gray-500 text-lg">No orders found.</div>
//           )}
//         </div>
//       </main>

//       <Footer />

//       {/* ✅ Confirmation Modal */}
//       {orderToDelete && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
//             <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
//             <p className="mb-4 text-gray-600">
//               Are you sure you want to delete this order?
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={() => setOrderToDelete(null)}
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;
