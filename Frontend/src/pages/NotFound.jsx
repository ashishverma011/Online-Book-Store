import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center dark:bg-slate-900 dark:text-white text-center px-4">
      <h1 className="text-9xl font-extrabold text-pink-500">404</h1>
      <h2 className="text-3xl font-bold mt-4 mb-2">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-700 duration-300 font-semibold"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;
