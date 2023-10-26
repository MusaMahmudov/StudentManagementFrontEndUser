import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { TitleComponent } from "../../../UI/common/TitleComponent";
import "./studentsubjectinformation.scss";
import { Button, stepButtonClasses } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { TokenContext } from "../../../contexts/TokenContext";
import { StudentSubjectContext } from "../../../contexts/StudentSubjectContext";

const StudentSubjectInformation = () => {
  const { token, studentId } = useContext(TokenContext);
  console.log("student", studentId);
  const navigate = useNavigate();
  const [subjectInfo, setSubjectInfo] = useState();
  const { state } = useLocation();
  useEffect(() => {
    setSubjectInfo(state);
  }, []);

  console.log("state", state);
  console.log("subiNFO", subjectInfo);
  if (!subjectInfo) {
    return <h1>Is Loading</h1>;
  }
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
                <KeyboardBackspaceIcon /> Back to subjects
              </Button>
            </section>
          </div>
          <div className="subject-information-navigation">
            <ul>
              <li>
                <Button variant="outlined">Musa</Button>
              </li>

              {state
                ? state?.exams.map((exam) => (
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
                : subjectInfo?.exams.map((exam) => (
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
