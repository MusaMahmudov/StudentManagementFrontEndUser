import React from "react";
import adnsuLogo from "../../../assets/images/logo_adnsu.png";
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="left-navbar">
          <img src={adnsuLogo} className="adnsu-logo" />
        </div>
        <div className="right-navbar">
          <div className="user-info">
            <h1>Musa Mahmudov</h1>
            <p>Student</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
