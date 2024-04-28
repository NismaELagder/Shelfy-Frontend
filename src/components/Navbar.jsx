import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogouthook.jsx";
import { AuthContext } from "../store/AuthContextProvider.jsx";
import { FaSignOutAlt } from "react-icons/fa";
const Navbar = () => {
  const { logout } = useLogout();
  const { user, dispatch } = useContext(AuthContext);
  const logoutHandler = () => {
    logout();
  };

  return (
    <nav className="flex w-full justify-between items-center px-[8.5%]  py-4 text-white bg-dark border-b border-palette-lighter sticky top-0 z-20">
      <Link to={"/"}>
        <p className="font-bold font-logo text-3xl">
          Shelfy
        </p>
      </Link>

      <div className="flex items-center w-1/12 justify-between ">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <div
              className="inline-block w-0.5 self-stretch bg-white opacity-100 dark:opacity-50"
            ></div>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        {user && (
          <>
            <Link
              to="/profile"
              className="text-white p-2 me-4"
            >
              {user.userName}
            </Link>
            <div
              className="inline-block w-0.5 self-stretch bg-white opacity-100 dark:opacity-50"
            ></div>
            <button onClick={logoutHandler}><FaSignOutAlt alt="Logout" /></button>

          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
