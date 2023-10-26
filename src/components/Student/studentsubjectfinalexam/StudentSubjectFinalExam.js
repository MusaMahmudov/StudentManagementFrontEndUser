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
const StudentSubjectFinalExam = () => {
  const { subjectInfo } = useContext(StudentSubjectContext);
  const { studentId, studentFullName } = useContext(TokenContext);
  const [Grade, setGrade] = useState("");
  console.log(studentFullName);
  const { Id: examId } = useParams();
  const [exam, setExam] = useState();
  useEffect(() => {
    setExam(() => subjectInfo.exams.find((exam) => exam.id === examId));
  }, []);
  let scoreBeforeExam = 0;
  if (subjectInfo) {
    let allExams = subjectInfo.exams?.filter((exam) => exam.id !== examId);
    allExams.map((exam) => {
      if (exam.examResults.length > 0) {
        scoreBeforeExam += exam.examResults.find(
          (examResult) => examResult.studentId === studentId
        )["score"];
      }
    });
  }
  let examScore = exam?.examResults.find(
    (examResult) => examResult.studentId === studentId
  ).score;
  const finalScore = examScore + scoreBeforeExam;
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
  }, [finalScore]);

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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: "1px solid white",
    },
  }));

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
              {studentFullName}
            </StyledTableCell>
            <StyledTableCell align="left">{scoreBeforeExam}</StyledTableCell>
            <StyledTableCell align="left">{examScore}</StyledTableCell>
            <StyledTableCell align="left">{exam?.maxScore}</StyledTableCell>
            <StyledTableCell component="th" scope="row">
              {finalScore}
            </StyledTableCell>
            <StyledTableCell align="left">{Grade}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentSubjectFinalExam;
