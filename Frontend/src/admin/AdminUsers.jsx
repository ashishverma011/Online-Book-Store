import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import toast from "react-hot-toast";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");

  const getToken = () => JSON.parse(localStorage.getItem("Users")).token;

  const fetchUsers = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setUsers(res.data);
    } catch {
      setUsers([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      toast.success("User deleted!");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
  };

  const filtered = users.filter((u) =>
    u.fullname?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold dark:text-white">All Users</h1>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered input-sm dark:bg-slate-700 dark:text-white"
        />
      </div>

      {fetching ? (
        <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-pink-500"></span></div>
      ) : (
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow">
        <table className="table w-full">
          <thead>
            <tr className="dark:text-gray-300">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user, i) => (
              <tr key={user._id} className="dark:text-gray-200">
                <td>{i + 1}</td>
                <td className="font-semibold">{user.fullname}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === "admin" ? "badge-error" : "badge-success"} text-white capitalize`}>
                    {user.role}
                  </span>
                </td>
                <td className="text-gray-400 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  {user.role !== "admin" && (
                    <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-error text-white">
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </AdminLayout>
  );
}

export default AdminUsers;
