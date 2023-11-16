import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { TitleComponent } from "../../../UI/common/TitleComponent";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  CircularProgress,
  stepButtonClasses,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { TokenContext } from "../../../contexts/TokenContext";
import { TeacherSubjectContext } from "../../../contexts/TeacherSubjectContext";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const TeacherSubjectInformation = () => {
  const { token } = useContext(TokenContext);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [subjectInfo, setSubjectInfo] = useState();
  const { state } = useLocation();
  useEffect(() => {
    setSubjectInfo(state);
  }, []);
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
                Subject :
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
              {/* <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction label="Recents" />
                <BottomNavigationAction label="Favorites" />
                <BottomNavigationAction label="Nearby" />
              </BottomNavigation> */}
              <li>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`props/Attendance`)}
                >
                  Attendance
                </Button>
              </li>
              {state &&
              state.teacherSubjects &&
              state.teacherSubjects.length > 0 ? (
                state.teacherSubjects.map((teacherRole) => (
                  <li key={teacherRole.id}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(`props/Teachers`, {
                          state: state.teacherSubjects,
                        })
                      }
                    >
                      Teachers
                    </Button>
                  </li>
                ))
              ) : subjectInfo &&
                subjectInfo.teacherSubjects &&
                subjectInfo.teacherSubjects.length > 0 ? (
                <li>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(`props/Teachers`, {
                        state: subjectInfo.teacherSubjects,
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
                    onClick={() => navigate(`props/Teachers`)}
                  >
                    Teachers
                  </Button>
                </li>
              )}

              {state && state.exams && state.exams.length > 0 ? (
                state.exams.map((exam) => (
                  <li key={exam.id}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(`props/${exam.examType}/${exam.id}`)
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
                        navigate(`props/${exam.examType}/${exam.id}`)
                      }
                    >
                      {exam.name}
                    </Button>
                  </li>
                ))
              ) : (
                <li></li>
              )}
            </ul>
          </div>
          <div className="subject-information-main">
            <TeacherSubjectContext.Provider value={{ subjectInfo }}>
              <Outlet />
            </TeacherSubjectContext.Provider>
          </div>
        </section>
      </div>
    </div>
  );
};
export default TeacherSubjectInformation;
