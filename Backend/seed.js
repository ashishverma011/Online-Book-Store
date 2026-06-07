import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./model/book.model.js";

dotenv.config();

const books = [
  {
    name: "Pride and Prejudice",
    price: 9,
    category: "Paid",
    author: "Jane Austen",
    image: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
    title: "Classic Literature",
    description: "A timeless romance novel about love, class, and first impressions in 19th-century England.",
  },
  {
    name: "Meditations",
    price: 7,
    category: "Free",
    author: "Marcus Aurelius",
    image: "https://m.media-amazon.com/images/I/71cKnBqFBHL._AC_UF1000,1000_QL80_.jpg",
    title: "Philosophy",
    description: "Personal writings of the Roman Emperor, offering Stoic wisdom on life, virtue, and resilience.",
  },
  {
    name: "A Brief History of Time",
    price: 11,
    category: "Paid",
    author: "Stephen Hawking",
    image: "https://m.media-amazon.com/images/I/A1xkFZX5k-L._AC_UF1000,1000_QL80_.jpg",
    title: "Science",
    description: "Stephen Hawking explores the universe, black holes, and the nature of time in plain language.",
  },
  {
    name: "The Adventures of Tom Sawyer",
    price: 6,
    category: "Free",
    author: "Mark Twain",
    image: "https://m.media-amazon.com/images/I/71gFoFFOJHL._AC_UF1000,1000_QL80_.jpg",
    title: "Adventure",
    description: "A mischievous boy's adventures along the Mississippi River in a small-town American setting.",
  },
  {
    name: "Atomic Habits",
    price: 18,
    category: "Paid",
    author: "James Clear",
    image: "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg",
    title: "Self Help",
    description: "Tiny changes, remarkable results. A proven framework for building good habits and breaking bad ones.",
  },
  {
    name: "Harry Potter and the Sorcerer's Stone",
    price: 15,
    category: "Paid",
    author: "J.K. Rowling",
    image: "https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg",
    title: "Fantasy",
    description: "A young boy discovers he is a wizard and enters the magical world of Hogwarts School.",
  },
  {
    name: "The Girl with the Dragon Tattoo",
    price: 14,
    category: "Paid",
    author: "Stieg Larsson",
    image: "https://m.media-amazon.com/images/I/81X5MBT4IHL._AC_UF1000,1000_QL80_.jpg",
    title: "Thriller",
    description: "A journalist and a hacker investigate a decades-old disappearance in a wealthy Swedish family.",
  },
  {
    name: "1984",
    price: 12,
    category: "Paid",
    author: "George Orwell",
    image: "https://m.media-amazon.com/images/I/71kxa2HFqbL._AC_UF1000,1000_QL80_.jpg",
    title: "Dystopian",
    description: "A chilling vision of a totalitarian future where Big Brother watches your every move.",
  },
  {
    name: "Steve Jobs",
    price: 16,
    category: "Paid",
    author: "Walter Isaacson",
    image: "https://m.media-amazon.com/images/I/71dSLBHJpCL._AC_UF1000,1000_QL80_.jpg",
    title: "Biography",
    description: "The exclusive biography of Apple's visionary co-founder, based on over forty interviews.",
  },
  {
    name: "It",
    price: 17,
    category: "Paid",
    author: "Stephen King",
    image: "https://m.media-amazon.com/images/I/71tFhdcC0XL._AC_UF1000,1000_QL80_.jpg",
    title: "Horror",
    description: "Seven children face an ancient evil lurking in the sewers of Derry, Maine — and return as adults to finish it.",
  },
  {
    name: "Dune",
    price: 19,
    category: "Paid",
    author: "Frank Herbert",
    image: "https://m.media-amazon.com/images/I/81ym3QUd3KL._AC_UF1000,1000_QL80_.jpg",
    title: "Science Fiction",
    description: "An epic tale of politics, religion, and survival on a desert planet that holds the universe's most valuable resource.",
  },
  {
    name: "Thinking, Fast and Slow",
    price: 15,
    category: "Free",
    author: "Daniel Kahneman",
    image: "https://m.media-amazon.com/images/I/71wvKXBXfFL._AC_UF1000,1000_QL80_.jpg",
    title: "Psychology",
    description: "Nobel laureate Daniel Kahneman reveals the two systems that drive the way we think and make decisions.",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MongoDBURI);
    console.log("Connected to MongoDB");
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log("✅ Books seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();