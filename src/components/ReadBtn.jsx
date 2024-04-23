import React from "react";
import { Link } from "react-router-dom";
const ReadBtn = ({ className, to }) => {
  return (
    <Link className={className} to={`preview/${to}`}>
      Preview PDF
    </Link>
  );
};

export default ReadBtn;
