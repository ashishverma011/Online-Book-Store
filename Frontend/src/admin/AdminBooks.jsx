import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import axios from "axios";
import toast from "react-hot-toast";

const empty = { name: "", author: "", price: "", category: "", image: "", title: "", description: "" };

function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [search, setSearch] = useState("");

  const getToken = () => JSON.parse(localStorage.getItem("Users")).token;

  const fetchBooks = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/book`);
      setBooks(res.data);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const openAdd = () => { setEditId(null); setForm(empty); setShowModal(true); };
  const openEdit = (book) => {
    setEditId(book._id);
    setForm({ name: book.name, author: book.author, price: book.price, category: book.category, image: book.image, title: book.title || "", description: book.description || "" });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/book/${editId}`, { ...form, price: Number(form.price) }, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        toast.success("Book updated!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/book`, { ...form, price: Number(form.price) }, {
          headers: { Authorization: `Bearer ${getToken()}` },
        });
        toast.success("Book added!");
      }
      setForm(empty);
      setEditId(null);
      setShowModal(false);
      fetchBooks();
    } catch {
      toast.error(editId ? "Failed to update book" : "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/book/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      toast.success("Book deleted!");
      fetchBooks();
    } catch {
      toast.error("Failed to delete");
    }
  };

  const filtered = books.filter((b) =>
    b.name?.toLowerCase().includes(search.toLowerCase()) ||
    b.author?.toLowerCase().includes(search.toLowerCase()) ||
    b.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
        <h1 className="text-2xl font-bold dark:text-white">Books</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered input-sm dark:bg-slate-700 dark:text-white"
          />
          <button onClick={openAdd} className="btn bg-pink-500 hover:bg-pink-700 text-white border-none">
            + Add Book
          </button>
        </div>
      </div>

      {fetching ? (
        <div className="flex justify-center mt-20"><span className="loading loading-spinner loading-lg text-pink-500"></span></div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 mt-20 text-xl">No books found!</p>
      ) : (
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow">
        <table className="table w-full">
          <thead>
            <tr className="dark:text-gray-300">
              <th>Image</th>
              <th>Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((book) => (
              <tr key={book._id} className="dark:text-gray-200">
                <td>
                  <img src={book.image} alt={book.name} className="w-12 h-12 object-cover rounded"
                    onError={(e) => { e.target.src = "https://img.freepik.com/free-vector/programming-concept-illustration_114360-1351.jpg"; }} />
                </td>
                <td className="font-semibold">{book.name}</td>
                <td>{book.author}</td>
                <td><span className="badge badge-outline">{book.category}</span></td>
                <td className="text-pink-500 font-bold">${book.price}</td>
                <td className="flex gap-2">
                  <button onClick={() => openEdit(book)} className="btn btn-sm btn-info text-white">Edit</button>
                  <button onClick={() => handleDelete(book._id)} className="btn btn-sm btn-error text-white">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {/* Add/Edit Book Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-white">{editId ? "Edit Book" : "Add New Book"}</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              {["name", "author", "price", "category", "image", "title"].map((field) => (
                <input
                  key={field}
                  type={field === "price" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="input input-bordered w-full dark:bg-slate-700 dark:text-white"
                  required={["name", "price"].includes(field)}
                />
              ))}
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="textarea textarea-bordered w-full dark:bg-slate-700 dark:text-white"
                rows={2}
              />
              <button type="submit" disabled={loading} className="btn w-full bg-pink-500 hover:bg-pink-700 text-white border-none">
                {loading ? (editId ? "Updating..." : "Adding...") : (editId ? "Update Book" : "Add Book")}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminBooks;
