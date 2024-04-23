import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";
const PDFViewer = () => {
  const { pdf: to } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const backHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!user && !localStorage.getItem("user")) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="w-4/5 mx-auto flex justify-between my-4 items-center">
        <button
          onClick={backHandler}
          className=" rounded-full bg-dark px-12 py-2 text-white"
        >
          Back
        </button>
        <p className="text-center text-sm">
          <span className="text-red-600 font-semibold font-primary pe-4 text-base">
            Note
          </span>
          If you want to preview the file but auto-download
          is triggered, check your system's apps. (E.g. to
          prevent auto-download by IDM, You have to press
          -Alt key- while page loading).
        </p>{" "}
      </div>
      <p className="text-center text-4xl mt-16 mb-12 font-primary  font-semibold capitalize">
        {to.substring(0, to.lastIndexOf(".pdf"))}
      </p>
      <object
        data={`https://book-store-backend-qtea.onrender.com/pdfs/${to}#toolbar=0`}
        type="application/pdf"
        className="w-4/5 mx-auto  h-[80vh]"
      />
    </>
  );
};

export default PDFViewer;
