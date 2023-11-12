import {
  Alert,
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
import "./studentsubjects.scss";
import { useService } from "../../../hooks";
import { useQuery } from "react-query";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../../contexts/TokenContext";
import { tokenIdProperty } from "../../../utils/TokenProperties";
import { QueryKeys } from "../../../API/QueryKeys";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import tippy from "tippy.js";
import NoResultAnimation from "../../../assets/animations/no-results.gif";

const StudentSubjects = () => {
  const navigate = useNavigate();
  const { token, personId } = useContext(TokenContext);
  const { studentServices, groupSubjectServices } = useService();
  const [id, setId] = useState();
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [semesterFilter, setSemesterFilter] = useState();

  const groupSubjectQuery = useQuery(
    [QueryKeys.getGroupSubjectsForStudentPage],
    () =>
      groupSubjectServices.getGroupSubjectForSubjectsForStudentPage(
        personId ? personId : localStorage.getItem("studentId"),
        token
      )
  );

  useEffect(() => {
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

  // const studentQuery = useQuery([QueryKeys.getStudentByIdKey], () =>
  //   studentServices.getStudentByIdForStudentPage(personId, token)
  // );
  const renderTooltip = (target) => {
    tippy(target, {
      content: "Additional information",
      placement: "right",
    });
  };

  useEffect(() => {
    const targets = document.querySelectorAll(".info-icon");
    targets.forEach((target) => renderTooltip(target));
  }, []);
  const groupSubjects = groupSubjectQuery.data?.data;
  useEffect(() => {
    setId(personId ? personId : localStorage.getItem("studentId"));
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
  if (!groupSubjectQuery.data?.data.length > 0) {
    return (
      <Box
        sx={{ width: "80%" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Alert sx={{ width: "50%" }} variant="filled" severity="error">
          NO SUBJECTS
        </Alert>
      </Box>
    );
  }
  return (
    <div className="main-part">
      <div className="container">
        <TitleComponent child1={"Subjects"} child2={"Student / Subjects"} />
        <section className="content">
          <section className="subjects">
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
                            <InfoIcon className="info-icon" />
                            {groupSubject.subject.name}
                          </h1>
                          <h1 className="right">{groupSubject.year}</h1>
                        </div>
                        <div className="box-top-middle">
                          <section className="group">
                            <h1>Group : {groupSubject.groupName}</h1>
                          </section>
                          <section className="Credits">
                            <h1>Credits : {groupSubject.credits}</h1>
                          </section>
                        </div>
                      </div>
                      <div
                        className="box-bottom"
                        onClick={() =>
                          navigate(`${groupSubject.id}?token=${token}`, {
                            state: groupSubjectQuery.data?.data.find(
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
                  fontSize: 100,
                }}
              >
                <img src={NoResultAnimation}></img>
              </div>
            )}
          </section>
          <section className="subjects-filter">
            <div className="subjects-filter-content">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Year"
                  value={yearFilter}
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
                  label="Semester"
                  value={semesterFilter}
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
export default StudentSubjects;
