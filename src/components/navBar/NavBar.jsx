import React from "react";
import { useNavigate } from "react-router-dom";
import "./navBar.scss";
const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <span onClick={() => navigate("/")}>Home</span>
      <span onClick={() => navigate("/upload")}>Upload</span>
      <span onClick={() => navigate("/with-table")}>Table View</span>
    </div>
  );
};

export default NavBar;
