import { Navigate, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import GridViewIcon from "@mui/icons-material/GridView";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WidgetsIcon from "@mui/icons-material/Widgets";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

import "./sidebar.scss";

const Sidebar = () => {
  return (
    <div id="sidebar">
      <div className="container">
        <div className="title">
          <p>Main menu</p>
        </div>
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="submenu">
              <GridViewIcon className="left-icon" />
              <button>Dashboard</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <CalendarMonthIcon className="left-icon" />
              <button>Schedule</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <WidgetsIcon className="left-icon" />
              <button>Groups</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
            <li className="submenu">
              <LocalLibraryIcon className="left-icon" />
              <button>Subjects</button>
              <ArrowForwardIosIcon className="right-icon" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
