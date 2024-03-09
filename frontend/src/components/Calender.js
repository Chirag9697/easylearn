import React from "react";
// import {Calendar, momentLocalizer } from "react-big-calendar";
// import '../../'
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
// const localizer = momentLocalizer(moment);
const Calender = () => {
  const data = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2023, 1, 15, 10, 0),
      EndTime: new Date(2023, 1, 15, 12, 30),
    },
  ];
  return (
    <div className="mt-16">
      <div className="absolute w-full bg-yellow-400">hello</div>
    <ScheduleComponent
      selectedDate={new Date(2023, 1, 15)}
      eventSettings={{
        dataSource: data,
      }}
      >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
      </div>
  );
};

export default Calender;
