import React, { useContext, useEffect, useState } from "react";
import adnsuLogo from "../../../assets/images/logo_adnsu.png";
import "./navbar.scss";
import { TokenContext } from "../../../contexts/TokenContext";
import jwtDecode from "jwt-decode";
import {
  tokenRoleProperty,
  tokenUserNameProperty,
} from "../../../utils/TokenProperties";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { getDecodedToken } from "../../../utils/GetToken";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Popover } from "@mui/material";
import Button from "@mui/material/Button";

const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);
  const [cookie, setCookie, removeCookie] = useCookies(["tokenCookie"]);
  const [userInformation, setUserInformation] = useState({
    userName: "",
    role: "",
  });

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserInformation({
        userName: decodedToken[tokenUserNameProperty],
        role: decodedToken[tokenRoleProperty],
      });
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleLogout = () => {
    if (token) {
      const decodedToken = getDecodedToken();

      if (decodedToken[tokenRoleProperty].includes("Teacher")) {
        removeCookie("tokenTeacher");
        removeCookie("expireDateTeacher");
        localStorage.clear();
        navigate("/SignIn");
      } else if (decodedToken[tokenRoleProperty].includes("Student")) {
        removeCookie("tokenStudent");
        removeCookie("expireDateStudent");
        localStorage.clear();
        navigate("/SignIn");
      }
    }
  };

  return (
    <div className="header">
      <div className="container">
        <div className="left-navbar">
          <img src={adnsuLogo} className="adnsu-logo" />
        </div>
        <div className="right-navbar">
          <div className="user-info">
            <Button
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            >
              <span>
                <PersonIcon sx={{ fontSize: 35, marginTop: 1 }} />
              </span>
              <span>
                <h1>{userInformation.userName}</h1>
                <p>
                  {userInformation.role.includes("Teacher")
                    ? "Teacher"
                    : "Student"}
                </p>
              </span>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Button
                  sx={{ padding: "10px 30px" }}
                  onClick={() => navigate("MyProfile")}
                >
                  My Profile
                </Button>
                <Button
                  sx={{ padding: "10px 10px", fontSize: "13px" }}
                  onClick={() => navigate("ChangePassword")}
                >
                  Change Password
                </Button>
                <Button
                  sx={{ padding: "10px 30px" }}
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </Box>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
