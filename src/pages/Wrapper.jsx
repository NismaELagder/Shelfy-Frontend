import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export const Wrapper = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="h-[92vh] mt-[7vh] w-full bg-white">
      {(pathname != "/login" && pathname != "/signup") && <Navbar />}

      {children}

    </div>
  );
};

export default Wrapper;
