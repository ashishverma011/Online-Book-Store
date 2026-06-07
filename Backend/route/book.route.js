import express from "express";
import { getBooks, getBookById, createBook, updateBook, deleteBook, addReview } from "../controller/book.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", verifyToken, isAdmin, createBook);
router.put("/:id", verifyToken, isAdmin, updateBook);
router.delete("/:id", verifyToken, isAdmin, deleteBook);
router.post("/:id/review", verifyToken, addReview);

export default router;
