import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogouthook.jsx";
import { AuthContext } from "../store/AuthContextProvider.jsx";
const Navbar = () => {
  const { logout } = useLogout();
  const { user, dispatch } = useContext(AuthContext);
  const logoutHandler = () => {
    logout();
  };

  return (
    <nav className="flex w-full justify-between items-center px-[8.5%]  py-4  text-dark bg-white ">
      <Link to={"/"}>
        <p className="font-bold font-logo">
          Online Book Store
        </p>
      </Link>

      <div className="flex items-center w-1/12 justify-between ">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        {user && (
          <>
            <Link
              to="/profile"
              className="text-dark bg-slate-100 p-2 me-4 rounded-full"
            >
              {user.userName}
            </Link>
            <button onClick={logoutHandler}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
