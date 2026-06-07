import Book from "../model/book.model.js";

export const getBooks = async (req, res) => {
    try {
        const { search, category } = req.query;
        const filter = {};
        if (category && category !== "All") filter.category = category;
        if (search) filter.$or = [
            { name: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
        ];
        const books = await Book.find(filter);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const createBook = async (req, res) => {
    try {
        const book = await new Book(req.body).save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteBook = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        const alreadyReviewed = book.reviews.find(r => r.user.toString() === req.user.id);
        if (alreadyReviewed) return res.status(400).json({ message: "Already reviewed" });

        book.reviews.push({ user: req.user.id, fullname: req.user.fullname, rating, comment });
        await book.save();
        res.status(201).json({ message: "Review added" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
