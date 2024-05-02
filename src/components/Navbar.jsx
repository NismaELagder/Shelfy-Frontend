import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogouthook.jsx";
import { AuthContext } from "../store/AuthContextProvider.jsx";

import { PiUserCircleThin, PiSignOutBold } from "react-icons/pi";
const Navbar = () => {
  const { logout } = useLogout();
  const { user, dispatch } = useContext(AuthContext);
  const logoutHandler = () => {
    logout();
  };
  
  return (
    <nav className="w-screen bg-stone-100 shadow-md shadow-black/5 flex-no-wrap fixed top-0 flex z-20 justify-between items-center py-4 px-4 min-[360px]:px-10 min-[460px]:px-30 sm:px-30 min-[900px]:px-32 xl:px-48">
      <Link to={"/"}>
        <p className="block text-2xl sm:text-3xl text-indigo-600 font-logo font-extrabold hover:text-indigo-400">
          Shelfy
        </p>
      </Link>

      {user && (
        <div className="flex justify-end items-center basis-2/6">
          <Link
            to="/profile"
            className="inline-block flex items-center justify-center pr-2"
          >
            <PiUserCircleThin className="w-[25px] h-[25px]" />
            {user.userName}
          </Link>

          <button onClick={logoutHandler} className="flex items-center justify-center w-[20px] h-[20px] p-0.5">
            <PiSignOutBold alt="Logout" />
          </button>

        </div>

      )}
    </nav>
  );
};

export default Navbar;
