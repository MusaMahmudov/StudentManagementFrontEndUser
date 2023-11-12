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
import { TeacherSubjectContext } from "../../../contexts/TeacherSubjectContext";
import { Box, LinearProgress, TextField } from "@mui/material";
import { useService } from "../../../hooks";
import { Query, useMutation, useQueries, useQuery } from "react-query";
import { QueryKeys } from "../../../API/QueryKeys";
const TeacherSubjectProjectExam = () => {
  const { subjectInfo } = useContext(TeacherSubjectContext);
  const { token, personFullName } = useContext(TokenContext);
  const { Id: projectExamId } = useParams();
  const [exam, setExam] = useState();
  const [error, setError] = useState();
  const { studentServices, examResultServices, examServices } = useService();
  const studentQuery = useQuery([QueryKeys.getStudentsQueryKeys], () =>
    studentServices.getStudentsForExamsForTeacherPageAssign(
      subjectInfo.id,
      token
    )
  );

  const examQuery = useQuery([QueryKeys.getExamQueryKeys], () =>
    examServices.getExamForExamsforTeacherPageAsign(projectExamId)
  );
  console.log(studentQuery.data?.data);

  const [newExamResult, setNewExamResult] = useState({
    studentId: null,
    examId: projectExamId,
    score: null,
  });
  const mutateCreate = useMutation(
    () => examResultServices.createExamResult(newExamResult, token),
    {
      onSuccess: () => {
        studentQuery.refetch();
      },
      onError: (error) =>
        error.response.data?.httpStatusCode === 400
          ? setError(error.response.data?.message)
          : console.log("Error"),
    }
  );
  const handleCreate = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      setNewExamResult((prev) => ({
        ...prev,
        studentId: e.target.id,
        score: e.target.value,
      }));
    }
  };
  useEffect(() => {
    if (mutateCreate.isSuccess) {
      setError("");
    }
  }, [mutateCreate.isSuccess]);

  useEffect(() => {
    mutateCreate.mutate();
  }, [newExamResult]);
  useEffect(() => {
    setExam(() => subjectInfo.exams.find((exam) => exam.id === projectExamId));
  }, []);

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
  if (examQuery.isLoading || studentQuery.isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <TableContainer component={Paper}>
      <h1 className="errorMessage">{error}</h1>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Student Full Name</StyledTableCell>
            <StyledTableCell align="left">Score</StyledTableCell>
            <StyledTableCell align="left">Max Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentQuery.data?.data.map((student) => (
            <StyledTableRow key={student.id}>
              <StyledTableCell component="th" scope="row">
                {student.fullName}
              </StyledTableCell>
              <TextField
                // onKeyUp={(e) =>
                //   e.target.value === "" ? handleCreate(e) : handleUpdate(e)
                // }
                onKeyUp={(e) =>
                  student.examResults?.find(
                    (examResult) => examResult.examId == projectExamId
                  )?.score === undefined
                    ? handleCreate(e)
                    : ""
                }
                id={student.id}
                variant="outlined"
                defaultValue={
                  student.examResults?.find(
                    (examResult) => examResult.examId == projectExamId
                  )?.score
                }
                value={
                  student.examResults?.find(
                    (examResult) => examResult.examId == projectExamId
                  )?.score
                }
                sx={{ width: "100%" }}
              />
              {/* <StyledTableCell align="left">{examScore}</StyledTableCell> */}
              <StyledTableCell align="left">
                {examQuery.data?.data.maxScore}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeacherSubjectProjectExam;
