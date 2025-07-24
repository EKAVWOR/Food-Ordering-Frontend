import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      <Navbar />
      <main className="flex-grow container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6 text-orange-700">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border-b py-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="font-bold">{item.name}</h2>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-16 border p-1 rounded"
                  />
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="text-right mt-6 font-bold text-xl">
              Total: #{total.toFixed(2)}
            </div>
            <div className="text-right mt-4">
              <Link
                to="/signin"
                className="inline-block bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
