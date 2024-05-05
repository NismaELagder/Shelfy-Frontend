import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaHeartCrack } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";

import { AuthContext } from "../store/AuthContextProvider";
import toggleFavBook from "../composables/toggleFavBook";

const FavBooks = () => {
  const { user } = useContext(AuthContext);
  const [favBooks, setFavBooks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/books/fav`,
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
    <div className="mt-16 mb-8">
      <h1 className="flex justify-center items-center mb-4 font-semibold text-xl">
        <FaHeart className="me-3 text-red-700" />
        Favourite Books
      </h1>
      {!favBooks.length ? (
        <p className="mt-2 mb-4 p-2 bg-sky-200 rounded w-full">
          <IoInformationCircleOutline className="inline w-[20px] h-[20px]" /> There are no favorite books yet! Add some for easy access!
        </p>
      ) : (
        <div className="flex flex-col justify-center sm:flex-wrap sm:flex-row">{
          favBooks.map((book) => (

            <div className="border border-stone-300 mb-2 flex flex-col grow
            sm:flex-row sm:mx-1 justify-between border-collapse
            sm:h-[194px] sm:w-[388px]" key={book._id}>
              <div className="w-full flex p-2">
                <img
                  src={book.imageURL}
                  alt={book.title}
                  className="inline-block w-32 h-44 shadow-md shadow-gray-700"
                />
                <div className="p-2 flex flex-col justify-evenly justify-items-start">
                  <p className="block font-semibold underline hover:text-indigo-500">
                    <Link
                      to={`/books/${book["_id"]}`}>
                      {book.title}
                    </Link>
                  </p>
                  <p className="block h-2/3">
                    {book.description.substring(0, 70)}...
                  </p>
                </div>
              </div>

              <div className="border border-stone-300 border-collapse flex justify-center items-center py-2 
            sm:flex-col sm:px-4 sm:py-0">
                <button
                  className="hover:text-red-500 border-stone-300 flex
                  w-full h-full border-collapse
                  justify-center
                  sm:items-center"
                  onClick={() => removeBook(book, user)}
                >
                  <FaHeartCrack />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavBooks;
