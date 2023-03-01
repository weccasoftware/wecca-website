import { format } from "date-fns";
import React from "react";
import './Calendar.css';

const EventContainer = ({event}) => {
    const start = format(event.startTime, "h:mm aaa");
    const end = format(event.endTime, "h:mm aaa");
    return (
        <div className="event-container">
            <div className="event-time">
                <div className="event-team">{event.team} Team</div>
                <div>{event.allDay ? "all-day" : `${start} - ${end}`}</div>
            </div>
            <div className="cal-divider"></div>
            <div className='event-details'>
                <div className="event-head">{event.title}</div>
                <div className="event-body">{event.comment || "No Description"}</div>
            </div>
        </div>
    )
}

export default EventContainer;