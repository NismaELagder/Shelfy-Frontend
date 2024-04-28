import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { AuthContext } from "../store/AuthContextProvider";
import { FaComments } from "react-icons/fa6";
import axios from "axios";
const CommentForm = ({ bookId, className }) => {
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState({
    user: "",
    text: "",
  });
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
      <form className={className}>
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
          rows={6}
          cols={30}
          className="border border-stone-500 rounded-md w-2/3 my-4 px-4 py-2"
          onChange={changeHandler}
        />
        <div className="flex justify-end w-2/3">
          <button
            type="button"
            className="square-full rounded-md bg-dark px-12 py-2 text-white block"
            onClick={addComment}
          >
            Submit
          </button>
        </div>
      </form>

      <div
        className="w-5/6 font-primary
   "
      >
        <h2 className=" font-semibold text-lg my-8">
          <FaComments className="inline" /> Comments
        </h2>
        {comments?.length === 0 ? (
          <p>
            There are no comments yet. Be the first to
            comment!
          </p>
        ) : (
          comments?.map((comment) => (
            <div className=" my-2 bg-gray-50 px-4 py-2">
              <h3 className="text-dark bg-slate-200 p-2 me-4 square-full rounded-md w-fit">
                {comment?.user}
              </h3>
              <p className="py-4">{comment?.text}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CommentForm;
