import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fullname: String,
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
}, { timestamps: true });

const bookSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: String,
    image: String,
    title: String,
    description: String,
    author: String,
    stock: { type: Number, default: 100 },
    reviews: [reviewSchema],
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
export default Book;