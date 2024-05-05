import React, { useContext, useEffect } from "react";
import { AuthContext } from "../store/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import UserBooks from "../components/UserBooks";
import FavBooks from "../components/FavBooks";
import { IoArrowBackOutline, IoAddOutline } from "react-icons/io5";

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
    <div className="h-[92vh] bg-white w-full pt-4 flex flex-col basis-11/12 px-4 min-[360px]:px-10 min-[460px]:px-30 sm:px-30 min-[900px]:px-24">
      <nav className="font-semibold underline w-full basis-1/12 flex justify-between items-center">
        <button
          onClick={backHandler}
          className="block rounded px-2 hover:text-indigo-500"
        >
          <IoArrowBackOutline className="inline-block pr-1 text-l" />
          Back
        </button>

        <Link
          to="/books/createbook"
          className="block rounded px-2 hover:text-indigo-500 text-xl"
        ><IoAddOutline className="inline-block pr-1" />
          Add Book
        </Link>
      </nav>

      <UserBooks />

      <FavBooks />
    </div>
  );
};

export default Profile;
