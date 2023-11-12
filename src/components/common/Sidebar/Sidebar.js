import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GridViewIcon from "@mui/icons-material/GridView";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import "./sidebar.scss";
import { useContext } from "react";
import { TokenContext } from "../../../contexts/TokenContext";
import { tokenRoleProperty } from "../../../utils/TokenProperties";
import { Drawer } from "@mui/material";

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();
  const { token, decodedToken } = useContext(TokenContext);
  if (token) {
    if (
      (Array.isArray(decodedToken[tokenRoleProperty])
        ? decodedToken[tokenRoleProperty].includes("Student")
        : decodedToken[tokenRoleProperty] === "Student") &&
      token
    )
      return (
        <Drawer
          style={{
            width: 240,
            marginTop: 65,
            height: "100%",
            overflowY: "auto",
          }}
          variant="persistent"
          anchor="left"
          open={isOpen}
          sx={{
            background: "transparent",
            position: "fixed",
            "&.MuiDrawer-root .MuiDrawer-paper": { marginTop: "80px" },
            height: "100vh",
          }}
        >
          <div id="sidebar">
            <div className="container">
              <div className="title">
                <p>Main menu</p>
              </div>
              <div className="sidebar-menu">
                <ul className="menu">
                  <li
                    className="submenu"
                    onClick={() => navigate(`StudentSchedule`)}
                  >
                    <CalendarMonthIcon className="left-icon" />
                    <button>Schedule</button>
                    <ArrowForwardIosIcon className="right-icon" />
                  </li>
                  <li
                    className="submenu"
                    onClick={() => navigate(`StudentExamsSchedule`)}
                  >
                    <CalendarMonthIcon className="left-icon" />
                    <button>Exams Schedule</button>
                    <ArrowForwardIosIcon className="right-icon" />
                  </li>
                  {/* <li className="submenu">
                    <WidgetsIcon className="left-icon" />
                    <button>Groups</button>
                    <ArrowForwardIosIcon className="right-icon" />
                  </li> */}
                  <li
                    className="submenu"
                    onClick={() => navigate(`StudentSubjects`)}
                  >
                    <LocalLibraryIcon className="left-icon" />
                    <button>Subjects</button>
                    <ArrowForwardIosIcon className="right-icon" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Drawer>
      );
    else {
      return (
        <Drawer
          style={{
            width: 240,
            marginTop: 65,
            height: "100%",
            overflowY: "auto",
          }}
          variant="persistent"
          anchor="left"
          open={isOpen}
          sx={{
            background: "transparent",
            position: "fixed",
            "&.MuiDrawer-root .MuiDrawer-paper": { marginTop: "80px" },
            height: "100vh",
          }}
        >
          <div id="sidebar">
            <div className="container">
              <div className="title">
                <p>Main menu</p>
              </div>
              <div className="sidebar-menu">
                <ul className="menu">
                  <li
                    className="submenu"
                    onClick={() => navigate(`TeacherSchedule`)}
                  >
                    <CalendarMonthIcon className="left-icon" />
                    <button>Schedule</button>
                    <ArrowForwardIosIcon className="right-icon" />
                  </li>
                  <li
                    className="submenu"
                    onClick={() => navigate(`TeacherExamsSchedule`)}
                  >
                    <CalendarMonthIcon className="left-icon" />
                    <button>Exams Schedule</button>
                    <ArrowForwardIosIcon className="right-icon" />
                  </li>
                  {/* <li className="submenu">
                    <WidgetsIcon className="left-icon" />
                    <button>Groups</button>
                    <ArrowForwardIosIcon className="right-icon" />
                  </li> */}
                  <li
                    className="submenu"
                    onClick={() => navigate(`TeacherSubjects`)}
                  >
                    <LocalLibraryIcon className="left-icon" />
                    <button>Subjects</button>
                    <ArrowForwardIosIcon className="right-icon" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Drawer>
      );
    }
  }
};
export default Sidebar;
