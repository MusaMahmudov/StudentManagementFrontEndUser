import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useService } from "../../../hooks";
import { useQueries, useQuery } from "react-query";
import { queryAllByAltText } from "@testing-library/react";
import { QueryKeys } from "../../../API/QueryKeys";
import { TokenContext } from "../../../contexts/TokenContext";
import {
  AbsentSign,
  NoInfoSign,
  PresentSign,
} from "../../../UI/common/AttendanceInfo";
import { Alert, Box, LinearProgress } from "@mui/material";

export default function StudentAttendance() {
  const { Id: subjectId } = useParams();
  const { token, personId, personFullName } = useContext(TokenContext);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { attendanceServices } = useService();
  const attendanceQuery = useQuery([QueryKeys.getStudentByIdKey], () =>
    attendanceServices.getAttendanceForStudentAttendacePage(
      personId,
      subjectId,
      token
    )
  );

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage - attendanceQuery.data?.data.length
        )
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  console.log(attendanceQuery.data?.data);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (attendanceQuery.data?.data.length === 0) {
    return (
      <Alert variant="filled" severity="error">
        There is no information yet
      </Alert>
    );
  }
  // if (attendanceQuery.isLoading) {
  //   return <h1>... is Loading</h1>;
  // }

  if (attendanceQuery.isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Root sx={{ maxWidth: "100%", width: 800 }}>
      <table aria-label="custom pagination table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Lesson type</th>
            <th>is Present</th>
          </tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? [...attendanceQuery.data?.data].slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : [...attendanceQuery.data?.data]
          ).map((attendance) => (
            <tr key={attendance.subjectHour.id}>
              <td style={{ width: 300 }} align="right">
                {attendance.subjectHour.date.substring(0, 10)}
              </td>
              <td style={{ width: 300 }} align="right">
                {attendance.subjectHour.startTime}
              </td>
              <td style={{ width: 300 }} align="right">
                {attendance.subjectHour.endTime}
              </td>
              <td style={{ width: 300 }} align="right">
                {attendance.subjectHour.lessonTypeName}
              </td>
              <td style={{ width: 200 }} align="right">
                {attendance.isPresent ? (
                  <PresentSign />
                ) : attendance.isPresent === false ? (
                  <AbsentSign />
                ) : (
                  <NoInfoSign />
                )}
              </td>
            </tr>
          ))}
          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={4}
              count={attendanceQuery.data?.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
}

// function createData(name, calories, fat) {
//   return { name, calories, fat };
// }

// const rows = [
//   createData("Cupcake", 305, 3.7),
//   createData("Donut", 452, 25.0),
//   createData("Eclair", 262, 16.0),
//   createData("Frozen yoghurt", 159, 6.0),
//   createData("Gingerbread", 356, 16.0),
//   createData("Honeycomb", 408, 3.2),
//   createData("Ice cream sandwich", 237, 9.0),
//   createData("Jelly Bean", 375, 0.0),
//   createData("KitKat", 518, 26.0),
//   createData("Lollipop", 392, 0.2),
//   createData("Marshmallow", 318, 0),
//   createData("Nougat", 360, 19.0),
//   createData("Oreo", 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Root = styled("div")(
  ({ theme }) => `
  table {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[200]};
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  }
  `
);

const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;
