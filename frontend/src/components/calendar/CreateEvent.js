import React, { useEffect, useState } from "react";
import "./styles/CreateEvent.css";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { addHours, format } from "date-fns";
import { MoonLoader } from "react-spinners";

const subTeams = [
  "Software",
  "Design and Analysis",
  "Technical Communications",
  "Materials",
  "Mould",
  "Training",
  "Graphic Design",
  "General",
  "Executive",
  "Captain",
];

const CreateEvent = ({
  setIsOpen,
  triggerRefresh,
  date,
  addEvent,
  existingData = null,
}) => {
  const [state, setState] = useState({
    team: "General",
    title: "",
    startTime: date,
    endTime: addHours(date, 1),
    description: "",
    titleError: false,
    submitError: "",
    isLoading: false,
  });

  useEffect(() => {
    if (existingData) {
      setState((s) => ({
        ...s,
        team: existingData.team,
        title: existingData.title,
        startTime: existingData.startTime,
        endTime: existingData.endTime,
        description: existingData.description || "",
      }));
    }
  }, []);

  const setTeam = (team) => {
    setState({
      ...state,
      team: team.target.value,
    });
  };

  const setTitle = (title) => {
    setState({
      ...state,
      title: title.target.value,
      titleError: false,
    });
  };

  const setStartTime = (time) => {
    setState({
      ...state,
      startTime: time,
    });
  };

  const setEndTime = (time) => {
    setState({
      ...state,
      endTime: time,
    });
  };

  const setDescription = (desc) => {
    setState({
      ...state,
      description: desc.target.value,
    });
  };

  const setError = (err) => {
    setState((s) => ({
      ...s,
      titleError: err,
    }));
  };

  const setIsLoading = (val) => {
    setState((s) => ({
      ...s,
      isLoading: val,
    }));
  };

  const setSubmitError = (err) => {
    setState((s) => ({
      ...s,
      submitError: err,
    }));

    setTimeout(() => {
      setState((s) => ({
        ...s,
        submitError: "",
      }));
    }, 3000);
  };

  const submitCreate = () => {
    if (state.title.length === 0) {
      setError(true);
      return;
    }

    setIsLoading(true);
    fetch("http://localhost:3001/api/calendar/event", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        team: state.team,
        creator: "Test for edit",
        title: state.title,
        description: state.description,
        startTime: state.startTime,
        endTime: state.endTime,
        month: state.startTime.getMonth(),
      }),
    })
      .then((a) => {
        if (a.status !== 200) {
          throw new Error(a.statusText);
        }

        return a.json();
      })
      .then((result) => {
        setIsOpen(false);
        triggerRefresh();
        setIsLoading(false);
      })
      .catch((err) => {
        setSubmitError(err.message);
        setIsLoading(false);
      });
  };

  const submitEdit = () => {
    if (state.title.length === 0) {
      setError(true);
      return;
    }

    setIsLoading(true);
    fetch("http://localhost:3001/api/calendar/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        deleted: {
          team: existingData.team,
          creator: existingData.creator,
          title: existingData.title,
          startTime: existingData.startTime,
          endTime: existingData.endTime,
        },
        added: {
          team: state.team,
          creator: "Test for edit",
          title: state.title,
          description: state.description,
          startTime: state.startTime,
          endTime: state.endTime,
          month: state.startTime.getMonth(),
        },
      }),
    })
      .then((a) => {
        if (a.status !== 200) {
          throw new Error(a.statusText);
        }

        return a.json();
      })
      .then((result) => {
        setIsOpen(false);
        triggerRefresh();
        setIsLoading(false);
      })
      .catch((err) => {
        setSubmitError(err.message);
        setIsLoading(false);
      });
  };

  if (!setIsOpen) return <></>;
  if (state.submitError) {
    return (
      <div className="centered">
        <div className="modal">
          <div className="background-modal">
            <h5 className="modal-head">
              Failed to save event due to {state.submitError}
            </h5>
          </div>
          <div>Message is {state.submitError}</div>
        </div>
      </div>
    );
  }
  if (state.isLoading) {
    return (
      <div className="centered no-click">
        <MoonLoader color="#ae83de" loading={state.isLoading} size={150} speedMultiplier={1.2}/>;
      </div>
    );
  }
  return (
    <div>
      <div className="centered">
        <div className="modal">
          <div className="background-modal">
            <h5 className="modal-head">
              Event on {format(date, "MMMM d, yyyy")}
            </h5>
          </div>
          <FormControl fullWidth>
            <InputLabel required>Team</InputLabel>
            <Select
              label="Team"
              value={state.team}
              onChange={(team) => setTeam(team)}
            >
              {subTeams.map((team) => {
                return (
                  <MenuItem value={team} key={team}>
                    {team}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br />
          <br />
          <TextField
            label="Title"
            fullWidth
            onChange={(title) => setTitle(title)}
            z
            error={state.titleError}
            required
            value={state.title}
          ></TextField>
          <br />
          <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopTimePicker
              label="Start Time"
              value={state.startTime}
              onChange={(time) => setStartTime(time)}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
            <br />
            <br />
            <DesktopTimePicker
              label="End Time"
              value={state.endTime}
              onChange={(time) => {
                setEndTime(time);
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth required />
              )}
            />
          </LocalizationProvider>
          <br />
          <br />
          <TextField
            label="Description"
            multiline
            fullWidth
            rows={4}
            value={state.description}
            onChange={(desc) => setDescription(desc)}
          ></TextField>
          <div className="buttons-container">
            <button className="modal-button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button
              className="modal-button"
              onClick={() => (existingData ? submitEdit() : submitCreate())}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
