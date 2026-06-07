import User from "../model/user.model.js";

export const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("cart.book");
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { bookId } = req.body;
        const user = await User.findById(req.user.id);
        const existing = user.cart.find(c => c.book.toString() === bookId);
        if (existing) {
            existing.quantity += 1;
        } else {
            user.cart.push({ book: bookId, quantity: 1 });
        }
        await user.save();
        res.status(200).json({ message: "Added to cart" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.cart = user.cart.filter(c => c.book.toString() !== req.params.bookId);
        await user.save();
        res.status(200).json({ message: "Removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateCartQty = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const item = user.cart.find(c => c.book.toString() === req.params.bookId);
        if (item) item.quantity = req.body.quantity;
        if (item?.quantity < 1) user.cart = user.cart.filter(c => c.book.toString() !== req.params.bookId);
        await user.save();
        res.status(200).json({ message: "Cart updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
