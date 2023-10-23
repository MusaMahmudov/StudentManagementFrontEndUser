import React, { useContext, useEffect, useState } from "react";
import "./studentdashboard.scss";
import { getToken } from "../../../utils/GetToken";
import { TokenContext } from "../../../contexts/TokenContext";
import jwtDecode from "jwt-decode";
import { tokenFullNameProperty } from "../../../utils/TokenProperties";

const StudentDashboard = () => {
  const { token } = useContext(TokenContext);
  const [studentName, setStudentName] = useState("");
  useEffect(() => {
    const decodedToken = jwtDecode(token);
    setStudentName(decodedToken[tokenFullNameProperty]);
  }, []);
  return (
    <div className="main-part">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Welcome {studentName}</h1>
          </div>
          <div className="title-right">
            <h1>Home / Student</h1>
          </div>
        </section>
        <section className="numbers">
          <div className="info">
            <div className="container">
              <div className="info-left"></div>
              <div className="info-right"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
