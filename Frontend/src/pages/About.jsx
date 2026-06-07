import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 min-h-screen pt-28 pb-10 dark:bg-slate-900 dark:text-white">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About <span className="text-pink-500">📚 BookStore</span></h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Your one-stop destination for discovering, reading, and buying the world's greatest books.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-base-100 dark:bg-slate-800 rounded-2xl shadow p-6 text-center">
            <div className="text-5xl mb-4">📖</div>
            <h2 className="text-xl font-bold mb-2">Our Mission</h2>
            <p className="text-gray-500 dark:text-gray-400">
              To make quality books accessible to everyone — from timeless classics to modern bestsellers.
            </p>
          </div>
          <div className="bg-base-100 dark:bg-slate-800 rounded-2xl shadow p-6 text-center">
            <div className="text-5xl mb-4">🌍</div>
            <h2 className="text-xl font-bold mb-2">Our Vision</h2>
            <p className="text-gray-500 dark:text-gray-400">
              A world where every person has access to knowledge and stories that inspire, educate, and entertain.
            </p>
          </div>
          <div className="bg-base-100 dark:bg-slate-800 rounded-2xl shadow p-6 text-center">
            <div className="text-5xl mb-4">💡</div>
            <h2 className="text-xl font-bold mb-2">Our Values</h2>
            <p className="text-gray-500 dark:text-gray-400">
              We believe in the power of reading to transform lives, spark creativity, and build empathy.
            </p>
          </div>
        </div>

        <div className="bg-base-100 dark:bg-slate-800 rounded-2xl shadow p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: "✅", text: "Thousands of books across all genres" },
              { icon: "🚚", text: "Fast and reliable delivery to your doorstep" },
              { icon: "🆓", text: "Free books available with no hidden charges" },
              { icon: "🔒", text: "Secure payments and data privacy" },
              { icon: "⭐", text: "Curated picks from top authors worldwide" },
              { icon: "📱", text: "Easy to use on any device, anytime" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-pink-50 dark:bg-slate-700">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Our Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {[
              { count: "10,000+", label: "Books Available" },
              { count: "50,000+", label: "Happy Readers" },
              { count: "500+", label: "Authors" },
              { count: "100+", label: "Genres" },
            ].map((stat, i) => (
              <div key={i} className="bg-base-100 dark:bg-slate-800 rounded-2xl shadow p-6">
                <p className="text-3xl font-bold text-pink-500">{stat.count}</p>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
