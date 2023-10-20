import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import StudentDashboard from "./components/Student/studentdashboard/StudentDashboard";
import TeacherDashboard from "./components/Teacher/teacherdashboard/TeacherDashboard";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes path="/">
            <Route path="/Student" element={<Layout />}>
              <Route
                path="StudentDashboard"
                element={<StudentDashboard />}
              ></Route>
            </Route>

            <Route path="/Teacher" element={<Layout />}>
              <Route
                path="TeacherDashboard"
                element={<TeacherDashboard />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
