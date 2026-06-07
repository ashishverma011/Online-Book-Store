import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
        email: data.email,
        password: data.password,
      });
      const userData = { ...res.data.user, token: res.data.token };
      localStorage.setItem("Users", JSON.stringify(userData));
      setAuthUser(userData);
      toast.success("Logged in successfully!");
      document.getElementById("my_modal_3").close();
      navigate(userData.role === "admin" ? "/admin" : "/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box dark:bg-slate-800 dark:text-white">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={() => document.getElementById("my_modal_3").close()}
        >
          ✕
        </button>

        <h3 className="font-bold text-xl mb-6">Welcome Back 👋</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700 dark:border-slate-600"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700 dark:border-slate-600"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-500 text-white rounded-md py-2 hover:bg-pink-700 duration-200 font-semibold disabled:opacity-60"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-pink-500 font-semibold hover:underline"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default Login;
