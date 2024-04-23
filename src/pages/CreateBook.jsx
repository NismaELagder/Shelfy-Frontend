import React, {
  useEffect,
  useContext,
  useState,
} from "react";
import { AuthContext } from "../store/AuthContextProvider";
import { BookForm } from "../components/BookForm";
import { useNavigate } from "react-router-dom";
export const CreateBook = () => {
  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  let [loadForm, setLoadForm] = useState(false);
  useEffect(() => {
    if (loading) {
      if (user) {
        setLoadForm(true);
        setLoading(false);
      }
    }

    if (!loading && !localStorage.getItem("user")) {
      setLoadForm(false);
      setLoading(true);
      Navigate("/login");
    }
  }, [user, loading]);

  return <> {loadForm ? <BookForm /> : undefined} </>;
};
