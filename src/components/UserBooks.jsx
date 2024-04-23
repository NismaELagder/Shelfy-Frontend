import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { GiWhiteBook } from "react-icons/gi";

import { AuthContext } from "../store/AuthContextProvider";

const UserBooks = () => {
  const { user } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const deleteHandler = (id) => {
    axios.delete(
      `https://book-store-backend-qtea.onrender.com/books/book/${id}`,
      {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      }
    );
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          "https://book-store-backend-qtea.onrender.com/books/mybooks",
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((response) => {
          setMyBooks((preBooks) => [...response.data]);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <div className="w-4/5 mx-12 font-primary mt-10">
      <h1 className="flex justify-center items-center mb-4 font-semibold text-xl">
        <GiWhiteBook className="me-1 text-dark text-2xl" />
        <span className="capitalize">
          {user?.userName}{" "}
        </span>
        's Books
      </h1>
      {myBooks.map((book) => (
        <>
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
              <Link
                className=" py-2  px-4 bg-teal-500  hover:bg-teal-600 rounded-lg text-white text-xs me-4"
                to={`/books/editbook/${book["_id"]}`}
              >
                Edit
              </Link>
              <button
                className=" py-2 px-4 bg-red-400 rounded-lg text-white text-xs hover:bg-red-500"
                onClick={() => deleteHandler(book["_id"])}
              >
                <MdDelete className="text-base" />
              </button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default UserBooks;
