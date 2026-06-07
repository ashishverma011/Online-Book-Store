import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
function Course() {
  const [book, setBook] = useState([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/book`);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  const filteredBooks = searchQuery
    ? book.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : book;
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">at our Bookstore! 📚</span>
          </h1>
          <p className="mt-12">
            Browse our full collection of books — from timeless classics and
            gripping thrillers to inspiring self-help and fantasy adventures.
            Find your next favourite read and add it to your cart today!
          </p>
          <Link to="/">
            <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 items-start">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((item) => <Cards key={item.id} item={item} />)
          ) : (
            <p className="text-center col-span-4 text-gray-500">No courses found for "{searchQuery}"</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Course;
