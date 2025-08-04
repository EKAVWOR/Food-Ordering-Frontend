import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("orders");

  // State for Orders
  const [orders, setOrders] = useState([]);

  // State for Menu
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({ name: "", price: "" });

  // Load Orders and Meals when page loads
  useEffect(() => {
    fetchOrders();
    fetchMeals();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch("http://localhost:5000/api/fetchorder");
    const data = await res.json();
    setOrders(data.users);
  };

  const fetchMeals = async () => {
    const res = await fetch("http://localhost:5000/api/meals");
    const data = await res.json();
    setMeals(data.meals);
  };

  const addMeal = async () => {
  const formData = new FormData();
  formData.append("name", newMeal.name);
  formData.append("description", newMeal.description);
  formData.append("price", newMeal.price);
  formData.append("image", newMeal.file); // ✅ image file

  await fetch("http://localhost:5000/api/meals", {
    method: "POST",
    body: formData,
  });

  setNewMeal({ name: "", description: "", price: "", file: null });
  fetchMeals();
};


  const deleteMeal = async (id) => {
    await fetch(`http://localhost:5000/api/meals/${id}`, {
      method: "DELETE",
    });
    fetchMeals();
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/order/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchOrders();
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col">
      <header className="bg-orange-600 text-white p-4 text-center text-2xl font-bold">
        Admin Dashboard
      </header>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-orange-50 p-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`block w-full text-left p-2 mb-2 rounded ${
              activeTab === "orders" ? "bg-orange-600 text-white" : "bg-white"
            }`}
          >
            View Orders
          </button>
          <button
            onClick={() => setActiveTab("menu")}
            className={`block w-full text-left p-2 mb-2 rounded ${
              activeTab === "menu" ? "bg-orange-600 text-white" : "bg-white"
            }`}
          >
            Manage Menu
          </button>
          <button
            onClick={() => setActiveTab("delivery")}
            className={`block w-full text-left p-2 mb-2 rounded ${
              activeTab === "delivery" ? "bg-orange-600 text-white" : "bg-white"
            }`}
          >
            Delivery Dashboard
          </button>
        </aside>

        {/* Content */}
        <main className="flex-grow p-6">
          {activeTab === "orders" && (
            <div>
              <h2 className="text-xl font-bold mb-4">All Orders</h2>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Food Items</th>
                    <th className="border p-2">Qty</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="border p-2">{order.customerName}</td>
                      <td className="border p-2">{order.email}</td>
                      <td className="border p-2">
                        {order.foodItem
                          .map((f) => `${f.name} (x${f.quantity})`)
                          .join(", ")}
                      </td>
                      <td className="border p-2">{order.quantity}</td>
                      <td className="border p-2">{order.status}</td>
                      <td className="border p-2">
                        {new Date(order.orderTime).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}





          {activeTab === "menu" && (
  <div>
    <h2 className="text-xl font-bold mb-4">Manage Menu</h2>

    <div className="mb-4 flex flex-col gap-2 w-full max-w-md">
      <input
        type="text"
        placeholder="Meal name"
        value={newMeal.name || ""}
        onChange={(e) =>
          setNewMeal({ ...newMeal, name: e.target.value })
        }
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={newMeal.description || ""}
        onChange={(e) =>
          setNewMeal({ ...newMeal, description: e.target.value })
        }
        className="border p-2 rounded"
      ></textarea>
      <input
        type="text"
        placeholder="Price"
        value={newMeal.price || ""}
        onChange={(e) =>
          setNewMeal({ ...newMeal, price: e.target.value })
        }
        className="border p-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setNewMeal({ ...newMeal, file });
          }
        }}
        className="border p-2 rounded"
      />

      <button
        onClick={addMeal}
        className="bg-green-600 text-white px-4 py-2 rounded w-fit"
      >
        Add Meal
      </button>
    </div>

    <table className="w-full border mt-6">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Name</th>
          <th className="border p-2">Description</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Image</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {meals.map((meal) => (
          <tr key={meal._id}>
            <td className="border p-2">{meal.name}</td>
            <td className="border p-2">{meal.description}</td>
            <td className="border p-2">₦{meal.price}</td>
            <td className="border p-2">
              {meal.image && (
                <img
                  src={`http://localhost:5000/${meal.image}`}
                  alt={meal.name}
                  className="w-16 h-16 object-cover"
                />
              )}
            </td>
            <td className="border p-2">
              <button
                onClick={() => deleteMeal(meal._id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}







          {activeTab === "delivery" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Delivery Dashboard</h2>
              <table className="w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Status</th>
                    <th className="border p-2">Mark Delivered</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="border p-2">{order.customerName}</td>
                      <td className="border p-2">{order.status}</td>
                      <td className="border p-2 text-center">
                        <input
                          type="checkbox"
                          checked={order.status === "Delivered"}
                          onChange={(e) =>
                            updateStatus(
                              order._id,
                              e.target.checked ? "Delivered" : "Pending"
                            )
                          }
                          className="w-5 h-5"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}



        </main>
      </div>
    </div>
    <Footer/>
    </>

  );
};

export default Admin;
