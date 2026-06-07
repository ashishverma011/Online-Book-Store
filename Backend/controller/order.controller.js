import Order from "../model/order.model.js";
import User from "../model/user.model.js";

export const placeOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("cart.book");
        if (!user.cart.length) return res.status(400).json({ message: "Cart is empty" });

        const items = user.cart.map(c => ({
            book: c.book._id,
            name: c.book.name,
            image: c.book.image,
            price: c.book.price,
            quantity: c.quantity,
        }));
        const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

        const order = await new Order({ user: req.user.id, items, totalAmount, address: req.body.address }).save();
        user.cart = [];
        await user.save();

        res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "fullname email").sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
