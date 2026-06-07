import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import BookDetail from "./pages/BookDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./admin/AdminDashboard";
import AdminBooks from "./admin/AdminBooks";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/cart"
            element={authUser ? <Cart /> : <Navigate to="/signup" />}
          />
          <Route
            path="/orders"
            element={authUser ? <Orders /> : <Navigate to="/signup" />}
          />
          <Route
            path="/book/:id"
            element={authUser ? <BookDetail /> : <Navigate to="/signup" />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={authUser?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/admin/books" element={authUser?.role === "admin" ? <AdminBooks /> : <Navigate to="/" />} />
          <Route path="/admin/orders" element={authUser?.role === "admin" ? <AdminOrders /> : <Navigate to="/" />} />
          <Route path="/admin/users" element={authUser?.role === "admin" ? <AdminUsers /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
