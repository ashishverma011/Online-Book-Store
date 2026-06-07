import User from "../model/user.model.js";
import Book from "../model/book.model.js";
import Order from "../model/order.model.js";

export const getDashboardStats = async (req, res) => {
    try {
        const [totalUsers, totalBooks, totalOrders, orders] = await Promise.all([
            User.countDocuments(),
            Book.countDocuments(),
            Order.countDocuments(),
            Order.find(),
        ]);
        const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
        res.status(200).json({ totalUsers, totalBooks, totalOrders, totalRevenue });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
