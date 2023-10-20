import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../common/Navbar/Navbar";
import Sidebar from "../common/Sidebar/Sidebar";
import { RotateLeft } from "@mui/icons-material";
import StudentDashboard from "../Student/studentdashboard/StudentDashboard";

const Layout = () => {
  return (
    <main>
      <Navbar />
      <div className="main-container">
        <Sidebar />
        <Outlet />
      </div>
    </main>
  );
};
export default Layout;
