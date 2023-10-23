import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../common/Navbar/Navbar";
import Sidebar from "../common/Sidebar/Sidebar";
import { RotateLeft } from "@mui/icons-material";
import StudentDashboard from "../Student/studentdashboard/StudentDashboard";
import { TokenContext } from "../../contexts/TokenContext";
import { getToken } from "../../utils/GetToken";

const Layout = () => {
  const token = getToken();
  console.log("getToken", token);
  return (
    <TokenContext.Provider value={{ token }}>
      <main>
        <Navbar />
        <div className="main-container">
          <Sidebar />
          <Outlet />
        </div>
      </main>
    </TokenContext.Provider>
  );
};
export default Layout;
