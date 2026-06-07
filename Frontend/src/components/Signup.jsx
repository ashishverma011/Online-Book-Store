import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import Login from "./Login";

function Signup() {
  const [, setAuthUser] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, {
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      });
      const userData = { ...res.data.user, token: res.data.token };
      localStorage.setItem("Users", JSON.stringify(userData));
      setAuthUser(userData);
      toast.success("Account created successfully!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center dark:bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-2 dark:text-white">Create Account</h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
          Join BookStore and start reading today
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium dark:text-white">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              {...register("fullname", { required: "Full name is required" })}
            />
            {errors.fullname && (
              <span className="text-xs text-red-500">{errors.fullname.message}</span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium dark:text-white">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium dark:text-white">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-3 py-2 border rounded-md outline-none dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-500 text-white rounded-md py-2 hover:bg-pink-700 duration-200 font-semibold disabled:opacity-60 mt-2"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-center text-sm dark:text-gray-300">
            Already have an account?{" "}
            <button
              type="button"
              className="text-pink-500 font-semibold hover:underline"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Login
            </button>
          </p>
        </form>
      </div>
      <Login />
    </div>
  );
}

export default Signup;
