import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";
import { FaHeart } from "react-icons/fa";
import toggleFavBook from "../composables/toggleFavBook";
const COLORS = [
  "from-slate-500",
  // "from-gray-500",
  "from-zinc-500",
  // "from-neutral-500",
  "from-stone-500",
  "from-red-500",
  "from-orange-500",
  "from-amber-500",
  "from-yellow-500",
  "from-lime-500",
  "from-green-500",
  "from-emerald-500",
  "from-teal-500",
  "from-cyan-500",
  "from-sky-500",
  "from-blue-500",
  "from-indigo-500",
  "from-violet-500",
  "from-purple-500",
  "from-fuchsia-500",
  "from-rose-500",
  "from-pink-500"
]

function getRandomIntInclusive(min = 0, max = 19) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

const Book = ({ bookInfo }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {bookInfo && (
        
        <div className={`flex flex-col bg-gradient-to-b ${COLORS[getRandomIntInclusive()]} to-35%
        min-[360px]:mr-1 min-[460px]:mr-1 sm:mr-4 min-[900px]:mr-4 xl:mr-4
        border-stone-300 border my-2 h-[328px] sm:h-[375px] w-[160px] sm:w-[190px]`}>
          <Link to={`/books/${bookInfo._id}`} className="pt-4 flex justify-end items-center">
            <img
              src={bookInfo.imageURL}
              className="w-32 h-44 mx-auto shadow-md shadow-gray-700"
            />
          </Link>

          <section className="h-full flex flex-col justify-between mt-4">
            <div className="h-full flex flex-col pl-3">

              <Link to={`/books/${bookInfo._id}`} className="mb-2">
                <h1 className="text-base font-semibold hover:text-indigo-500">{bookInfo.title}</h1>
              </Link>

              <p className="block">
                {bookInfo.author}
              </p>

            </div>

            <div className="border-t border-stone-300 flex items-center py-1">
              <Link
                className="border-r border-stone-300 basis-2/3 w-full h-full flex justify-center items-center underline hover:text-indigo-500"
                to={`/books/${bookInfo._id}`}
              > More details </Link>

              <button
                className="basis-1/3 w-full h-full flex justify-center items-center hover:text-red-500"
                onClick={() => toggleFavBook(bookInfo, user)}
              >
                <FaHeart />
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Book;
