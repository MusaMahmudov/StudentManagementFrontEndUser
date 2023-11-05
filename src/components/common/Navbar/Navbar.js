import React, { useContext, useEffect, useState } from "react";
import adnsuLogo from "../../../assets/images/logo_adnsu.png";
import "./navbar.scss";
import { TokenContext } from "../../../contexts/TokenContext";
import jwtDecode from "jwt-decode";
import {
  tokenEmailProperty,
  tokenFullNameProperty,
  tokenRoleProperty,
  tokenUserNameProperty,
} from "../../../utils/TokenProperties";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const [userInfo, setUserInfo] = useState({
    userName: "",
    roleName: "",
  });
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInfo({
        userName: decodedToken[tokenUserNameProperty],
        roleName: decodedToken[tokenRoleProperty],
      });
    }
  }, []);

  const handleLogout = () => {
    if (token) {
      // authServices.Logout(token);
      localStorage.removeItem("token");
      window.location.href = "http://localhost:3000/SignIn";
    }
  };

  return (
    <div className="header">
      <div className="container">
        <div className="left-navbar">
          <img src={adnsuLogo} className="adnsu-logo" />
        </div>
        <div className="right-navbar">
          <div>
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
          <div className="user-info">
            <h1>{userInfo.userName}</h1>
            <p>{userInfo.roleName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
