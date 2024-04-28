import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";
import { FaHeart } from "react-icons/fa";
import toggleFavBook from "../composables/toggleFavBook";
const Book = ({ bookInfo }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {bookInfo && (
        <div className="w-60 mx-1 border-stone-300 border my-2 h-[360px] relative  bg-white">
          <Link to={`/books/${bookInfo._id}`}>
            <img
              src={bookInfo.imageURL}
              className="w-full  min-h-32 h-2/3 max-h-[300px] "
            />
          </Link>
          <section className="mt-2 px-3">
            <Link to={`/books/${bookInfo._id}`}> <h1 className="text-base hover:text-indigo-500">{bookInfo.title}</h1>   </Link>
            <p className="text-sm my-1">
              {bookInfo.category}
            </p>

            <Link
              className="absolute bottom-1 left-2 py-4 px-1 pt-6 text-dark text-sm hover:text-indigo-500"
              to={`/books/${bookInfo._id}`}
            >
              More details
            </Link>

            <button
              className="absolute bottom-1 right-2 py-4 px-2 pt-6  text-dark text-sm hover:text-red-500"
              onClick={() => toggleFavBook(bookInfo, user)}
            >
              <FaHeart />
            </button>
          </section>
        </div>
      )}
    </>
  );
};

export default Book;
