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
import "./studentschedule.scss";
import tippy from "tippy.js";
import "tippy.js/animations/scale.css";
import "tippy.js/themes/translucent.css";
import "tippy.js/dist/tippy.css";
const StudentSchedule = () => {
  const { studentServices, subjectHourServices } = useService();
  const { studentId, token } = useContext(TokenContext);
  // const [groupSubjectsId, setGroupSubjectsId] = useState();

  const studentQuery = useQuery([QueryKeys.getStudentByIdKey], () =>
    studentServices.getStudentByIdForStudentPage(studentId, token)
  );
  let subjectHours;

  console.log(studentQuery.data?.data.mainGroup.groupSubjects);

  const events = [];
  if (studentQuery.isLoading) {
    return <h1>...Is Loading</h1>;
  }
  // if (studentQuery.isSuccess) {
  //   subjectHours = studentQuery.data?.data.mainGroup.groupSubjects
  //     .map((groupSubject) => {
  //       if (groupSubject.subjectHours.length > 0) {
  //         return groupSubject.subjectHours;
  //       }
  //       return [];
  //     })
  //     .filter((item) => item.length > 0)
  //     .reduce(
  //       (accumulator, currentValue) => [...accumulator, ...currentValue],
  //       []
  //     );
  //   console.log(subjectHours);
  // }
  if (studentQuery.isSuccess) {
    studentQuery.data?.data.mainGroup.groupSubjects.forEach((groupSubject) => {
      groupSubject.subjectHours.forEach((subjectHour) => {
        let startDate = new Date(subjectHour.date);
        let endDate = new Date(subjectHour.date);

        let [startHours, startMinutes] = subjectHour.startTime.split(":");
        startDate.setHours(startHours, startMinutes);

        let [endHours, endMinutes] = subjectHour.endTime.split(":");
        endDate.setHours(endHours, endMinutes);

        let event = {
          title: subjectHour.groupSubject.subjectName,
          start: startDate,
          end: endDate,
          extendedProps: {
            room: subjectHour.room,
            group: subjectHour.groupSubject.groupName,
            lessonType: subjectHour.lessonType.name,
          },
        };
        events.push(event);
      });
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
            initialView={"timeGridWeek"}
            height={"70vh"}
            eventDidMount={(info) => {
              const tooltip = document.createElement("div");
              tooltip.classList.add("tooltip");
              const title = document.createElement("div");
              title.innerHTML = info.event.title;
              const additionalInfo = document.createElement("div");
              additionalInfo.classList.add("add-info");
              additionalInfo.innerHTML = `<p>Room:${info.event.extendedProps.room}<p/>`;
              additionalInfo.innerHTML += `<p>${info.event.extendedProps.lessonType}<p/>`;

              tooltip.appendChild(title);
              tooltip.appendChild(additionalInfo);

              // Use tippy.js or other tooltip libraries to create the tooltip
              tippy(info.el, {
                content: tooltip,
                allowHTML: true,
                interactive: true,
                placement: "top",
                theme: "light",
                duration: 300,

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
                }}
              >
                <p>{arg.timeText}</p>
                <p>{arg.event.title}</p>
                <p>Room - {arg.event.extendedProps.room}</p>
              </div>
            )}
            events={events}
          />
        </section>
      </div>
    </div>
  );
};
export default StudentSchedule;
