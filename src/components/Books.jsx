import React, { useContext } from "react";
import { BooksContext } from "../store/BooksContextProvider.jsx";
import Book from "./Book.jsx";
const Books = () => {
  const { books } = useContext(BooksContext);
  return (
    <div className="w-5/6 mx-auto flex flex-wrap ">
      {books.map((book) => (
        <Book bookInfo={book} key={book._id} />
      ))}
    </div>
  );
};

export default Books;
