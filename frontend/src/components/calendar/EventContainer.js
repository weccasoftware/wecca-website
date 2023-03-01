import { format } from "date-fns";
import React from "react";
import './styles/Calendar.css';
import { teamClassMap } from "./teamClassMap";

const EventContainer = ({event}) => {
    const start = format(event.startTime, "h:mm aaa");
    const end = format(event.endTime, "h:mm aaa");
    return (
        <div className="event-container">
            <div className="event-time">
                <div className="event-team">{event.team}</div>
                <div>{`${start} - ${end}`}</div>
                <div className="event-creator">{event.creator ? `Created by ${event.creator}` : ""}</div>
            </div>
            <div className={`cal-divider ${teamClassMap[event.team]}`}></div>
            <div className='event-details'>
                <div className="event-head">{event.title}</div>
                <div className="event-body">{event.description || ""}</div>
            </div>
        </div>
    )
}

export default EventContainer;