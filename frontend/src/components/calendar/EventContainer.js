import { format } from "date-fns";
import React, { useState } from "react";
import CreateEvent from "./CreateEvent";
import './styles/Calendar.css';
import { teamClassMap } from "./teamClassMap";

const EventContainer = ({event, deleteEvent}) => {
    const [state, setState] = useState({
        modalOpen: false
    })

    const start = format(event.startTime, "h:mm aaa");
    const end = format(event.endTime, "h:mm aaa");

    const toggleModal = () => {
        console.log(`Setting state to ${!state.modalOpen}`)
        setState((s) => ({
            ...s,
            modalOpen: !state.modalOpen
        }))
    }

    const deleteClick = () => {
        deleteEvent(event.title, event.startTime, event.team)
        //Need to call the API to delete an event from the DB, then trigger a reload of events on the frontend
    }

    const addEvent = () => {
        //Need to call API to add an event to the DB, then trigger a reload of events on the frontend
    }

    return (
        <div className="event-container">
            {state.modalOpen && <div className='modal-overlay'>
                <div className='overlay-opacity' onClick={() => toggleModal(false)}/>
                <CreateEvent setIsOpen={(val) => toggleModal(val)} date={event.startTime} existingData={event}/>
            </div>}
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
            <div className="event-edit-container">
                <button className="event-container-button" onClick={toggleModal}>Edit</button>
                <button className="event-container-button" onClick={deleteClick}>Delete</button>
            </div>
        </div>
    )
}

export default EventContainer;