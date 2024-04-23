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
            <h1 className=" text-base">{bookInfo.title}</h1>
            <p className="text-xs my-1">
              {bookInfo.category}
            </p>

            <Link
              className="absolute bottom-1 left-2 py-1 px-2 bg-dark rounded-lg text-white text-xs"
              to={`/books/${bookInfo._id}`}
            >
              More details
            </Link>
            <button
              className="absolute bottom-1 right-2 py-[6px] px-4 bg-red-400 rounded-lg text-white text-xs hover:bg-red-500"
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
