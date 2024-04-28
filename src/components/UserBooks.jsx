import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete ,MdEditDocument} from "react-icons/md";
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
              <p className="text-sm ps-4">
                {book.description.substring(0, 70)}...
              </p>
            </Link>{" "}
            <div className="flex justify-end items-center px-4">
              <Link
                className="py-2 px-4 bg-white square-full rounded-md border border-stone-300 text-dark hover:text-indigo-500 text-sm me-4"
                to={`/books/editbook/${book["_id"]}`}
                alt="Edit book details"
              >
                <MdEditDocument className="text-base" />
              </Link>
              <button
                className=" py-2 px-4 hover:text-red-600 square-full rounded-md border border-stone-300 text-dark text-sm"
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
