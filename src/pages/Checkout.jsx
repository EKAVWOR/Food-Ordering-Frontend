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

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   const order = {
//     customerName: formData.customerName,
//     email: formData.email,
//     foodItem: cartItems.map((item) => ({
//       name: item.name,
//       quantity: item.quantity,
//     })),
//     quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
//     deliveryAddress: formData.deliveryAddress,
//     orderTime: new Date().toISOString(),
//     status: "Pending",
//     userId: userId,
//   };

//   try {
//     const res = await fetch("http://localhost:5000/api/orderFood", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(order),
//     });

//     if (!res.ok) throw new Error("Failed to place order");

//     clearCart(); // ✅ Clear cart right after successful response
//     setShowSuccessModal(true); // ✅ Show modal

//   } catch (err) {
//     alert("Error placing order. Please try again.");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();

  const userId = localStorage.getItem("userId");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.customerName || !formData.email || !formData.deliveryAddress) {
    return alert("Please fill in all fields.");
  }

  if (!emailRegex.test(formData.email)) {
    return alert("Please enter a valid email address.");
  }

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
    userId,
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEDURL}/api/orderFood`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    if (!res.ok) throw new Error("Failed to place order");

    clearCart();
    setShowSuccessModal(true);
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


