import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.jpg";
import Input from "../components/Input";
import { AuthContext } from "../store/AuthContextProvider";
import { FaQuoteRight, FaQuoteLeft, FaCheck, FaTimes } from "react-icons/fa";

const ALERT_MESSAGES_BG_COLOR = [
  {
    message: "Something is wrong. Try again later.", color: "bg-red-200"
  },
  {
    message: "All Fields are required except publisher.", color: "bg-red-200"
  },
  {
    message: "Book Edited Successfully!", color: "bg-green-200"
  },
  {
    message: "Book Added Successfully! Add more!", color: "bg-green-200"
  }
]

export const BookForm = ({ edit }) => {
  const [book, setBook] = useState();
  const [alertMessage, setAlertMessage] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (edit) {
      axios
        .get(
          `http://localhost:4000/books/book/${id}`,
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          }
        )
        .then((response) => {
          setBook(response.data);
        });
    }
  }, [id, edit]);

  const changeHandler = (e) => {
    setBook((currentBook) => ({
      ...currentBook,
      [e.target.name]:
        e.target.name === "file"
          ? e.target.files[0]
          : e.target.value,
    }));
    setAlertMessage(null);
  };

  const bookCreation = async () => {
    if (
      !book?.title ||
      !book?.author ||
      !book?.description ||
      !book?.imageURL ||
      !book?.category ||
      !book?.file ||
      !book?.publishYear
    ) {
      setAlertMessage(
        ALERT_MESSAGES_BG_COLOR[1]
      );
    } else {
      const formData = new FormData();
      Object.entries(book).map((item) => {
        return formData.append(item[0], item[1]);
      });
      axios
        .post(
          "http://localhost:4000/books/book",
          formData,
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setAlertMessage(ALERT_MESSAGES_BG_COLOR[3]);
          setBook((currentBook) => ({
            title: "",
            author: "",
            description: "",
            imageURL: "",
            category: "",
            file: currentBook.file,
            publishYear: "",
          }));
        })
        .catch((error) => {
          setAlertMessage(
            ALERT_MESSAGES_BG_COLOR[0]
          );
        });
    }
  };

  const bookEditing = () => {
    if (
      !book?.title ||
      !book?.author ||
      !book?.description ||
      !book?.imageURL ||
      !book?.category ||
      !book?.file ||
      !book?.publishYear
    ) {
      setAlertMessage(
        ALERT_MESSAGES_BG_COLOR[1]
      );
    } else {
      const formData = new FormData();
      Object.entries(book).map((item) => {
        formData.append(item[0], item[1]);
      });

      axios
        .put(
          `http://localhost:4000/books/book/${id}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          setAlertMessage(ALERT_MESSAGES_BG_COLOR[2]);
          setBook({
            title: "",
            author: "",
            description: "",
            imageURL: "",
            category: "",
            file: "",
            publishYear: "",
            publisher: "",
          });
        })
        .then(() => {
          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        })
        .catch((error) => {
          setAlertMessage(
            ALERT_MESSAGES_BG_COLOR[0]
          );
        });
    }
  };

  return (
    <div className="h-[92vh] rounded-md bg-white w-full p-4 flex basis-11/12 min-[360px]:px-10 min-[460px]:px-30 sm:px-30 min-[900px]:px-24">
      <section className="w-full md:w-1/2 rounded-md p-8 pb-0">
        <div className="w-full mx-auto">
          <h1 className="font-semibold text-2xl mb-2">
            {edit ? "Edit" : " Add"} a Book
          </h1>
          <p className="text-sm font-light">
            <sup><FaQuoteLeft className="inline" /></sup>
            {" "}A book for the mind is what exercise is to the body.{" "}
            <sup><FaQuoteRight className="inline" /></sup>{" "}
            <span className="block">
              - Joseph Addison
            </span>
          </p>
        </div>
        <form className="my-4 ">
          <Input
            label="Title"
            type="text"
            name="title"
            onChange={changeHandler}
            className={"my-3"}
            value={book?.title}
          />
          <Input
            label="Author"
            name="author"
            type="text"
            onChange={changeHandler}
            className={"my-3"}
            value={book?.author}
          />
          <Input
            label="Description"
            name="description"
            type="textarea"
            onChange={changeHandler}
            className={"my-3"}
            value={book?.description}
          />
          <Input
            label="Publisher"
            name="publisher"
            type="text"
            onChange={changeHandler}
            className={"my-3"}
            value={book?.publisher}
          />
          <Input
            label="Publish Year"
            name="publishYear"
            type="number"
            onChange={changeHandler}
            className={"my-3"}
            value={book?.publishYear}
          />
          <Input
            label="Category"
            name="category"
            type="text"
            onChange={changeHandler}
            className={"my-3"}
            value={book?.category}
          />
          <div className={"my-3 flex justify-between"}>
            <Input
              label="Book Cover (URL)"
              name="imageURL"
              type="url"
              onChange={changeHandler}
              className={"w-[48%]"}
              value={book?.imageURL}
            />

            <Input
              label="Book (pdf version)"
              name="file"
              type="file"
              accept=".pdf"
              onChange={changeHandler}
              className={"w-[48%]"}
              value={book?.file}
            />
          </div>{" "}
          {alertMessage && (
            <p className={`mt-2 mb-4 p-2 ${alertMessage.color} rounded w-full`}>
              {alertMessage.color.includes("green") && <FaCheck className="inline w-[20px] h-[20px]" />}
              {alertMessage.color.includes("red") && <FaTimes className="inline w-[20px] h-[20px]" />}
              {" "}{alertMessage.message}
            </p>
          )}
          <button
            type="button"
            onClick={edit ? bookEditing : bookCreation}
            className="w-full mx-auto my-12 block border square-full rounded-md border-stone-300 hover:text-indigo-500 font-bold py-2"
          >
            Continue
          </button>{" "}
        </form>
      </section>
      <section className="hidden md:block w-1/2">
        <img
          src={logo}
          alt="E-library"
          className="w-full h-full rounded-e-md"
        />
      </section>
    </div>
  );
};
