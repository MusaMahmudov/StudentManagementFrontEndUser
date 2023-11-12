import React, { useEffect, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar/Navbar";
import Sidebar from "../common/Sidebar/Sidebar";
import { Margin, RotateLeft, Try } from "@mui/icons-material";
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
import { CircularProgress } from "@mui/material";

const Layout = () => {
  const { userServices, studentServices } = useService();
  const [personId, setPersonId] = useState();
  const [personFullName, setPersonFullName] = useState();
  const navigate = useNavigate();
  const token = getToken();
  const decodedToken = jwtDecode(token);
  const [isOpen, setIsOpen] = useState();

  const userQuery = useQuery([QueryKeys.getUserById], () =>
    userServices.getUserById(decodedToken[tokenIdProperty], token)
  );
  const onToggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  useEffect(() => {
    if (userQuery.isError) {
      navigate("/Aue");
      return;
    }
  }, [userQuery.isError]);
  console.log(userQuery.data?.data);
  useEffect(() => {
    if (
      userQuery.data?.data.student === null &&
      userQuery.data?.data.teacher === null
    ) {
      return;
    }

    if (token) {
      if (decodedToken[tokenRoleProperty].includes("Teacher")) {
        setPersonFullName(decodedToken[tokenFullNameProperty]);
        setPersonId(userQuery.data?.data.teacher.id);
        localStorage.setItem("teacherId", userQuery.data?.data.teacher.id);
      } else if (decodedToken[tokenRoleProperty].includes("Student")) {
        setPersonFullName(decodedToken[tokenFullNameProperty]);
        setPersonId(userQuery.data?.data.student?.id);
        localStorage.setItem("studentId", userQuery.data?.data.student.id);
      }
    } else {
      navigate("/SignIn");
    }
  }, [userQuery.isSuccess]);
  if (userQuery.isLoading || !personId) {
    <div className="loading">
      <CircularProgress size={400} />
    </div>;
  }
  const contentWrapperStyle = (isOpen) => ({
    marginLeft: isOpen ? 210 : 0,
    transition: "margin 0.1s",
  });
  if (!personId) {
    return (
      <div className="loading">
        <CircularProgress size={400} />
      </div>
    );
  }

  return (
    <TokenContext.Provider
      value={{ token, personId, personFullName, decodedToken }}
    >
      <main>
        <Navbar onToggleSidebar={onToggleSidebar} />
        <div className="main-container" style={contentWrapperStyle(isOpen)}>
          <Sidebar isOpen={isOpen} />
          <Outlet />
        </div>
      </main>
    </TokenContext.Provider>
  );
};
export default Layout;
