import axios from "axios";
export const toggleFavBook = (bookdetails, user) => {
  let results;
  return axios
    .put(
      `http://localhost:4000/books/book/read/${bookdetails._id}`,
      null,
      {
        headers: {
          authorization: `Bearer ${user?.token}`,
        },
      }
    )
    .then((response) => {
      results = response.data;
      let savedFavBooks = JSON.parse(localStorage.getItem("favBooks")) || [];
      if (results.length > 0) {
        savedFavBooks.push(bookdetails._id)
      } else {
        const index = savedFavBooks.indexOf(bookdetails._id);
        if (index > -1) {
          savedFavBooks.splice(index, 1);
        }
      }
      localStorage.setItem("favBooks", JSON.stringify(savedFavBooks));
      return results
    });

  return results;
};

export const findIsFav = (bookId) => {
  let savedFavBooks = JSON.parse(localStorage.getItem("favBooks")) || [];
  if (savedFavBooks.includes(bookId)) {
    return true;
  }
  return false;
}

export default { toggleFavBook, findIsFav };
