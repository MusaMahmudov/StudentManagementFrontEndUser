import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { TitleComponent } from "../../../UI/common/TitleComponent";
import "./studentsubjectinformation.scss";
import { Button, stepButtonClasses } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { TokenContext } from "../../../contexts/TokenContext";
import { StudentSubjectContext } from "../../../contexts/StudentSubjectContext";
import { SatelliteAlt } from "@mui/icons-material";
import { Query, useQuery } from "react-query";
import { QueryKeys } from "../../../API/QueryKeys";
import { useService } from "../../../hooks";

const StudentSubjectInformation = () => {
  const { examServices } = useService();
  const { token } = useContext(TokenContext);

  const navigate = useNavigate();
  const [subjectInfo, setSubjectInfo] = useState();
  const { Id: groupSubjectId } = useParams();
  console.log("params", groupSubjectId);
  const { state } = useLocation();
  useEffect(() => {
    setSubjectInfo(state);
  }, []);
  const examQuery = useQuery([QueryKeys.getExamQueryKeys], () =>
    examServices.getExamForSubjectsforStudentPage(groupSubjectId, token)
  );
  console.log("examQuery", examQuery.data?.data);

  console.log("state", state);
  console.log("subiNFO", subjectInfo);

  return (
    <div className="main-part">
      <div className="container">
        <TitleComponent
          child1={"Subject Details"}
          child2={"Subjects / Subject"}
        />
        <section className="subject-information">
          <div className="subject-information-title">
            <section className="subject-name">
              <h1>
                Subject :{" "}
                {state ? state.subject?.name : subjectInfo?.subject.name}
              </h1>
            </section>
            <section className="back">
              <Button onClick={() => navigate(-1)} variant="contained">
                <KeyboardBackspaceIcon /> Back
              </Button>
            </section>
          </div>
          <div className="subject-information-navigation">
            <ul>
              <li>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`props/Attendance?token=${token}`)}
                >
                  Attendance
                </Button>
              </li>
              {state && state.teacherRoles && state.teacherRoles.length > 0 ? (
                state.teacherRoles.map((teacherRole) => (
                  <li key={teacherRole.id}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(`props/Teachers?token=${token}`, {
                          state: state.teacherRoles,
                        })
                      }
                    >
                      Teachers
                    </Button>
                  </li>
                ))
              ) : subjectInfo &&
                subjectInfo.teacherRoles &&
                subjectInfo.teacherRoles.length > 0 ? (
                <li>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(`props/Teachers?token=${token}`, {
                        state: subjectInfo.teacherRoles,
                      })
                    }
                  >
                    Teachers
                  </Button>
                </li>
              ) : (
                <li>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`props/Teachers?token=${token}`)}
                  >
                    Teachers
                  </Button>
                </li>
              )}

              {/* {state && state.exams && state.exams.length > 0 ? (
                state.exams.map((exam) => (
                  <li key={exam.id}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `props/${exam.examType}/${exam.id}?token=${token}`
                        )
                      }
                    >
                      {exam.name}
                    </Button>
                  </li>
                ))
              ) : subjectInfo &&
                subjectInfo.exams &&
                subjectInfo.exams.length > 0 ? (
                subjectInfo.exams.map((exam) => (
                  <li key={exam.id}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(
                          `props/${exam.examType}/${exam.id}?token=${token}`
                        )
                      }
                    >
                      {exam.name}
                    </Button>
                  </li>
                ))
              ) : (
                <li></li>
              )} */}
              {examQuery.data?.data.map((exam) => (
                <li key={exam.id}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(
                        `props/${exam.examType}/${exam.id}?token=${token}`,
                        { state: groupSubjectId }
                      )
                    }
                  >
                    {exam.name}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="subject-information-main">
            <StudentSubjectContext.Provider value={{ subjectInfo }}>
              <Outlet />
            </StudentSubjectContext.Provider>
          </div>
        </section>
      </div>
    </div>
  );
};
export default StudentSubjectInformation;
