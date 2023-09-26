import './styles/Calendar.css'
import React from "react";
import CalendarComponent from './CalendarComponent';

const Calendar = () => {
    return (
        <div>
            <h1 className='calendar-header'>Calendar</h1>
            <CalendarComponent />
        </div>
    )
}

export default Calendar;