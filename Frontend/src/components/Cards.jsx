import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function Cards({ item }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [authUser] = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!authUser) return toast.error("Please login to add to cart");
    setAdding(true);
    const success = await addToCart(item._id);
    setAdding(false);
    if (success) {
      setShowModal(true);
    } else {
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  return (
    <>
      <div className="mt-4 my-3 p-3">
        <div className="card w-full bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border rounded-2xl overflow-hidden">
          <figure
            className="relative h-48 overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 dark:from-slate-800 dark:to-slate-700 cursor-pointer"
            onClick={() => navigate(`/book/${item._id}`)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg";
              }}
            />
            <div className="absolute top-2 right-2">
              <span
                className={`badge text-white font-semibold ${
                  item.category === "Free" ? "badge-success" : "badge-warning"
                }`}
              >
                {item.category}
              </span>
            </div>
          </figure>
          <div className="card-body p-4">
            <h2
              className="card-title text-base font-bold cursor-pointer hover:text-pink-500 duration-200 line-clamp-1"
              onClick={() => navigate(`/book/${item._id}`)}
            >
              {item.name}
            </h2>
            <p className="text-xs text-pink-400 font-semibold uppercase tracking-wide">
              {item.title}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
              {item.description}
            </p>
            <div className="card-actions justify-between items-center mt-3">
              <div className="text-lg font-bold text-pink-500">
                ${item.price}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="btn btn-sm bg-pink-500 hover:bg-pink-700 text-white border-none rounded-full px-4"
              >
                {adding ? <span className="loading loading-spinner loading-xs"></span> : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-80 flex flex-col items-center gap-4 animate-bounce-in">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-bold dark:text-white text-center">Added to Cart! 🛒</p>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-700 rounded-xl p-3 w-full">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-16 object-cover rounded-lg"
                onError={(e) => { e.target.src = "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg"; }}
              />
              <div>
                <p className="font-semibold text-sm dark:text-white line-clamp-1">{item.name}</p>
                <p className="text-xs text-pink-400 font-semibold uppercase">{item.title}</p>
                <p className="text-pink-500 font-bold text-sm mt-1">${item.price}</p>
              </div>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => { setShowModal(false); navigate("/cart"); }}
                className="flex-1 btn btn-sm bg-pink-500 hover:bg-pink-700 text-white border-none rounded-full"
              >
                Go to Cart
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 btn btn-sm btn-outline rounded-full dark:text-white"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cards;
