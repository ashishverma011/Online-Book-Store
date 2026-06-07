import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow p-6 flex items-center gap-4 border-l-4 ${color}`}>
      <span className="text-4xl">{icon}</span>
      <div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
        <h2 className="text-3xl font-extrabold dark:text-white">{value}</h2>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("Users")).token;
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch {
        setStats(null);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Dashboard</h1>
      {loading ? (
        <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-pink-500"></span></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard icon="👥" label="Total Users" value={stats?.totalUsers ?? 0} color="border-blue-500" />
          <StatCard icon="📚" label="Total Books" value={stats?.totalBooks ?? 0} color="border-pink-500" />
          <StatCard icon="🛒" label="Total Orders" value={stats?.totalOrders ?? 0} color="border-yellow-500" />
          <StatCard icon="💰" label="Total Revenue" value={`$${stats?.totalRevenue ?? 0}`} color="border-green-500" />
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminDashboard;
