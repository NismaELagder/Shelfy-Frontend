import React from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export const Wrapper = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <div className="h-screen w-screen bg-white flex flex-col">
      {(pathname != "/login" && pathname != "/signup") && <Navbar />}
      <div className="mt-16">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
