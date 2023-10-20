import { Box } from "@mui/material";
import { TitleComponent } from "../../../UI/common/TitleComponent";
import InfoIcon from "@mui/icons-material/Info";
import "./studentsubjects.scss";
const StudentSubjects = () => {
  return (
    <div className="main-part">
      <div className="container">
        <TitleComponent child1={"Subjects"} child2={"Student / Subjects"} />
        <section className="subjects">
          <Box
            sx={{
              display: "flex",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <div className="subject">
              <div className="box">
                <div className="box-top">
                  <div className="box-top-title">
                    <h1 className="left">
                      <InfoIcon />
                      Math 2
                    </h1>
                    <h1 className="right">2023</h1>
                  </div>
                  <div className="box-top-middle">
                    <section className="group">
                      <h1>Group:284.20E</h1>
                    </section>
                    <section className="Students">
                      <h1>Students:20</h1>
                    </section>
                  </div>
                </div>
                <div className="box-bottom">
                  <div className="box-bottom-navigate">
                    <p>Show More</p>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </section>
      </div>
    </div>
  );
};
export default StudentSubjects;
