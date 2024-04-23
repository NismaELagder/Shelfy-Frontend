import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaHeartCrack } from "react-icons/fa6";

import { AuthContext } from "../store/AuthContextProvider";
import toggleFavBook from "../composables/toggleFavBook";
const FavBooks = () => {
  const { user } = useContext(AuthContext);
  const [favBooks, setFavBooks] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://book-store-backend-qtea.onrender.com/books/fav`,
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((response) => setFavBooks(response.data));
  }, [user]);

  const removeBook = async (bookdetails, user) => {
    toggleFavBook(bookdetails, user);
    setFavBooks((favBooks) => {
      const newFavBooks = favBooks.filter(
        (favBook) => bookdetails._id !== favBook._id
      );
      return newFavBooks;
    });
  };

  return (
    <div className="w-4/5 mx-12 font-primary mt-16 mb-8  ">
      <h1 className="flex justify-center items-center mb-4 font-semibold text-xl">
        <FaHeart className="me-3 text-red-700 " />
        Favourite Books
      </h1>
      {!favBooks.length ? (
        <p className="mt-2 mb-4">
          There are not fav books yet.
        </p>
      ) : (
        favBooks.map((book) => (
          <div className=" border border-stone-300 h-fit-content flex justify-between border-collapse">
            <Link
              to={`/books/${book["_id"]}`}
              className="w-1/3 flex  items-center"
            >
              <img
                src={book.imageURL}
                alt={book.title}
                className=" w-1/3 h-36"
              />
              <p className="text-xs ps-4">
                {book.description.substring(0, 70)}...
              </p>
            </Link>{" "}
            <div className="flex justify-end items-center px-4">
              <button
                className=" py-2 px-4 bg-red-400 rounded-lg text-white text-xs hover:bg-red-500"
                onClick={() => removeBook(book, user)}
              >
                <FaHeartCrack />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FavBooks;
