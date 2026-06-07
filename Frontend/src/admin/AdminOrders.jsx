import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import toast from "react-hot-toast";

const statusOptions = ["pending", "processing", "shipped", "delivered", "cancelled"];
const statusColor = {
  pending: "badge-warning",
  processing: "badge-info",
  shipped: "badge-primary",
  delivered: "badge-success",
  cancelled: "badge-error",
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  const getToken = () => JSON.parse(localStorage.getItem("Users")).token;

  const fetchOrders = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/order/all`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setOrders(res.data);
    } catch {
      setOrders([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/order/${orderId}/status`, { status }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      toast.success("Status updated!");
      fetchOrders();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">All Orders</h1>

      {fetching ? (
        <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-pink-500"></span></div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500 mt-20 text-xl">No orders yet!</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-slate-800 rounded-xl shadow p-5">
              <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
                <div>
                  <span className="text-sm text-gray-400">Order ID: {order._id.slice(-8).toUpperCase()}</span>
                  <p className="text-sm font-semibold dark:text-white">
                    {order.user?.fullname} — <span className="text-gray-400">{order.user?.email}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`badge ${statusColor[order.status]} text-white capitalize`}>{order.status}</span>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="select select-bordered select-sm dark:bg-slate-700 dark:text-white"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded"
                      onError={(e) => { e.target.src = "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg"; }} />
                    <div>
                      <p className="text-sm font-semibold dark:text-white">{item.name}</p>
                      <p className="text-xs text-gray-400">${item.price} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                <span className="font-bold text-pink-500">Total: ${order.totalAmount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminOrders;
