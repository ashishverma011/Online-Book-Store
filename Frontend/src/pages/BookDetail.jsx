import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [authUser] = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/book/${id}`);
        setBook(res.data);
      } catch {
        toast.error("Book not found");
        navigate("/course");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    if (!authUser) return toast.error("Please login to add to cart");
    addToCart(book._id);
    toast.success("Added to cart!");
  };

  if (loading)
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center dark:bg-slate-900">
          <span className="loading loading-spinner loading-lg text-pink-500"></span>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 min-h-screen pt-28 pb-10 dark:bg-slate-900 dark:text-white">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-ghost mb-6 text-pink-500"
        >
          ← Back
        </button>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3">
            <img
              src={book.image}
              alt={book.name}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
              onError={(e) => {
                e.target.src =
                  "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg";
              }}
            />
          </div>

          <div className="md:w-2/3 space-y-4">
            <div className="flex items-center gap-3">
              <span
                className={`badge text-white font-semibold ${
                  book.category === "Free" ? "badge-success" : "badge-warning"
                }`}
              >
                {book.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold">{book.name}</h1>

            {book.author && (
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                ✍️ by <span className="font-semibold text-pink-500">{book.author}</span>
              </p>
            )}

            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {book.description || book.title}
            </p>

            <div className="text-3xl font-bold text-pink-500">
              {book.price === 0 ? "Free" : `$${book.price}`}
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className="btn bg-pink-500 hover:bg-pink-700 text-white border-none rounded-full px-8"
              >
                {book.price === 0 ? "Read Free" : "Add to Cart"}
              </button>
              <button
                onClick={() => navigate("/course")}
                className="btn btn-outline rounded-full px-8"
              >
                Browse More
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-base-100 dark:bg-slate-800 rounded-xl p-4 shadow">
                <p className="text-gray-400 text-sm">Category</p>
                <p className="font-semibold">{book.category}</p>
              </div>
              <div className="bg-base-100 dark:bg-slate-800 rounded-xl p-4 shadow">
                <p className="text-gray-400 text-sm">Stock</p>
                <p className="font-semibold">{book.stock > 0 ? `${book.stock} available` : "Out of stock"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookDetail;
