import React, {
  useEffect,
  useState,
  useContext,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBookReader, FaHeart } from "react-icons/fa";
import ReadBtn from "../components/ReadBtn";
import DownloadBtn from "../components/DownloadBtn";
import CommentForm from "../components/CommentForm";
import { AuthContext } from "../store/AuthContextProvider";
import toggleFavBook from "../composables/toggleFavBook";

export const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      // fetch data from the api based on query params when component mount
      axios
        .get(
          `https://book-store-backend-qtea.onrender.com/books/book/${id}`,
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((response) => {
          setIsLoading(true);
          setBookDetails(response.data);
          setIsLoading(false);
        });
    } else {
      Navigate("/login");
    }
  }, [id, user]);
  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className="container mx-auto py-2">
          <div className="book  flex my-8 h-[440px]  font-primary">
            <section className=" shadow-md  shadow-stone-400 min-w-1/3 w-1/3 bg-gray-50">
              <img
                src={bookDetails?.imageURL}
                alt="book image"
                className="w-2/3 h-full mx-auto"
              />
            </section>
            <section className="px-8 py-12 flex flex-col justify-between w-2/3">
              <h1 className="text-3xl font-bold flex justify-between items-center">
                {bookDetails?.title}

                <button
                  className=" py-[10px] px-[1rem] bg-red-400 square-full rounded-md text-white text-sm hover:bg-red-500 border border-gray-50  "
                  onClick={() => {
                    toggleFavBook(bookDetails, user);
                  }}
                >
                  <FaHeart />
                </button>
              </h1>
              <div className="flex items-center">
                <FaBookReader
                  fill="currentColor"
                  size={34}
                  className="border border-dark rounded-full p-1 text-dark"
                />
                <p className=" text-sm ml-4 font-semibold">
                  {bookDetails?.author}
                </p>
              </div>
              <p className="my-3 text-sm">
                {bookDetails?.description}
              </p>
              <table className="text-left my-4">
                <tbody>
                  <tr className="text-sm">
                    <th>Publisher</th>
                    <td>{bookDetails?.publisher}</td>
                  </tr>
                  <tr className="text-sm">
                    <th>Year</th>
                    <td>{bookDetails?.publishYear}</td>
                  </tr>
                  <tr className="text-sm">
                    <th>Category</th>
                    <td>{bookDetails?.category}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <ReadBtn
                  className="mr-8 square-full rounded-md bg-dark px-12 py-2 text-white hover:bg-white hover:text-dark hover:border-dark hover:border text-sm"
                  to={bookDetails?.file}
                />
                <DownloadBtn
                  className="square-full rounded-md px-8 py-2 text-stone-600 border border-stone-600 hover:bg-primary hover:text-white text-sm"
                  pdf={bookDetails?.file}
                />
              </div>
            </section>
          </div>
          <CommentForm className="my-16" bookId={id} />
        </div>
      )}
    </>
  );
};
