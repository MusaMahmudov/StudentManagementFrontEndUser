import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import StudentDashboard from "./components/Student/studentdashboard/StudentDashboard";
import TeacherDashboard from "./components/Teacher/teacherdashboard/TeacherDashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import StudentGroups from "./components/Student/groups/Groups";
import StudentSubjects from "./components/Student/studentsubjects/StudentSubjects";
import StudentSubjectInformation from "./components/Student/studentsubjectinformation/StudentSubjectInformation";
import StudentSubjectFinalExam from "./components/Student/studentsubjectfinalexam/StudentSubjectFinalExam";
import StudentSchedule from "./components/Student/studentschedule/StudentSchedule";

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  localStorage.setItem("token", urlParams.get("token"));
  const queryClient = new QueryClient();

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "") {
      navigate("/StudentDashboard");
    }
  }, []);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/StudentDashboard"
              element={<StudentDashboard />}
            ></Route>
            <Route path="Groups" element={<StudentGroups />}></Route>
            <Route path="StudentSchedule" element={<StudentSchedule />}></Route>

            <Route
              path="StudentSubjects/:Id"
              element={<StudentSubjectInformation />}
            >
              <Route
                path="props/Final/:Id"
                element={<StudentSubjectFinalExam />}
              ></Route>
            </Route>
            <Route path="StudentSubjects" element={<StudentSubjects />}></Route>

            {/* <Route path="/Teacher" element={<Layout />}>
              <Route
                path="TeacherDashboard"
                element={<TeacherDashboard />}
              ></Route>
            </Route> */}
          </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
