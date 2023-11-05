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
  tokenRoleProperty,
} from "../../utils/TokenProperties";

const Layout = () => {
  const { userServices, studentServices } = useService();
  const token = getToken();
  const decodedToken = jwtDecode(token);
  const userQuery = useQuery([QueryKeys.getStudentByIdKey], () =>
    userServices.getUserById(decodedToken[tokenIdProperty], token)
  );
  console.log("decoded", decodedToken);
  let personFullName;
  let personId;
  if (decodedToken[tokenRoleProperty] === "Student") {
    personFullName = decodedToken[tokenFullNameProperty];
    personId = userQuery.data?.data.student?.id;
    localStorage.setItem("personId", personId);
  } else if (decodedToken[tokenRoleProperty] === "Teacher") {
    personFullName = decodedToken[tokenFullNameProperty];
    personId = userQuery.data?.data.teacher?.id;
    localStorage.setItem("personId", personId);
  }
  console.log("person", personId);
  return (
    <TokenContext.Provider
      value={{ token, personId, personFullName, decodedToken }}
    >
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
