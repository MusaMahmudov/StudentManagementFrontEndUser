import { useContext, useEffect, useState } from "react";
import { StudentSubjectContext } from "../../../contexts/StudentSubjectContext";
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
import { Query, useQueries, useQuery } from "react-query";
import { QueryKeys } from "../../../API/QueryKeys";
import { useService } from "../../../hooks";
const StudentSubjectMidtermExam = () => {
  const { subjectInfo } = useContext(StudentSubjectContext);
  const { personId, personFullName, token } = useContext(TokenContext);
  const { Id: midtermExamId } = useParams();
  const { examResultServices } = useService();

  const examResultQuery = useQuery([QueryKeys.getExamQueryKeys], () =>
    examResultServices.getExamResultForExamForStudentPage(
      midtermExamId,
      personId ? personId : localStorage.getItem("studentId"),
      token
    )
  );

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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Full Name</StyledTableCell>
            <StyledTableCell align="left">Score</StyledTableCell>
            <StyledTableCell align="left">Max Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              {personFullName}
            </StyledTableCell>
            <StyledTableCell align="left">
              {examResultQuery.data?.data
                ? examResultQuery.data?.data.score
                : "Exam not verified"}
            </StyledTableCell>
            <StyledTableCell align="left">
              {examResultQuery.data?.data
                ? examResultQuery.data?.data.exam.maxScore
                : "Exam not verifieed"}
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentSubjectMidtermExam;
