import React from "react";
import "./../../resources/css/Header.css";

export const Header = () => {
  return (
    <div className="header">
      <div className="sides">
        <a href="#" className="logo">
          DIVINI SOFTWARE PVT LTD.
        </a>
      </div>
      <div className="info">
        <h1>EMPLOYEE ATTENDANCE SHEET</h1>
      </div>
    </div>
  );
};

export default Header;
