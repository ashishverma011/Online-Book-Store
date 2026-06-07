import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQty, fetchCart } = useCart();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const total = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  const handleOrder = async () => {
    if (!address.trim()) return toast.error("Please enter delivery address");
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("Users")).token;
      await axios.post(
        `${import.meta.env.VITE_API_URL}/order`,
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Order placed successfully!");
      fetchCart();
      navigate("/orders");
    } catch {
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 min-h-screen pt-28 pb-10 dark:bg-slate-900 dark:text-white">
        <h1 className="text-3xl font-bold mb-8 text-center">Your Cart 🛒</h1>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p className="text-xl">Your cart is empty!</p>
            <button
              onClick={() => navigate("/course")}
              className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-700 duration-300"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.book._id}
                  className="flex items-center gap-4 p-4 bg-base-100 dark:bg-slate-800 rounded-xl shadow"
                >
                  <img
                    src={item.book.image}
                    alt={item.book.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src =
                        "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg";
                    }}
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-base">{item.book.name}</h2>
                    <p className="text-pink-500 font-semibold">
                      ${item.book.price} x {item.quantity} = ${item.book.price * item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.book._id, item.quantity - 1)}
                      className="btn btn-xs btn-outline"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.book._id, item.quantity + 1)}
                      className="btn btn-xs btn-outline"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.book._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-80 bg-base-100 dark:bg-slate-800 rounded-xl shadow p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Items ({cart.length})</span>
                <span>${total}</span>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total</span>
                <span className="text-pink-500">${total}</span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full mb-4 dark:bg-slate-700 dark:text-white"
                placeholder="Enter delivery address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
              />
              <button
                onClick={handleOrder}
                disabled={loading}
                className="btn w-full bg-pink-500 hover:bg-pink-700 text-white border-none"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
