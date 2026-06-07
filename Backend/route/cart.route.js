import express from "express";
import { getCart, addToCart, removeFromCart, updateCartQty } from "../controller/cart.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getCart);
router.post("/", verifyToken, addToCart);
router.delete("/:bookId", verifyToken, removeFromCart);
router.put("/:bookId", verifyToken, updateCartQty);

export default router;
