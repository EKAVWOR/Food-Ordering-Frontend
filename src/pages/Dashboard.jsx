import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  UserCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

// Status icon helper
const statusIcon = (status) => {
  if (status === "Completed")
    return <CheckCircleIcon className="w-5 h-5 text-green-500 inline mr-1" />;
  if (status === "Pending")
    return <ClockIcon className="w-5 h-5 text-yellow-500 inline mr-1" />;
  return <XCircleIcon className="w-5 h-5 text-red-500 inline mr-1" />;
};

const Dashboard = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ First: fetch user — no token needed
        const userRes = await fetch(`http://localhost:5000/api/fetchuser`);
        if (!userRes.ok) throw new Error("Failed to fetch user");

        const userData = await userRes.json();
        if (Array.isArray(userData.users) && userData.users.length > 0) {
          const firstUser = userData.users[0];
          setUser({
            name: firstUser.username || "Unknown",
            email: firstUser.email || "unknown@example.com",
          });
        }

        // ✅ Then: fetch orders — requires auth token
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/signin");
          return;
        }

        const orderRes = await fetch(`http://localhost:5000/api/fetchorder`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (orderRes.status === 401) {
          localStorage.removeItem("token");
          navigate("/signin");
          return;
        }

        if (!orderRes.ok) throw new Error("Failed to fetch orders");

        const orderData = await orderRes.json();
        const fetchedOrders = Array.isArray(orderData.users)
          ? orderData.users
          : [];
        setOrders(fetchedOrders);

      } catch (err) {
        console.error(err);
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const completedCount = orders.filter((o) => o.status === "Completed").length;
  const pendingCount = orders.filter((o) => o.status === "Pending").length;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">
        {/* User Info */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <UserCircleIcon className="w-16 h-16 text-orange-400 bg-white rounded-full shadow" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-orange-700">
                {loading ? "Loading..." : user.name}
              </h1>
              <p className="text-gray-500">{loading ? "" : user.email}</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col items-center bg-orange-50 border border-orange-200 rounded-xl px-5 py-3 shadow-sm">
              <span className="text-xl font-bold text-orange-600">
                #{totalSpent.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500">Total Spent</span>
            </div>
            <div className="flex flex-col items-center bg-green-50 border border-green-200 rounded-xl px-5 py-3 shadow-sm">
              <span className="text-xl font-bold text-green-600">
                {completedCount}
              </span>
              <span className="text-xs text-gray-500">Completed</span>
            </div>
            <div className="flex flex-col items-center bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-3 shadow-sm">
              <span className="text-xl font-bold text-yellow-600">
                {pendingCount}
              </span>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-orange-700">
            Your Orders
          </h2>
          {loading ? (
            <div className="p-8 text-gray-500 text-lg">Loading orders...</div>
          ) : orders.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow p-6 flex flex-col gap-2 border-l-4 border-orange-400 hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-700">
                      Order #{index + 1}
                    </span>
                    <span>
                      {statusIcon(order.status)}
                      <span
                        className={`text-xs font-semibold ${
                          order.status === "Completed"
                            ? "text-green-600"
                            : order.status === "Pending"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.orderTime
                      ? new Date(order.orderTime).toLocaleString()
                      : ""}
                  </div>
                  <div className="mt-2">
                    <span className="font-medium text-gray-600">Items:</span>
                    <ul className="list-disc pl-5 text-gray-700">
                      {order.foodItem?.map((item, idx) => (
                        <li key={idx}>
                          {item.name}{" "}
                          <span className="text-xs text-gray-400">
                            x{item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-orange-500 text-lg">
                      {order.total?.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Delivery: {order.deliveryAddress}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-gray-500 text-lg">No orders found.</div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
