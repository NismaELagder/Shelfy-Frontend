import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";
import { IoArrowBackOutline, IoInformationCircleOutline } from "react-icons/io5";


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
    <div className="h-[92vh] bg-white w-full pt-4 flex flex-col basis-11/12 px-4 min-[360px]:px-10 min-[460px]:px-30 sm:px-30 min-[900px]:px-24">
      <div className="flex flex-col justify-start mt-4 mb-2 items-start">
        <button
          onClick={backHandler}
          className="block rounded px-2 hover:text-indigo-500"
        >
          <IoArrowBackOutline className="inline-block pr-1" />
          Back
        </button>
        <p className="block mt-2 mb-4 p-2 bg-sky-200 rounded w-full">
          <IoInformationCircleOutline className="inline w-[20px] h-[20px]" /> Note:
          If you want to preview the file but auto-download
          is triggered, check your system's apps. (E.g. to
          prevent auto-download by IDM, you have to press
          -Alt key- while page loading).
        </p>
      </div>
      <p className="text-center text-xl mt-2 mb-12 font-primary font-semibold capitalize">
        {to.substring(0, to.lastIndexOf(".pdf"))}
      </p>
      <object
        data={`https://book-store-backend-qtea.onrender.com/pdfs/${to}#toolbar=0`}
        type="application/pdf"
        className="w-4/5 mx-auto h-[80vh]"
      />
    </div>
  );
};

export default PDFViewer;
