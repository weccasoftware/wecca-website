import { subDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../config";

const ActionModal = ({
  setIsOpen,
  clickCurrent,
  clickFuture,
  action,
  error,
  className,
  notes
}) => {
  return (
    <div className="centered">
      <div className="delete-modal">
        <div className="background-modal">
          <h5 className="modal-head">{action} a Recurring Event</h5>
        </div>
        <div className="buttons-center">
          <button
            className="event-container-button"
            onClick={() => setIsOpen()}
          >
            Cancel
          </button>
          <button className={className} onClick={clickCurrent}>
            {action} This Event Only
          </button>
          <button className={className} onClick={clickFuture}>
            {action} All Future Events
          </button>
        </div>
        <div className="pad-top buttons-center">
          <i>{notes}</i>
        </div>
        {error && (
          <div className="buttons-center delete-event-error">
            Failed to {action} event <br /> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionModal;
