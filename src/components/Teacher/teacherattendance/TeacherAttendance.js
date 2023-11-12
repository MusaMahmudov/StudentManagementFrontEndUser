import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useService } from "../../../hooks";
import { useMutation, useQueries, useQuery } from "react-query";
import { QueryKeys } from "../../../API/QueryKeys";
import { TokenContext } from "../../../contexts/TokenContext";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import SimpleDialog from "../../../UI/common/SimpleDialog";
import { Alert, Box, LinearProgress, Snackbar } from "@mui/material";
export default function TeacherAttendance() {
  const { Id: groupSubjectId } = useParams();
  const { token, personId, personFullName } = useContext(TokenContext);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [openError, setOpenError] = useState(false);
  const [attendanceId, setAttendanceId] = useState(null);
  const [attendanceValue, setAttendanceValue] = useState({ isPresent: null });
  const { studentServices, subjectHourServices, attendanceServices } =
    useService();
  const studentQuery = useQuery([QueryKeys.getAttendancesForTeacherPage], () =>
    studentServices.getStudentsForTeacherAttendancePage(groupSubjectId, token)
  );
  const subjectHourQuery = useQuery([QueryKeys.getSubjectHoursByIdKey], () =>
    subjectHourServices.getSubjectHoursForAttendanceForTeacherPage(
      groupSubjectId,
      token
    )
  );
  const handleErrorOpen = () => {
    setOpenError(true);
  };
  const handleErrorClose = () => {
    setOpenError(false);
  };

  const mutate = useMutation(
    () =>
      attendanceServices.updateAttendanceForTeacherPage(
        attendanceId,
        attendanceValue,
        token
      ),
    {
      onError: () => handleErrorOpen(),
      onSuccess: () => subjectHourQuery.refetch(),
    }
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [columnsPerPage, setColumnsPerPage] = useState(100);

  const dates = [
    ...new Set(
      subjectHourQuery.data?.data.map(
        (hour) => `${hour.date.substring(0, 10)} - ${hour.startTime}`
      )
    ),
  ];
  const rows = studentQuery.data?.data.map((student) => {
    const row = {
      id: student.id,
      fullName: student.fullName,
    };

    dates.forEach((date) => {
      const subjectHour = subjectHourQuery.data?.data.find((hour) =>
        hour?.attendances?.find(
          (attendance) =>
            attendance.date.substring(0, 10) === date.substring(0, 10) &&
            attendance.student.id === student.id
        )
      );
      const attendance = subjectHour
        ? subjectHour.attendances.find(
            (attendance) =>
              attendance.student.id === student.id &&
              attendance.date.substring(0, 10) ===
                subjectHour.date.substring(0, 10)
          )
        : null;

      switch (attendance?.isPresent) {
        case true:
          row[date] = "Present";
          return;
        case false:
          row[date] = "Absent";
          return;
        case null:
          row[date] = "No Info";
          return;
      }
    });

    return row;
  });
  useEffect(() => {
    if (dates) {
      setColumnsPerPage(dates.length);
    }
  }, [dates]);
  const indexOfLastColumn = currentPage * columnsPerPage;
  const indexOfFirstColumn = indexOfLastColumn - columnsPerPage;
  const currentDates = dates.slice(indexOfFirstColumn, indexOfLastColumn);

  const renderCell = (params) => {
    const value = params.value;
    let background;
    let color;
    let borderRadius;
    let display;
    let justifyContent;
    let alignItems;
    let width;
    let height;
    let margin;
    if (params.field !== "fullName") {
      borderRadius = 5;
      color = "white";
      display = "flex";
      justifyContent = "center";
      alignItems = "center";
      width = 80;
      height = 40;
      margin = "0 30px";

      background =
        value === "Present"
          ? "#48a9e3"
          : value === "Absent"
          ? "red"
          : value === "No Info"
          ? "gray"
          : "";
    }

    return (
      <div
        onClick={() => handleClickOpen()}
        style={{
          borderRadius: borderRadius,
          color: color,
          cursor: "pointer",
          background: background,
          display: display,
          justifyContent: justifyContent,
          alignItems: alignItems,
          margin: margin,
          height: height,
          width: width,
        }}
      >
        {params.value}
      </div>
    );
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (params, value) => {
    setOpen(false);

    const date = params.colDef.field.substring(0, 10);
    const subjectHour = subjectHourQuery.data?.data.find(
      (subjectHour) => subjectHour.date.substring(0, 10) == date
    );
    const attendanceId = subjectHour.attendances.find(
      (attendance) => attendance.student.id === params.id
    )?.id;
    setAttendanceId(attendanceId);
    setAttendanceValue({
      isPresent: value === "Present" ? true : value === "Absent" ? false : null,
    });
  };

  useEffect(() => {
    if (attendanceValue && attendanceId) {
      mutate.mutate();
    }
  }, [attendanceValue, attendanceId]);

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
      headerClassName: "MuiDataGrid-colCell",
    },
    ...currentDates.map((date) => ({
      field: date,
      headerName: date.substring(0, 18),
      prop: "attendance",
      width: 200,
      editable: true,
      renderCell,
      renderEditCell: (params) => (
        <SimpleDialog
          selectedValue={attendanceValue}
          open={open}
          onClose={(value) => handleClose(params, value)}
        />
      ),
    })),
  ];
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (studentQuery.isLoading || subjectHourQuery.isLoading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }
  if (subjectHourQuery.data?.data.length === 0) {
    return (
      <Alert variant="filled" severity="error">
        There is no information yet
      </Alert>
    );
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns.map((column) => ({
          ...column,
          renderCell: (params) => renderCell(params),
        }))}
        pageSize={columnsPerPage}
        rowCount={rows.length}
      />
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          You can't do that
        </Alert>
      </Snackbar>
    </div>
  );
}
