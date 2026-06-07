import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function AdminLayout({ children }) {
  const [, setAuthUser] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { path: "/admin", label: "Dashboard", icon: "📊" },
    { path: "/admin/books", label: "Books", icon: "📚" },
    { path: "/admin/orders", label: "Orders", icon: "🛒" },
    { path: "/admin/users", label: "Users", icon: "👥" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("Users");
    setAuthUser(undefined);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 shadow-xl transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:inset-auto`}>
        <div className="flex items-center justify-between px-6 py-5 border-b dark:border-slate-700">
          <span className="text-xl font-extrabold text-pink-500">📚 Admin Panel</span>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        <nav className="mt-6 flex flex-col gap-1 px-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                location.pathname === link.path
                  ? "bg-pink-500 text-white shadow"
                  : "text-gray-600 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-slate-700"
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-6 left-0 right-0 px-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 font-medium"
          >
            <span className="text-xl">🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white dark:bg-slate-800 shadow px-6 py-4 flex items-center justify-between lg:justify-end">
          <button className="lg:hidden text-2xl" onClick={() => setSidebarOpen(true)}>☰</button>
          <Link to="/" className="text-sm text-pink-500 font-semibold hover:underline">← Back to Store</Link>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
