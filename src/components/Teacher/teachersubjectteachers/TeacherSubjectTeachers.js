import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router-dom";
import { Alert } from "@mui/material";

export const TeacherSubjectTeachers = () => {
  const { state } = useLocation();

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
  if (!state) {
    return (
      <Alert variant="filled" severity="error">
        There is no information yet!
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Teacher Full Name</StyledTableCell>
            <StyledTableCell align="left">Teacher Role</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.map((TeacherRole) => (
            <StyledTableRow key={TeacherRole.id}>
              <StyledTableCell component="th" scope="row">
                {TeacherRole.teacherName}
              </StyledTableCell>
              <StyledTableCell align="left">
                {TeacherRole.teacherRole}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
