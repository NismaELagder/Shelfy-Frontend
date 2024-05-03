import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { AuthContext } from "../store/AuthContextProvider";
import { FaComments } from "react-icons/fa6";
import axios from "axios";
import { PiUserCircleThin } from "react-icons/pi";
import { IoInformationCircleOutline } from "react-icons/io5";

const CommentForm = ({ bookId, className }) => {
  const { user } = useContext(AuthContext);
  // const [comment, setComment] = useState({
  //   user: "",
  //   text: "",
  // });
  const [comment, setComment] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://book-store-backend-qtea.onrender.com/books/book/${bookId}/comments`,
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((response) => setComments(response.data));
  }, [user]);
  const changeHandler = (event) => {
    setComment((precomment) => ({
      ...precomment,
      user: user.userName,
      text: event.target.value,
    }));
  };
  const addComment = async () => {
    axios
      .put(
        `https://book-store-backend-qtea.onrender.com/books/book/${bookId}/comments`,
        comment,
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((response) => {
        setComments(response.data),
          setComment({ user: "", text: "" });
      });
  };

  return (
    <>
      <form className={`w-full ${className}`}>
        <div className="flex justify-between items-center ">
          <label
            htmlFor="comment"
            className="font-bold text-lg"
          >
            Write Comment
          </label>
        </div>
        <textarea
          id="comment"
          name="comment"
          placeholder="Type here."
          rows={5}
          cols={30}
          className="border border-stone-500 rounded-md w-full my-4 px-4 py-2"
          onChange={changeHandler}
        />
        <div className="flex justify-end">
          <button
            type="button"
            className="border square-full rounded-md border-stone-300 hover:text-indigo-500 font-semibold px-12 py-2"
            onClick={addComment}
          >
            Submit
          </button>
        </div>
      </form>

      <div
        className="w-full"
      >
        <h2 className="font-semibold text-lg my-8">
          <FaComments className="inline" /> Comments
        </h2>
        {comments?.length === 0 ? (

          <p className="mt-2 mb-4 p-2 bg-sky-200 rounded w-full">
            <IoInformationCircleOutline className="inline w-[20px] h-[20px]" /> There are no comments yet. Be the first to comment!
          </p>
        ) : (
          comments?.map((comment) => (
            <div className="my-2 bg-gray-50 px-4 py-2 border-stone-300 border ">
              <h3 className="p-2 me-4 square-full rounded-md underline">
                <PiUserCircleThin className="inline w-[30px] h-[30px]" />
                {comment?.user}
              </h3>
              <p className="px-2 py-4">{comment?.text}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CommentForm;
