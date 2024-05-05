import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { AuthContext } from "./AuthContextProvider";
import axios from "axios";

export const BooksContext = createContext({
  books: [],
  loading: false,
});

const BooksContextProvider = ({ children }) => {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(
        "http://localhost:4000/books",
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((response) => {
        setLoading(true);
        setBooks((preBooks) => Object.groupBy([...response.data], ({ category }) => category.toLowerCase()));
        setLoading(false);
      });
  }, [user]);

  const ctxValue = {
    books,
  };
  return (
    <BooksContext.Provider value={ctxValue}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksContextProvider;
