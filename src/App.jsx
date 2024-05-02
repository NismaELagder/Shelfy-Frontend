import { Route, Routes } from "react-router-dom";
import BooksContextProvider from "./store/BooksContextProvider";
import AuthContextProvider from "./store/AuthContextProvider";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PDFViewer from "./components/PDFViewer";
import { Home } from "./pages/Home";
import { CreateBook } from "./pages/CreateBook";
import { EditBook } from "./pages/EditBook";
import { BookDetails } from "./pages/BookDetails";
import { Wrapper } from "./pages/Wrapper";

function App() {

  return (
    <AuthContextProvider>
      <BooksContextProvider>

        <Routes>
          <Route path="/" element={<Wrapper ><Home /></Wrapper>} />
          <Route path="/books" element={<Wrapper ><Home /></Wrapper>} />

          <Route
            path="/books/:id"
            element={<Wrapper><BookDetails /></Wrapper>}
          />
          <Route
            path="/books/createbook"
            element={<Wrapper><CreateBook /></Wrapper>}
          />
          <Route
            path="/books/editbook/:id"
            element={<Wrapper><EditBook /></Wrapper>}
          />

          <Route path="/profile" element={<Wrapper><Profile /></Wrapper>} />
          <Route
            path="/books/:id/preview/:pdf"
            element={<Wrapper><PDFViewer /></Wrapper>}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </BooksContextProvider>
    </AuthContextProvider>
  );
}

export default App;
