import { format } from "date-fns";
import React, { useState } from "react";
import CreateEvent from "./CreateEvent";
import "./styles/Calendar.css";
import { teamClassMap } from "./teamClassMap";
import DeleteModal from "./DeleteModal";

const EventContainer = ({ event, deleteEvent, triggerRefresh }) => {
  const [state, setState] = useState({
    modalOpen: false,
    deleteConfirmationOpen: false,
  });

  const start = format(event.startTime, "h:mm aaa");
  const end = format(event.endTime, "h:mm aaa");

  const toggleModal = () => {
    setState((s) => ({
      ...s,
      modalOpen: !state.modalOpen,
    }));
  };

  const toggleDeleteConfirmation = () => {
    setState((s) => ({
      ...s,
      deleteConfirmationOpen: !state.deleteConfirmationOpen,
    }));
  };

  const deleteClick = () => {
    deleteEvent(event.title, event.startTime, event.team);

    fetch("http://localhost:3001/api/calendar/deleteEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        team: event.team,
        creator: event.creator,
        title: event.title,
        startTime: new Date(event.startTime),
        endTime: new Date(event.endTime),
      }),
    })
      .then((a) => {
        if (a.status !== 200) {
          throw new Error(a.statusText);
        }

        return a.json();
      })
      .then((result) => {
        triggerRefresh();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="event-container">
      {state.modalOpen && (
        <div className="modal-overlay">
          <div className="overlay-opacity" onClick={() => toggleModal()} />
          <CreateEvent
            setIsOpen={() => toggleModal()}
            date={event.startTime}
            existingData={event}
            triggerRefresh={() => triggerRefresh()}
          />
        </div>
      )}
      {state.deleteConfirmationOpen && (
        <div className="modal-overlay">
          <div
            className="overlay-opacity"
            onClick={() => toggleDeleteConfirmation()}
          />
          <DeleteModal
            setIsOpen={() => toggleDeleteConfirmation()}
            event={event}
            deleteClick={deleteClick}
            triggerRefresh={triggerRefresh}
          />
        </div>
      )}
      <div className="event-time">
        <div className="event-team">{event.team}</div>
        <div>{`${start} - ${end}`}</div>
        <div className="event-creator">
          {event.creator ? `Created by ${event.creator}` : ""}
        </div>
      </div>
      <div className={`cal-divider ${teamClassMap[event.team]}`}></div>
      <div className="event-details">
        <div className="event-head">{event.title}</div>
        <div className="event-body">{event.description || ""}</div>
      </div>
      <div className="event-edit-container">
        <button className="event-container-button" onClick={toggleModal}>
          Edit
        </button>
        <button className="event-container-button" onClick={event.recurring ? toggleDeleteConfirmation : deleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventContainer;
