import { Route, Routes } from "react-router-dom";
import BooksContextProvider from "./store/BooksContextProvider";
import AuthContextProvider from "./store/AuthContextProvider";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import PDFViewer from "./components/PDFViewer";
import { Home } from "./pages/Home";
import { CreateBook } from "./pages/CreateBook";
import { EditBook } from "./pages/EditBook";
import { BookDetails } from "./pages/BookDetails";
function App() {
  return (
    <AuthContextProvider>
      <BooksContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Home />} />

          <Route
            path="/books/:id"
            element={<BookDetails />}
          />
          <Route
            path="/books/createbook"
            element={<CreateBook />}
          />
          <Route
            path="/books/editbook/:id"
            element={<EditBook />}
          />

          <Route path="/profile" element={<Profile />} />
          <Route
            path="/books/:id/preview/:pdf"
            element={<PDFViewer />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BooksContextProvider>
    </AuthContextProvider>
  );
}

export default App;
