import React from "react";
import { TitleComponent } from "../../../UI/common/TitleComponent";
const StudentGroups = () => {
  return (
    <div className="main-part">
      <div className="container">
        <TitleComponent child1={"Groups"} child2={"Student / Groups"} />
        <section className="groups-list"></section>
      </div>
    </div>
  );
};
export default StudentGroups;
