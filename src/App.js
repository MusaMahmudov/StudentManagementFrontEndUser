import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import StudentSubjects from "./components/Student/studentsubjects/StudentSubjects";
import StudentSubjectInformation from "./components/Student/studentsubjectinformation/StudentSubjectInformation";
import StudentSubjectFinalExam from "./components/Student/studentsubjectfinalexam/StudentSubjectFinalExam";
import StudentSchedule from "./components/Student/studentschedule/StudentSchedule";
import StudentSubjectMidtermExam from "./components/Student/studentmidtermexam/StudentMidtermExam";
import StudentSubjectQuizExam from "./components/Student/studentsubjectquizexam/StudentSubjectQuizExam";
import StudentSubjectProjectExam from "./components/Student/studentsubjectprojectexam/StudentSubjectProjectExam";
import { StudentSubjectTeachers } from "./components/Student/studentsubjectteachers/StudentSubjectTeachers";
import StudentAttendance from "./components/Student/studentattendance/StudentAttendance";
import { tokenRoleProperty } from "./utils/TokenProperties";
import TeacherSubjects from "./components/Teacher/teachersubjects/TeacherSubjects";
import TeacherSchedule from "./components/Teacher/teacherschedule/TeacherSchedule";
import TeacherSubjectInformation from "./components/Teacher/teachersubjectinformation/TeacherSubjectInformation";
import TeacherAttendance from "./components/Teacher/teacherattendance/TeacherAttendance";
import TeacherSubjectQuizExam from "./components/Teacher/teacherquizexam/TeacherQuizExam";
import TeacherSubjectMidtermExam from "./components/Teacher/teachermidtermexam/TeacherMidtermExam";
import TeacherSubjectProjectExam from "./components/Teacher/teacherprojectexam/TeacherProjectExam";
import TeacherSubjectFinalExam from "./components/Teacher/teacherfinalexam/TeacherFinalExam";
import SignIn from "./components/LoginPage/LoginPage";
import {
  getDecodedToken,
  getExpireDateToken,
  getToken,
  removeExpireDate,
  removeToken,
} from "./utils/GetToken";
import { ChangePassword } from "./components/ChangePassword/ChangePassword";
import StudentExamsSchedule from "./components/Student/studentexamsschedule/StudentExamSchedule";
import TeacherExamsSchedule from "./components/Teacher/teacherexamschedule/TeacherExamsSchedule";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import { TeacherSubjectTeachers } from "./components/Teacher/teachersubjectteachers/TeacherSubjectTeachers";
import ErrorPage from "./components/ErrorPage/ErrorPage";

function App() {
  // const urlParams = new URLSearchParams(window.location.search);
  // localStorage.setItem("token", urlParams.get("token"));
  const queryClient = new QueryClient();
  const token = getToken();
  const location = useLocation();
  const navigate = useNavigate();
  const expireDate = getExpireDateToken();
  const date = new Date();
  const expire = new Date(expireDate);
  const decodedToken = getDecodedToken();
  useEffect(() => {
    if (!token) {
      navigate("/SignIn");
      return;
    } else if (expire < date) {
      removeExpireDate();
      removeToken();
      navigate("/SignIn");
    } else if (
      decodedToken[tokenRoleProperty] === "Admin" ||
      decodedToken[tokenRoleProperty] === "Moderator"
    ) {
      removeExpireDate();
      removeToken();
      navigate("/SignIn");
    } else if (location.pathname === "/" || location.pathname === "") {
      if (!Array.isArray(decodedToken[tokenRoleProperty])) {
        if (decodedToken[tokenRoleProperty] === "Teacher") {
          navigate("/TeacherSchedule");
        }
        if (decodedToken[tokenRoleProperty] === "Student") {
          navigate("/StudentSchedule");
        }
      } else {
        if (decodedToken[tokenRoleProperty].includes("Teacher")) {
          navigate("/TeacherSchedule");
        }
        if (decodedToken[tokenRoleProperty].includes("Student")) {
          navigate("/StudentSchedule");
        }
      }
    }
  }, []);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/ChangePassword" element={<ChangePassword />}></Route>

            <Route path="StudentSchedule" element={<StudentSchedule />}></Route>
            <Route
              path="StudentExamsSchedule"
              element={<StudentExamsSchedule />}
            ></Route>

            <Route
              path="StudentSubjects/:Id"
              element={<StudentSubjectInformation />}
            >
              <Route
                path="props/Teachers"
                element={<StudentSubjectTeachers />}
              ></Route>

              <Route
                path="props/Attendance"
                element={<StudentAttendance />}
              ></Route>
              <Route
                path="props/Final/:Id"
                element={<StudentSubjectFinalExam />}
              ></Route>
              <Route
                path="props/Midterm/:Id"
                element={<StudentSubjectMidtermExam />}
              ></Route>
              <Route
                path="props/Quiz/:Id"
                element={<StudentSubjectQuizExam />}
              ></Route>
              <Route
                path="props/Project/:Id"
                element={<StudentSubjectProjectExam />}
              ></Route>
            </Route>
            <Route path="StudentSubjects" element={<StudentSubjects />}></Route>

            <Route path="TeacherSchedule" element={<TeacherSchedule />}></Route>
            <Route
              path="TeacherExamsSchedule"
              element={<TeacherExamsSchedule />}
            ></Route>
            <Route path="TeacherSubjects" element={<TeacherSubjects />}></Route>

            <Route
              path="TeacherSubjects/:Id"
              element={<TeacherSubjectInformation />}
            >
              <Route
                path="props/Teachers"
                element={<TeacherSubjectTeachers />}
              ></Route>

              <Route
                path="props/Attendance"
                element={<TeacherAttendance />}
              ></Route>
              <Route
                path="props/Quiz/:Id"
                element={<TeacherSubjectQuizExam />}
              ></Route>
              <Route
                path="props/Midterm/:Id"
                element={<TeacherSubjectMidtermExam />}
              ></Route>
              <Route
                path="props/Project/:Id"
                element={<TeacherSubjectProjectExam />}
              ></Route>
              <Route
                path="props/Final/:Id"
                element={<TeacherSubjectFinalExam />}
              ></Route>
            </Route>
          </Route>
          <Route path="/ForgotPassword" element={<ForgotPassword />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>

          <Route path="/ErrorPage" element={<ErrorPage />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
