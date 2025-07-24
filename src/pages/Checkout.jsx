import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Simulate getting userId (replace with your auth logic)
const getUserId = () => localStorage.getItem("userId");

const Checkout = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

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
      userId: getUserId(),
    };

    try {
      const res = await fetch("http://localhost:5000/api/orderFood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!res.ok) throw new Error("Failed to place order");

      alert("Order placed successfully!");
      navigate("/dashboard");
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
              <strong>Total: #</strong>{" "}
              {total.toFixed(2)}
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
    </div>
  );
};

export default Checkout;