import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthProvider";
import { CartContext } from "./CartContext";

export default function CartProvider({ children }) {
  const [authUser] = useAuth();
  const [cart, setCart] = useState([]);

  const getToken = () => {
    const stored = localStorage.getItem("Users");
    return stored ? JSON.parse(stored).token : null;
  };

  const fetchCart = async () => {
    const token = getToken();
    if (!token) return setCart([]);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch {
      setCart([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [authUser]);

  const addToCart = async (bookId) => {
    const token = getToken();
    if (!token) return false;
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart();
      return true;
    } catch (error) {
      console.log("addToCart error:", error.response?.data || error.message);
      return false;
    }
  };

  const removeFromCart = async (bookId) => {
    const token = getToken();
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart();
    } catch (error) {
      console.log("removeFromCart error:", error.response?.data || error.message);
    }
  };

  const updateQty = async (bookId, quantity) => {
    const token = getToken();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/${bookId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCart();
    } catch (error) {
      console.log("updateQty error:", error.response?.data || error.message);
    }
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart, removeFromCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
}
