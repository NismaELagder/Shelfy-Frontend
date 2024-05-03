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
    <div className="bg-white w-screen flex flex-col justify-center basis-11/12 px-4 min-[360px]:px-10 min-[460px]:px-30 sm:px-30 min-[900px]:px-32 xl:px-48">
      {!Object.keys(BooksCtx.books).length ? <Spinner /> : <Books />}
    </div>
  );
};
