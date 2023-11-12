import { useContext, useEffect, useState } from "react";
import { TitleComponent } from "../../../UI/common/TitleComponent";
import { TokenContext } from "../../../contexts/TokenContext";
import { useQuery } from "react-query";
import { QueryKeys } from "../../../API/QueryKeys";
import { useService } from "../../../hooks";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import tippy from "tippy.js";
import "tippy.js/animations/scale.css";
import "tippy.js/themes/translucent.css";
import "tippy.js/dist/tippy.css";
import { CircularProgress } from "@mui/material";
import { queries } from "@testing-library/react";
const TeacherExamsSchedule = () => {
  const { subjectHourServices, examServices } = useService();
  const { personId, token } = useContext(TokenContext);
  let events = [];

  const examsQuery = useQuery([QueryKeys.getExamQueryKeys], () =>
    examServices.getExamsForExamsScheduleForTeacherPage(
      personId ? personId : localStorage.getItem("teacherId"),
      token
    )
  );

  if (examsQuery.isLoading) {
    return (
      <div className="loading">
        <CircularProgress size={400} />
      </div>
    );
  }
  console.log(examsQuery.data?.data, "exams");
  if (examsQuery.isSuccess) {
    examsQuery.data?.data.forEach((exam) => {
      //   let startDate = new Date(subjectHour.date);
      //   let endDate = new Date(subjectHour.date);
      let date = new Date(exam.date);
      console.log(exam.date.slice(0, 10));

      //   let [startHours, startMinutes] = subjectHour.startTime.split(":");
      //   startDate.setHours(startHours, startMinutes);

      //   let [endHours, endMinutes] = subjectHour.endTime.split(":");
      //   endDate.setHours(endHours, endMinutes);

      let event = {
        title: `${exam.examTypeName} - ${exam.groupSubject.subjectName}`,
        subject: exam.groupSubject.subjectName,
        date: date,
        extendedProps: {
          date: exam.date.slice(0, 10),

          name: exam.name,
          maxScore: exam.maxScore,
        },
      };
      events.push(event);
    });
  }

  return (
    <div className="main-part">
      <div className="container">
        <TitleComponent child1={"Schedule "} />
        <section className="schedule">
          <FullCalendar
            slotDuration={"00:20:00"}
            slotLabelInterval={"00:30"}
            slotMinTime={"08:30:00"}
            slotMaxTime={"22:25:00"}
            eventColor="3788d8"
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
            initialView={"dayGridMonth"}
            height={"70vh"}
            eventDidMount={(info) => {
              console.log(info.event, "info");
              const tooltip = document.createElement("div");
              tooltip.classList.add("tooltip");
              const title = document.createElement("div");
              title.innerHTML = info.event.title;
              const additionalInfo = document.createElement("div");
              additionalInfo.classList.add("add-info");
              additionalInfo.innerHTML = `<p>Max score : ${info.event.extendedProps.maxScore}<p/>`;
              additionalInfo.innerHTML += `<p>Date : ${info.event.extendedProps.date}<p/>`;

              tooltip.appendChild(title);
              tooltip.appendChild(additionalInfo);

              tippy(info.el, {
                content: tooltip,
                allowHTML: true,
                interactive: true,
                placement: "top",
                theme: "light",
                duration: 300,
                zIndex: 999999,

                animation: "scale",
                arrow: true,
              });
            }}
            eventContent={(arg) => (
              <div
                style={{
                  backgroundColor: "#3788d8",
                  color: "white",
                  padding: "5px",
                  borderRadius: "5px",
                  width: "100%",
                }}
              >
                <p>{arg.event.title}</p>
              </div>
            )}
            events={events}
          />
        </section>
      </div>
    </div>
  );
};
export default TeacherExamsSchedule;
