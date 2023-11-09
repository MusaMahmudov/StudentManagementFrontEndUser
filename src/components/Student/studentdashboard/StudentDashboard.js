import React, { useContext, useEffect, useState } from "react";
import "./studentdashboard.scss";
import { getToken } from "../../../utils/GetToken";
import { TokenContext } from "../../../contexts/TokenContext";
import jwtDecode from "jwt-decode";
import { tokenFullNameProperty } from "../../../utils/TokenProperties";
import SubjectIcon from "../../../assets/images/SubjectIcon.svg";
import ExamsIcon from "../../../assets/images/ExamsIcon.svg";

import { Grid, Paper } from "@mui/material";
const StudentDashboard = () => {
  const { token } = useContext(TokenContext);
  const [studentName, setStudentName] = useState("");
  useEffect(() => {
    const decodedToken = jwtDecode(token);
    setStudentName(decodedToken[tokenFullNameProperty]);
  }, []);

  return (
    <div sx={{ width: { xs: 10, sm: 20 } }} className="main-part">
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
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {/* xs: 10,
            sm: 20,
            md: 30,
            lg: 40,
            xl: 50, */}
            <Grid item xs={12} sm={10} md={8} lg={6} xl={3}>
              <Paper
                sx={{
                  height: 120,
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                }}
              >
                <div className="card-info">
                  <p>Subjects</p>
                  <h1>15</h1>
                </div>
                <div className="card-icon">
                  <img src={SubjectIcon}></img>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={6} xl={3}>
              <Paper
                sx={{
                  height: 120,
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                }}
              >
                <div className="card-info">
                  <p>Exams</p>
                  <h1>2</h1>
                </div>
                <div className="card-icon">
                  <img src={ExamsIcon}></img>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={6} xl={3}>
              <Paper
                sx={{
                  height: 120,
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                }}
              >
                <div className="card-info">
                  <p>Year</p>
                  <h1>1/4</h1>
                </div>
                <div className="card-icon">
                  <img src={SubjectIcon}></img>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={10} md={8} lg={6} xl={3}>
              <Paper
                sx={{
                  height: 120,
                  border: "1px solid black",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 15,
                }}
              >
                <div className="card-info">
                  <p>Teachers</p>
                  <h1>2</h1>
                </div>
                <div className="card-icon">
                  <img src={SubjectIcon}></img>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </section>
        <section className="todayLessons">
          <div className="container">
            <Grid container className="lessons" rowGap={2}>
              <Grid item xs={12}>
                <div className="lesson">
                  <div className="title">
                    <h1>Today's Lesson</h1>
                  </div>
                  <div className="lessonInfo">
                    <div className="info">
                      <p>Subject</p>
                      <h1>Physics</h1>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sx={{}}>
                <div className="lesson">
                  <div className="title">
                    <h1>Today's Lesson</h1>
                  </div>
                  <div className="lessonInfo"></div>
                </div>
              </Grid>
            </Grid>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;
