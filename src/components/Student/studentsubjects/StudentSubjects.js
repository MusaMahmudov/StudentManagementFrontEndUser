import { Box } from "@mui/material";
import { TitleComponent } from "../../../UI/common/TitleComponent";
import InfoIcon from "@mui/icons-material/Info";
import "./studentsubjects.scss";
import { useService } from "../../../hooks";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../../contexts/TokenContext";
import { tokenIdProperty } from "../../../utils/TokenProperties";
import { QueryKeys } from "../../../API/QueryKeys";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
const StudentSubjects = () => {
  const navigate = useNavigate();
  const { token, studentId } = useContext(TokenContext);
  const { studentServices } = useService();
  const [id, setId] = useState();

  // const studentQuery = useQuery([QueryKeys.getStudentByIdKey], () =>
  //   studentServices.getStudentById(studentId, token)
  // );

  const studentQuery = useQuery([QueryKeys.getStudentByIdKey], () =>
    studentServices.getStudentByIdForStudentPage(studentId, token)
  );
  const groupSubjects = studentQuery.data?.data.mainGroup?.groupSubjects;
  useEffect(() => {
    setId(studentId);
  }, [studentQuery.isError]);
  useEffect(() => {
    studentQuery.refetch();
  }, [studentId]);
  console.log(studentQuery.data?.data);
  if (studentQuery.isLoading) {
    return <h1>...Is Loading</h1>;
  }
  if (studentQuery.isError) {
    return <h1>Error</h1>;
  }
  if (!studentQuery.data) {
    return <h1>No Subjects</h1>;
  }
  return (
    <div className="main-part">
      <div className="container">
        <TitleComponent child1={"Subjects"} child2={"Student / Subjects"} />
        <section className="subjects">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              p: 1,
              m: 1,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            {groupSubjects &&
              groupSubjects.map((groupSubject) => (
                <div key={groupSubject.id} className="subject">
                  <div className="box">
                    <div className="box-top">
                      <div className="box-top-title">
                        <h1 className="left">
                          <InfoIcon />
                          {groupSubject.subject.name}
                        </h1>
                        <h1 className="right">{groupSubject.year}</h1>
                      </div>
                      <div className="box-top-middle">
                        <section className="group">
                          <h1>
                            Group:{studentQuery.data?.data.mainGroup?.name}
                          </h1>
                        </section>
                        <section className="Students">
                          <h1>
                            Students:
                            {studentQuery.data?.data.mainGroup?.studentCount}
                          </h1>
                        </section>
                      </div>
                    </div>
                    <div
                      className="box-bottom"
                      onClick={() =>
                        navigate(`${groupSubject.id}?token=${token}`, {
                          state:
                            studentQuery.data?.data.mainGroup?.groupSubjects.find(
                              (groupSub) => groupSub.id === groupSubject.id
                            ),
                        })
                      }
                    >
                      <div className="box-bottom-navigate">
                        <p>Show More</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {/* <div className="subject">
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
            </div> */}
          </Box>
        </section>
      </div>
    </div>
  );
};
export default StudentSubjects;
