import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message)
      return toast.error("Please fill in all fields");
    toast.success("Message sent successfully! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 min-h-screen pt-28 pb-10 dark:bg-slate-900 dark:text-white">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact <span className="text-pink-500">Us</span></h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Have a question or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: "📧", title: "Email Us", info: "support@bookstore.com" },
            { icon: "📞", title: "Call Us", info: "+1 (800) 123-4567" },
            { icon: "📍", title: "Visit Us", info: "123 Book Street, Reading City" },
          ].map((item, i) => (
            <div key={i} className="bg-base-100 dark:bg-slate-800 rounded-2xl shadow p-6 text-center">
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{item.info}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-base-100 dark:bg-slate-800 rounded-2xl shadow p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full dark:bg-slate-700 dark:text-white"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full dark:bg-slate-700 dark:text-white"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Message</label>
              <textarea
                placeholder="Write your message here..."
                className="textarea textarea-bordered w-full dark:bg-slate-700 dark:text-white"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="btn w-full bg-pink-500 hover:bg-pink-700 text-white border-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
