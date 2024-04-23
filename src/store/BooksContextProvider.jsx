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
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(
        "https://book-store-backend-qtea.onrender.com/books",
        {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        }
      )
      .then((response) => {
        setLoading(true);
        setBooks((preBooks) => [...response.data]);
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
