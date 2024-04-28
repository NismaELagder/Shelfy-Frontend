import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BooksContext } from "../store/BooksContextProvider.jsx";
import { AuthContext } from "../store/AuthContextProvider.jsx";
import Spinner from "../components/Spinner";
import Books from "../components/Books.jsx";
export const Home = () => {
  const BooksCtx = useContext(BooksContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="bg-white min-h-[89.9vh] py-4">
      {!BooksCtx.books.length ? <Spinner /> : <Books />}
    </div>
  );
};
