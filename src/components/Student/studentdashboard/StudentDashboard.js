import React from "react";
import "./studentdashboard.scss";
const StudentDashboard = () => {
  return (
    <div className="main-part">
      <div className="container">
        <section className="title">
          <div className="title-left">
            <h1>Welcome Musa</h1>
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
