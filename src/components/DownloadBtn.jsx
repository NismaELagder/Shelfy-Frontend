import React from "react";
import { Link } from "react-router-dom";

const DownloadBtn = ({ className, pdf }) => {
  return (
    <Link
      className={className}
      download
      to={`https://book-store-backend-qtea.onrender.com/pdfs/${pdf}`}
      target="_blank"
    >
      Download
    </Link>
  );
};

export default DownloadBtn;
