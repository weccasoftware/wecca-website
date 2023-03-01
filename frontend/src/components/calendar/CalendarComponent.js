import './styles/Calendar.css'
import './styles/TeamClasses.css'
import React, { useEffect, useState } from "react";
import {addMonths, format, subMonths, startOfMonth, startOfWeek, endOfMonth, endOfWeek, isSameMonth, isSameDay, addDays, parse, isSameWeek, subDays, addHours} from "date-fns";
import EventContainer from './EventContainer';
import CreateEvent from './CreateEvent';
import { teamClassMap } from './teamClassMap'
import { sampleEvents } from './testData';

/**
 * Notes for backend:
 *  We will need to return all events in the last week of the previous month, all events in the current month, and all events in the first week of the next month
 *  We can have an endpoint that returns events for the day, sorted by start time (or we can do this on the client side)
 *  We will need an API endpoint for deleting events
 */

const CalendarComponent = () => {
    const [state, setState] = useState({
        currentMonth: new Date(),
        selectedDate: new Date(),
        modalOpen: false,
        sampleEvents: []
    })

    //Just for testing
    useEffect(() => {
        setState({
            ...state,
            sampleEvents: sampleEvents.sort((a, b) => {return a.startTime - b.startTime})});
    }, [])

    useEffect(() => {
        console.log(state)
    }, [state])

    const renderHeader = () => {
        const dateFormat = 'MMMM yyyy';

        return (
            <div className='calendar-header'>
                <div onClick={() => decrementMonth()} className='cal-nav left-arrow'></div>
                <div className='cal-head'>
                    <span>
                        {format(state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div onClick={() => incrementMonth()} className='cal-nav right-arrow'></div>
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
                        <span className='icon-area'>
                            {state.sampleEvents.filter((event) => isSameDay(day, event.startTime) || isSameDay(day, event.endTime))
                                .map((event) => {return (<span className={`date-items ${teamClassMap[event.team]}`} key={`${event.team}-${event.startTime}`} title={`${event.team} Event`}></span>)})}
                        </span>
                    </li>
                );
                day = addDays(day, 1);
            }
            days.push(
                <li className={`day-expand ${isSameWeek(subDays(day, 1), state.selectedDate) ? '' : 'hidden'}`} key={++rowCount}>
                    <div>
                        <div className='expand-title'>{format(state.selectedDate, "MMMM d, yyyy")}</div>
                        {state.sampleEvents.filter((event) => isSameDay(state.selectedDate, event.startTime) || isSameDay(state.selectedDate, event.endTime)).sort((a, b) => {return a.startTime - b.startTime})
                            .map((event) => {return (<EventContainer event={event} key={`${event.title}-${event.startTime}`} deleteEvent={(ti, te, st) => deleteEvent(ti, te, st)} addEvent={(e) => addEvent(e)}/>)})}
                    </div>
                    <br/>
                    <button onClick={() => toggleModal(true)} className='add-event-button'>Add Event</button>
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

    const toggleModal = (val) => {
        setState((s) => ({
            ...s,
            modalOpen: val
        }))
    }

    const addEvent = (event) => {
        console.log("Got event")
        console.log(event)
        const events = [...state.sampleEvents, event]
        setState((s) => ({
            ...s,
            sampleEvents: events
        }))
        console.log(state.sampleEvents)
        toggleModal(false)
    }

    const deleteEvent = (title, team, start) => {
        const filteredEvents = state.sampleEvents.filter((ev) => {
            return ev.title !== title && ev.team !== team && ev.startTime !== start
        })
        setState((s) => ({
            ...s,
            sampleEvents: filteredEvents
        }))
    }

    return (
        <div className="calendar-outline">
            {state.modalOpen && <div className='modal-overlay'>
                <div className='overlay-opacity' onClick={() => toggleModal(false)}/>
                <CreateEvent setIsOpen={(val) => toggleModal(val)} date={state.selectedDate} addEvent={(ev) => addEvent(ev)}/>
            </div>}
            {renderHeader()}
            {renderCells()}
        </div>
    )
}

export default CalendarComponent;