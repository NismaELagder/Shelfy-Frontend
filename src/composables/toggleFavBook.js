import axios from "axios";
const toggleFavBook = (bookdetails, user) => {
  let results;
  axios
    .put(
      `https://book-store-backend-qtea.onrender.com/books/book/read/${bookdetails._id}`,
      null,
      {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      }
    )
    .then((response) => {
      results = response.data;
    });

  return results;
};

export default toggleFavBook;
