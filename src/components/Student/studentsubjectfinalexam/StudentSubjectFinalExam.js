import { useContext, useEffect, useState } from "react";
import { StudentSubjectContext } from "../../../contexts/StudentSubjectContext";
import "./studentsubjectfinalexam.scss";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation, useParams } from "react-router-dom";
import { TokenContext } from "../../../contexts/TokenContext";
import { useService } from "../../../hooks";
import { useQuery } from "react-query";
import { QueryKeys } from "../../../API/QueryKeys";
import { Alert } from "@mui/material";
const StudentSubjectFinalExam = () => {
  const { personId, personFullName, token } = useContext(TokenContext);
  const [Grade, setGrade] = useState("");
  const { Id: finalExamId } = useParams();
  const { examResultServices } = useService();
  const { state: groupSubjectId } = useLocation();
  const [finalScoreExam, setFinalScoreExam] = useState();
  const [scoreBeforeExam, setScoreBeforeExam] = useState();

  const examResultQuery = useQuery([QueryKeys.getExamQueryKeys], () =>
    examResultServices.getExamResultForExamForStudentPage(
      finalExamId,
      personId ? personId : localStorage.getItem("studentId"),
      token
    )
  );
  const otherExamResultQuery = useQuery(
    [QueryKeys.getExamResultForExamForStudentPage],
    () =>
      examResultServices.getExamResultsForFinalExamForStudentPage(
        groupSubjectId,
        personId ? personId : localStorage.getItem("studentId"),
        token
      )
  );
  let finalScore;
  let scoreBefore;
  console.log(otherExamResultQuery.data?.data, "others");
  useEffect(() => {
    scoreBefore = otherExamResultQuery.data?.data.reduce(function (
      currentSum,
      currentNumber
    ) {
      return currentNumber.score + currentSum;
    },
    0);
    finalScore = scoreBefore + examResultQuery.data?.data.score;
    setFinalScoreExam(finalScore);
    setScoreBeforeExam(scoreBefore);
  }, [otherExamResultQuery, examResultQuery]);
  useEffect(() => {
    switch (true) {
      case finalScore >= 91 && finalScore <= 100:
        setGrade("A");
        break;
      case finalScore >= 81 && finalScore < 91:
        setGrade("B");
        break;

      case finalScore >= 71 && finalScore < 81:
        setGrade("C");
        break;

      case finalScore >= 61 && finalScore < 71:
        setGrade("D");
        break;

      case finalScore >= 51 && finalScore < 61:
        setGrade("E");
        break;

      case finalScore < 51 && finalScore > 0:
        setGrade("F");
        break;
    }
  }, [finalScoreExam]);

  // else {
  //   let allExams = subjectInfo.exams?.filter(
  //     (exam) => exam.examType !== "Final"
  //   );
  //   console.log(allExams);
  //   allExams.map((exam) => {
  //     if (exam.examResults.length > 0) {
  //       scoreBeforeExam += exam.examResults.find(
  //         (examResult) => examResult.studentId === studentId
  //       )["score"];
  //     }
  //   });
  // }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "purple",
      color: theme.palette.common.white,
      border: "1px solid white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
      backgroundColor: "#c7ccea",
    },
    "&:last-child td, &:last-child th": {
      border: "1px solid white",
    },
  }));
  if (!examResultQuery.data) {
    return (
      <Alert variant="filled" severity="error">
        This is no information yet!
      </Alert>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Full Name</StyledTableCell>
            <StyledTableCell align="left">Score Before Exam</StyledTableCell>
            <StyledTableCell align="left">Score</StyledTableCell>
            <StyledTableCell align="left">Max Score</StyledTableCell>
            <StyledTableCell align="left">Final Score</StyledTableCell>
            <StyledTableCell align="left">Grade</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              {personFullName}
            </StyledTableCell>
            {/* <StyledTableCell align="left">{scoreBeforeExam}</StyledTableCell> */}
            <StyledTableCell align="left">{scoreBeforeExam}</StyledTableCell>

            <StyledTableCell align="left">
              {examResultQuery === null
                ? "Exam not verified"
                : examResultQuery.data?.data.score}
            </StyledTableCell>
            <StyledTableCell align="left">
              {examResultQuery.data?.data.exam.maxScore}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {finalScoreExam !== undefined
                ? finalScoreExam
                : "Final Exam not verified"}
            </StyledTableCell>
            <StyledTableCell align="left">
              {Grade ? Grade : "Final Exam not verified"}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentSubjectFinalExam;
