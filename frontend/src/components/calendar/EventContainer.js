import { format, subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import CreateEvent from "./CreateEvent";
import "./styles/Calendar.css";
import { teamClassMap } from "./teamClassMap";
import ActionModal from "./ActionModal";
import { BASE_URL, CAPTAIN_ROLE, NAME_KEY, TEAM_KEY } from "../../config";

const EventContainer = ({ event, deleteEvent, triggerRefresh }) => {
  const [state, setState] = useState({
    modalOpen: false,
    deleteConfirmationOpen: false,
    userCanEdit: false,
    deleteError: "",
  });

  useEffect(() => {
    const role = sessionStorage.getItem(TEAM_KEY);
    const name = sessionStorage.getItem(NAME_KEY);
    /*
      You can only edit an event if:
      - You are a captain
      - Your team owns the event
      - It is a general event that you created
    */
    if (
      role === CAPTAIN_ROLE ||
      event.team === role ||
      (name && role && event.team === "General" && event.creator === name)
    ) {
      setCanEdit(true);
    }
  }, []);

  const setCanEdit = (v) => {
    setState((s) => ({
      ...s,
      userCanEdit: v,
    }));
  };

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

    fetch(`${BASE_URL}/api/calendar/deleteEvent`, {
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
      })
      .catch((err) => {
        setError(err)
      });
  };

  const setError = (err) => {
    setState((s) => ({
      ...s,
      deleteError: err,
    }));

    setTimeout(() => {
      setState((s) => ({
        ...s,
        deleteError: "",
        deleteConfirmationOpen: false,
      }));
    }, 3000);
  };

  const deleteFuture = () => {
    fetch(`${BASE_URL}/api/calendar/deleteRecurringEvents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        payload: {
          team: event.team,
          creator: event.creator,
          title: event.title,
        },
        date: subDays(event.startTime, 1),
      }),
    })
      .then((a) => {
        if (a.status !== 200) {
          throw new Error(a.statusText);
        }

        return a.text();
      })
      .then(() => {
        triggerRefresh();
        toggleDeleteConfirmation();
      })
      .catch((err) => {
        setError(err.message);
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
          <ActionModal
            setIsOpen={() => toggleDeleteConfirmation()}
            event={event}
            clickCurrent={deleteClick}
            clickFuture={deleteFuture}
            action={"Delete"}
            error={state.deleteError}
            className={'delete-container-button'}
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
        {state.userCanEdit && (
          <button className="event-container-button" onClick={toggleModal}>
            Edit
          </button>
        )}
        {state.userCanEdit && (
          <button
            className="event-container-button"
            onClick={event.recurring ? toggleDeleteConfirmation : deleteClick}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default EventContainer;
