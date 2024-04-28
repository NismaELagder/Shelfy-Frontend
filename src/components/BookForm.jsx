import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.jpg";
import Input from "../components/Input";
import { AuthContext } from "../store/AuthContextProvider";
export const BookForm = ({ edit }) => {
  const [book, setBook] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (edit) {
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
    setAlertMessage("");
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
        "All Fields are required except publisher."
      );
    } else {
      const formData = new FormData();
      Object.entries(book).map((item) => {
        return formData.append(item[0], item[1]);
      });
      axios
        .post(
          "https://book-store-backend-qtea.onrender.com/books/book",
          formData,
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setAlertMessage("Book added  Successfully!");
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
            "Something is wrong. Try again later."
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
        "All Fields are required except publisher...."
      );
    } else {
      const formData = new FormData();
      Object.entries(book).map((item) => {
        formData.append(item[0], item[1]);
      });

      axios
        .put(
          `https://book-store-backend-qtea.onrender.com/books/book/${id}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          setAlertMessage("Book Edited  Successfully!");
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
            "Something is wrong. Try again later."
          );
        });
    }
  };

  return (
    <div className="flex w-2/3 mx-auto my-8 rounded-md shadow-stone-400 shadow-md font-primary  ">
      <section className="w-1/2 rounded-md p-8 pb-0">
        <div>
          <h1 className="font-semibold text-2xl mb-2">
            {edit ? "Edit" : " Add"} a Book
          </h1>
          <p className="text-sm font-light">
            "A book for the mind is what exercise is to the
            body."
            <span className="block mt-1">
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
            <p className="text-green-600 font-bold text-sm">
              {alertMessage}
            </p>
          )}
          <button
            type="button"
            onClick={edit ? bookEditing : bookCreation}
            className="w-5/6 mx-auto my-12 block square-full rounded-md bg-dark hover:bg-opacity-80  py-2 text-white"
          >
            {edit ? "Edit" : "Add"} book
          </button>{" "}
        </form>
      </section>
      <section className="w-1/2">
        <img
          src={logo}
          alt="E-library"
          className="w-full h-full rounded-e-md"
        />
      </section>
    </div>
  );
};
