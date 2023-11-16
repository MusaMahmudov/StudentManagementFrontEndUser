import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { TitleComponent } from "../../../UI/common/TitleComponent";
import InfoIcon from "@mui/icons-material/Info";
import { useService } from "../../../hooks";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../../contexts/TokenContext";
import { QueryKeys } from "../../../API/QueryKeys";
import { useNavigate } from "react-router-dom";
import NoResultAnimation from "../../../assets/animations/no-results.gif";
import { getToken } from "../../../utils/GetToken";
const TeacherSubjects = () => {
  const navigate = useNavigate();
  const { token, personId } = useContext(TokenContext);
  const { groupSubjectServices } = useService();
  const [id, setId] = useState();
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [semesterFilter, setSemesterFilter] = useState();
  useEffect(() => {
    console.log(new Date().getMonth());
    switch (new Date().getMonth()) {
      case 8:
      case 9:
      case 10:
      case 11:
      case 0:
        setSemesterFilter("Payiz");
        return;
      case 2:
      case 3:
      case 4:
      case 5:
        setSemesterFilter("Yaz");
        return;
      case 6:
      case 7:
        setSemesterFilter("Yay");
        return;
    }
  }, []);

  const groupSubjectQuery = useQuery(
    [QueryKeys.getGroupSubjectsForTeacherPage],
    () =>
      groupSubjectServices.getGroupSubjectForTeacherPage(
        personId ? personId : localStorage.getItem("teacherId"),
        token ? token : getToken()
      )
  );
  //   const groupSubjects = studentQuery.data?.data.mainGroup?.groupSubjects;
  const groupSubjects = groupSubjectQuery.data?.data;
  useEffect(() => {
    setId(personId ? personId : localStorage.getItem("teacherId"));
  }, [groupSubjectQuery.isError]);
  useEffect(() => {
    groupSubjectQuery.refetch();
  }, [personId]);
  if (groupSubjectQuery.isLoading) {
    return (
      <div className="loading">
        <CircularProgress size={400} />
      </div>
    );
  }
  if (groupSubjectQuery.isError) {
    return <h1>Error</h1>;
  }

  return (
    <div className="main-part">
      <div className="container">
        <TitleComponent child1={"Subjects"} child2={"Teacher / Subjects"} />
        <section className="content">
          <section className="subjects">
            <Box
              sx={{
                flexWrap: "wrap",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                borderRadius: 1,
              }}
            >
              {groupSubjects &&
              groupSubjects
                .filter((groupSubject) =>
                  semesterFilter === ""
                    ? groupSubject
                    : groupSubject.semester === semesterFilter
                )
                .filter((groupSubject) =>
                  yearFilter === ""
                    ? groupSubject
                    : groupSubject.year === yearFilter
                ).length > 0 ? (
                groupSubjects &&
                groupSubjects
                  .filter((groupSubject) =>
                    semesterFilter === ""
                      ? groupSubject
                      : groupSubject.semester === semesterFilter
                  )
                  .filter((groupSubject) =>
                    yearFilter === ""
                      ? groupSubject
                      : groupSubject.year === yearFilter
                  )
                  .map((groupSubject) => (
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
                              <h1>Group:{groupSubject.groupName}</h1>
                            </section>
                          </div>
                        </div>
                        <div
                          className="box-bottom"
                          onClick={() =>
                            navigate(`${groupSubject.id}/props/Attendance`, {
                              state: groupSubjects.find(
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
                  ))
              ) : (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: 80,
                    transform: "translateY(-10px)",
                  }}
                >
                  {/* <h1 className="errorMessage">No subjects</h1>
                   */}
                  <img src={NoResultAnimation}></img>
                </div>
              )}
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
          <section className="subjects-filter">
            <div className="subjects-filter-content">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Year"
                  defaultValue={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                >
                  {Array.from({ length: 11 }, (_, index) => {
                    const year = new Date().getFullYear() - index;
                    return (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Semester</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Year"
                  sx={{ background: "white" }}
                  defaultValue={semesterFilter}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                >
                  <MenuItem value={"Yaz"}>Yaz</MenuItem>
                  <MenuItem value={"Payiz"}>Payiz</MenuItem>
                  <MenuItem value={"Yay"}>Yay</MenuItem>
                </Select>
              </FormControl>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};
export default TeacherSubjects;
