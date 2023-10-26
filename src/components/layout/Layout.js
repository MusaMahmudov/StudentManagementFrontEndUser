import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../common/Navbar/Navbar";
import Sidebar from "../common/Sidebar/Sidebar";
import { RotateLeft } from "@mui/icons-material";
import StudentDashboard from "../Student/studentdashboard/StudentDashboard";
import { TokenContext } from "../../contexts/TokenContext";
import { getToken } from "../../utils/GetToken";
import jwtDecode from "jwt-decode";
import { useService } from "../../hooks";
import { useQuery } from "react-query";
import { QueryKeys } from "../../API/QueryKeys";
import {
  tokenFullNameProperty,
  tokenIdProperty,
} from "../../utils/TokenProperties";

const Layout = () => {
  const { userServices, studentServices } = useService();
  const token = getToken();
  const decodedToken = jwtDecode(token);
  const userQuery = useQuery([QueryKeys.getStudentByIdKey], () =>
    userServices.getUserById(decodedToken[tokenIdProperty], token)
  );

  const studentFullName = decodedToken[tokenFullNameProperty];
  const studentId = userQuery.data?.data.student?.id;
  localStorage.setItem("studentId", studentId);

  return (
    <TokenContext.Provider value={{ token, studentId, studentFullName }}>
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
