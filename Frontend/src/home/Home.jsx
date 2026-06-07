import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <Banner />

      {/* Stats Section */}
      <div className="bg-pink-500 dark:bg-pink-700 py-12 mt-10">
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {[
            { value: "12+", label: "Books Available" },
            { value: "5K+", label: "Happy Readers" },
            { value: "10+", label: "Genres" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label}>
              <h2 className="text-4xl font-extrabold">{stat.value}</h2>
              <p className="text-lg mt-1 opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">
          Why Choose <span className="text-pink-500">BookStore?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "📦", title: "Wide Collection", desc: "Explore 12+ books across genres like Fiction, Science, Philosophy, Self-Help and more." },
            { icon: "⚡", title: "Instant Access", desc: "Add to cart and place your order in seconds. Fast, simple and hassle-free." },
            { icon: "🔒", title: "Secure & Trusted", desc: "Your data and orders are fully protected with secure authentication." },
          ].map((f) => (
            <div key={f.title} className="bg-base-100 dark:bg-slate-800 rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:scale-105 duration-200">
              <span className="text-5xl mb-4">{f.icon}</span>
              <h3 className="text-xl font-bold mb-2 dark:text-white">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 pb-16">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Ready to start reading?</h2>
            <p className="text-white opacity-90 mt-2">Browse our full collection and find your next favourite book today.</p>
          </div>
          <button
            onClick={() => navigate("/course")}
            className="btn bg-white text-pink-600 font-bold border-none hover:bg-gray-100 rounded-full px-8 text-lg"
          >
            Browse Books →
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
