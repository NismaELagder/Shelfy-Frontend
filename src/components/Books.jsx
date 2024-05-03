import React, { useContext } from "react";
import { BooksContext } from "../store/BooksContextProvider.jsx";
import Book from "./Book.jsx";
const Books = () => {
  const { books } = useContext(BooksContext);
  return (
    <div className="bg-white flex flex-col">
      {
        Object.keys(books).map((key) => (
          <div className=" border-dashed flex flex-col mb-4">

            <div className="capitalize text-xl font-medium pt-4 pb-1">{key}</div>
            {/* max-[431px]:justify-around justify-start */}
            <div className="flex flex-wrap  max-[351px]:justify-around overflow-y-auto h-[335px] sm:h-[385px]">
              {
                books[key].map(book => (
                  <Book bookInfo={book} key={book._id} />
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Books;
