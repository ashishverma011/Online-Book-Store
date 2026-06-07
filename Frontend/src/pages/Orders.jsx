import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("Users")).token;
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/order/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch {
        setOrders([]);
      }
    };
    fetchOrders();
  }, []);

  const statusColor = {
    pending: "badge-warning",
    processing: "badge-info",
    shipped: "badge-primary",
    delivered: "badge-success",
    cancelled: "badge-error",
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 min-h-screen pt-28 pb-10 dark:bg-slate-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">My Orders 📦</h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500 mt-20 text-xl">No orders yet!</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-base-100 dark:bg-slate-800 rounded-xl shadow p-5"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-400">
                    Order ID: {order._id.slice(-8).toUpperCase()}
                  </span>
                  <span className={`badge ${statusColor[order.status]} text-white capitalize`}>
                    {order.status}
                  </span>
                </div>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          e.target.src =
                            "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg";
                        }}
                      />
                      <div>
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-400">
                          ${item.price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="divider my-2"></div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className="font-bold text-pink-500">Total: ${order.totalAmount}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Orders;
