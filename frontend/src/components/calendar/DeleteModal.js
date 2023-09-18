import { subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

const DeleteModal = ({ setIsOpen, event, deleteClick, triggerRefresh }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log(errorMessage);
  }, [errorMessage]);

  const setError = (err) => {
    setErrorMessage(err);

    setTimeout(() => {
      setErrorMessage("");
      setIsOpen();
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
        setIsOpen();
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <div className="centered">
      <div className="delete-modal">
        <div className="background-modal">
          <h5 className="modal-head">Deleting a Recurring Event</h5>
        </div>
        <div className="buttons-center">
          <button
            className="event-container-button"
            onClick={() => setIsOpen()}
          >
            Cancel
          </button>
          <button className="delete-container-button" onClick={deleteClick}>
            Delete This Event Only
          </button>
          <button className="delete-container-button" onClick={deleteFuture}>
            Delete All Future Events
          </button>
        </div>
        {errorMessage && (
          <div className="buttons-center delete-event-error">
            Failed to delete event <br/> {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteModal;
