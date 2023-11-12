import { useContext } from "react";
import { TokenContext } from "../../../contexts/TokenContext";
import { tokenFullNameProperty } from "../../../utils/TokenProperties";

const TeacherDashboard = () => {
  const { decodedToken } = useContext(TokenContext);
  const teacherFullName = decodedToken[tokenFullNameProperty]
    ? decodedToken[tokenFullNameProperty]
    : null;
  return (
    <div className="main-part">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Welcome {teacherFullName ?? ""}</h1>
          </div>
          <div className="title-right">
            <h1>Home / Teacher</h1>
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

export default TeacherDashboard;
