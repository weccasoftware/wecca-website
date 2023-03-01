import './Calendar.css'
import React, { useEffect, useState } from "react";
import {addMonths, format, subMonths, startOfMonth, startOfWeek, endOfMonth, endOfWeek, isSameMonth, isSameDay, addDays, parse, isSameWeek, subDays, addHours} from "date-fns";
import EventContainer from './EventContainer';

const CalendarComponent = () => {
    const [state, setState] = useState({
        currentMonth: new Date(),
        selectedDate: new Date()
    })

    useEffect(() => {
        console.log(state)
    }, [state])

    const sampleEvents = [
        {
            startTime: new Date(),
            endTime: addHours(new Date(), 1),
            team: 'Software',
            title: "Test Event for Website Calendar",
            comment: 'This is a test event in order to see if the calendar works and looks good',
            allDay: false
        },
        {
            startTime: new Date(),
            endTime: addHours(new Date(), 1),
            team: 'Materials',
            title: "Test Event for Website Calendar #2",
            comment: 'This is another test event in order to see if the calendar works and looks good',
            allDay: false
        }
    ]

    const renderHeader = () => {
        const dateFormat = 'MMMM yyyy';

        return (
            <div className='calendar-header'>
                <div onClick={() => decrementMonth()} className='cal-nav'>Prev</div>
                <div className='cal-head'>
                    <span>
                        {format(state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div onClick={() => incrementMonth()} className='cal-nav'>Next</div>
            </div>
        )
    }

    const renderCells = () => {
        const monthStart = startOfMonth(state.currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        let days = [];
        let day = startDate;
        let formattedDate = "";
        let rowCount = 0;
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <li className={`calendar-date ${
                        !isSameMonth(day, monthStart)
                            ? "cal-disabled"
                            : isSameDay(day, state.selectedDate) ? "cal-selected" : ""
                        }`}
                        key={day}
                        onClick={() => dayClick(cloneDay, !isSameMonth(cloneDay, monthStart))}
                    >
                        <span className="date-number">{formattedDate}</span>
                    </li>
                );
                day = addDays(day, 1);
            }
            days.push(
                <li className={`day-expand ${isSameWeek(subDays(day, 1), state.selectedDate) ? '' : 'hidden'}`} key={++rowCount}>
                    <div>
                        <div className='expand-title'>{format(state.selectedDate, "MMMM d, yyyy")}</div>
                        {sampleEvents.map((event) => {return (<EventContainer event={event} key={event.title}/>)})}
                    </div>
                </li>
            )
        }

        return (
            <ul className='calendar-list'>
                <li className='calendar-day'>MON</li>
                <li className='calendar-day'>TUE</li>
                <li className='calendar-day'>WED</li>
                <li className='calendar-day'>THU</li>
                <li className='calendar-day'>FRI</li>
                <li className='calendar-day'>SAT</li>
                <li className='calendar-day'>SUN</li>
                {days}
            </ul>
        )
    }

    const incrementMonth = () => {
        setState({
            ...state,
            currentMonth: addMonths(state.currentMonth, 1)
        })
    }

    const decrementMonth = () => {
        setState({
            ...state,
            currentMonth: subMonths(state.currentMonth, 1)
        })
    }

    const dayClick = (day, disabled) => {
        if(disabled) return;
        if(isSameDay(day, state.selectedDate)){
            setState({
                ...state,
                selectedDate: subDays(day, 10000) //kind of a hack but it works
            });
        }
        else {
            setState({
                ...state,
                selectedDate: day
            });
        }
    };

    return (
        <div className="calendar-outline">
            {renderHeader()}
            {renderCells()}
        </div>
    )
}

export default CalendarComponent;