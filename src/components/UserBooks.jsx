import React, {
  useContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete, MdEditDocument } from "react-icons/md";
import { GiWhiteBook } from "react-icons/gi";

import { AuthContext } from "../store/AuthContextProvider";
import { IoEyeSharp } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";

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
    <>
      <h1 className="flex justify-center items-center mb-4 font-semibold text-xl">
        <GiWhiteBook className="me-1 text-2xl" />
        <span className="capitalize">
          {user?.userName}{" "}
        </span>
        's Books
      </h1>
      {
        !myBooks.length ? (
          <p className="mt-2 mb-4 p-2 bg-sky-200 rounded w-full">
            <IoInformationCircleOutline className="inline w-[20px] h-[20px]" /> You haven't uploaded any books so far. Click the Add Book button and keep track of your books now!
          </p>
        ) : (
          myBooks.map((book) => (
            <div className="border border-stone-300 mb-2 flex flex-col sm:flex-row justify-between border-collapse">

              <div className=" w-full flex p-2">
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

                <Link
                  className="block border-stone-300 hover:text-indigo-500 flex w-full h-full 
                border-r justify-center border-collapse
                sm:items-center sm:border-b sm:border-r-0"
                  to={`/books/${book["_id"]}`}
                >
                  <IoEyeSharp className="inline-block" />
                </Link>

                <Link
                  className="block hover:text-indigo-500 border-stone-300 flex
                w-full h-full border-r justify-center border-collapse
                sm:items-center sm:border-b sm:border-r-0"
                  to={`/books/editbook/${book["_id"]}`}
                  alt="Edit book details"
                >
                  <MdEditDocument className="inline-block" />
                </Link>

                <button
                  className="hover:text-indigo-500 border-stone-300 flex
                w-full h-full border-collapse
                justify-center
                sm:items-center
                "
                  onClick={() => deleteHandler(book["_id"])}
                >
                  <MdDelete className="inline-block" />
                </button>
              </div>
            </div>
          ))
        )
      }
    </>
  );
};

export default UserBooks;
