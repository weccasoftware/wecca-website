import "./styles/Calendar.css";
import React, { useEffect, useState } from "react";
import CalendarComponent from "./CalendarComponent";
import { WINDOW_SIZE_THRESHOLD_PX } from "../../config";

const Calendar = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (windowSize[0] <= WINDOW_SIZE_THRESHOLD_PX) {
    return (
      <div>
        <h2>Calendar Unavailable</h2>
        <div>Sorry, the calendar is unavailable on smaller devices</div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="calendar-header">Calendar</h1>
      <CalendarComponent />
    </div>
  );
};

export default Calendar;
