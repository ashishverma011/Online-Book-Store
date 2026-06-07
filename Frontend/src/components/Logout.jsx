import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Logout() {
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Users");
    setAuthUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <button
      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 duration-200 font-semibold"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default Logout;
