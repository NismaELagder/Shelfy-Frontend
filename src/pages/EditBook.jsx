import React, {
  useEffect,
  useContext,
  useState,
} from "react";
import { AuthContext } from "../store/AuthContextProvider";
import { BookForm } from "../components/BookForm";
import { useNavigate } from "react-router-dom";
export const EditBook = () => {
  const { user, loading } = useContext(AuthContext);
  const Navigate = useNavigate();
  let [loadForm, setLoadForm] = useState();
  useEffect(() => {
    console.log("create book");
    if (!loading && user) {
      setLoadForm(true);
    }

    if (!loading && !user) {
      setLoadForm(false);
      Navigate("/login");
    }
  }, [user]);

  return (
    <> {loadForm ? <BookForm edit={true} /> : undefined} </>
  );
};
