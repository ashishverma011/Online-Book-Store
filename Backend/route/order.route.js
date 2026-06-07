import express from "express";
import { placeOrder, getMyOrders, getAllOrders, updateOrderStatus } from "../controller/order.controller.js";
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, placeOrder);
router.get("/my", verifyToken, getMyOrders);
router.get("/all", verifyToken, isAdmin, getAllOrders);
router.put("/:id/status", verifyToken, isAdmin, updateOrderStatus);

export default router;
