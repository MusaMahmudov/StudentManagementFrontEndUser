import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "../common/Navbar/Navbar";
import Sidebar from "../common/Sidebar/Sidebar";
import { RotateLeft } from "@mui/icons-material";
import StudentDashboard from "../Student/studentdashboard/StudentDashboard";
import { TokenContext } from "../../contexts/TokenContext";
import { getDecodedToken, getToken } from "../../utils/GetToken";
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
  const [personId, setPersonId] = useState();
  const [personFullName, setPersonFullName] = useState();

  const token = getToken();
  const decodedToken = getDecodedToken();
  const userQuery = useQuery([QueryKeys.getUserById], () =>
    userServices.getUserById(decodedToken[tokenIdProperty] ?? null, token)
  );

  useEffect(() => {
    if (token) {
      if (decodedToken[tokenRoleProperty].includes("Teacher")) {
        setPersonFullName(decodedToken[tokenFullNameProperty]);
        setPersonId(userQuery.data?.data.teacher?.id);
        localStorage.setItem("teacherId", userQuery.data?.data.teacher?.id);
      } else if (decodedToken[tokenRoleProperty].includes("Student")) {
        setPersonFullName(decodedToken[tokenFullNameProperty]);
        setPersonId(userQuery.data?.data.student?.id);
        localStorage.setItem("studentId", userQuery.data?.data.student?.id);
      }
    }
  }, [userQuery.isSuccess]);

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
