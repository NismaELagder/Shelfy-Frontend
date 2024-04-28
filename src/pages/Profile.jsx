import React, { useContext, useEffect } from "react";
import { AuthContext } from "../store/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import UserBooks from "../components/UserBooks";
import FavBooks from "../components/FavBooks";
const Profile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [user]);
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <div className="w-5/6 mx-auto ">
      <nav className="my-4 flex justify-between px-12">
        <button
          onClick={backHandler}
          className=" rounded-lg bg-dark hover:bg-opacity-80 px-6 py-2 text-white text-sm"
        >
          Back
        </button>
        <Link
          to="/books/createbook"
          className=" py-2  px-4 bg-dark hover:bg-opacity-80 rounded-lg text-white text-sm"
        >
          Add Book
        </Link>
      </nav>
      <UserBooks />
      <FavBooks />
    </div>
  );
};

export default Profile;
