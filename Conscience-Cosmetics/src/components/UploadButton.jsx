import React from "react";
import { Link } from "react-router-dom";

const UploadButton = () => {
  return (
    <Link to="/UploadPage">
      <button className="btn btn-warning">Upload</button>
    </Link>
  );
};

export default UploadButton;
