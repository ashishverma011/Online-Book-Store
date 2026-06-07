import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [{
        book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "cancelled"], default: "pending" },
    address: { type: String, default: "Online Delivery" },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;
