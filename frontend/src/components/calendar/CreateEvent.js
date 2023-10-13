import React, { useEffect, useState } from "react";
import "./styles/CreateEvent.css";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import {
  addDays,
  addHours,
  addMonths,
  addWeeks,
  format,
  isSameWeek,
  subDays,
} from "date-fns";
import { BounceLoader, ClipLoader, MoonLoader } from "react-spinners";
import { BASE_URL, CAPTAIN_ROLE, NAME_KEY, TEAM_KEY } from "../../config";
import ActionModal from "./ActionModal";

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

const repeatIntervals = ["Week", "Two Weeks", "Month", "Two Months"];

const repeatIntervalsEnd = [
  "Fall Reading Week (Oct 28 - Nov 5)",
  "End of Fall Classes (Dec 8)",
  "Winter Reading Week (Feb 17 - Feb 25)",
  "End of Winter Classes (March 5)",
];

let startFallReadingWeek = new Date("October 30, 2023");
let startWinterReadingWeek = new Date("February 19, 2024");
let endOfFallClasses = new Date("December 9, 2023 00:00:01");
let startOfWinterClasses = new Date("January 8, 2024 00:00:01");
let endOfWinterClasses = new Date("April 6, 2024 00:00:01");

const repeatIntervalMapping = {
  "Fall Reading Week (Oct 28 - Nov 5)": startFallReadingWeek,
  "End of Fall Classes (Dec 8)": endOfFallClasses,
  "Winter Reading Week (Feb 17 - Feb 25)": startWinterReadingWeek,
  "End of Winter Classes (March 5)": endOfWinterClasses,
};

const CreateEvent = ({
  setIsOpen,
  triggerRefresh,
  date,
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
    isRecurring: false,
    repeatInterval: null,
    repeatUntil: null,
    validSubteams: [],
    user: null,
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

    const role = sessionStorage.getItem(TEAM_KEY);
    const user = sessionStorage.getItem(NAME_KEY);
    if (role === CAPTAIN_ROLE) {
      setValidSubteams(subTeams);
    } else {
      setValidSubteams(subTeams.filter((s) => s === role || s === "General"));
    }
    if (user) {
      setUser(user);
    }
  }, []);

  const setValidSubteams = (list) => {
    setState((s) => ({
      ...s,
      validSubteams: list,
    }));
  };

  const setUser = (user) => {
    setState((s) => ({
      ...s,
      user: user,
    }));
  };

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

  const toggleIsRecurring = () => {
    setState((s) => ({
      ...s,
      isRecurring: !state.isRecurring,
    }));
  };

  const setRepeatInterval = (val) => {
    setState((s) => ({
      ...s,
      repeatInterval: val.target.value,
    }));
  };

  const setRepeatUntil = (val) => {
    setState((s) => ({
      ...s,
      repeatUntil: val.target.value,
    }));
  };

  const getRecurringEvents = () => {
    let day = state.startTime;
    let mappedEvents = [];

    let startDate = state.startTime;
    let endDate = state.endTime;

    while (day < repeatIntervalMapping[state.repeatUntil]) {
      while (dayIsInvalid(day)) {
        day = findRolloverDay(day);
        startDate = findRolloverDay(startDate);
        endDate = findRolloverDay(endDate);
        if (day >= repeatIntervalMapping[state.repeatUntil]) break;
      }

      let event = {
        team: state.team,
        title: state.title,
        startTime: startDate,
        endTime: endDate,
        description: state.description,
        creator: state.user,
        month: startDate.getMonth(),
        recurring: true,
      };
      mappedEvents.push(event);

      day = incrementDay(day);
      startDate = incrementDay(startDate);
      endDate = incrementDay(endDate);
    }

    return mappedEvents;
  };

  const incrementDay = (day) => {
    let d = day;
    if (state.repeatInterval === repeatIntervals[0]) {
      return addWeeks(d, 1);
    } else if (state.repeatInterval === repeatIntervals[1]) {
      return addWeeks(d, 2);
    } else if (state.repeatInterval === repeatIntervals[2]) {
      return addMonths(d, 1);
    } else if (state.repeatInterval === repeatIntervals[3]) {
      return addMonths(d, 2);
    }
  };

  const findRolloverDay = (day) => {
    let d = day;
    if (
      state.repeatInterval === repeatIntervals[0] ||
      state.repeatInterval === repeatIntervals[1]
    ) {
      return addWeeks(d, 1);
    } else if (
      state.repeatInterval === repeatIntervals[2] ||
      state.repeatInterval === repeatIntervals[3]
    ) {
      return addMonths(d, 1);
    }
  };

  const dayIsInvalid = (day) => {
    if (
      isSameWeek(day, startFallReadingWeek) ||
      isSameWeek(day, startWinterReadingWeek) ||
      (day >= endOfFallClasses && day < startOfWinterClasses)
    ) {
      return true;
    }
    return false;
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

  const delegateSubmission = () => {
    if (!existingData && state.isRecurring) {
      submitRecurringEvents();
    } else if (!existingData) {
      submitCreate();
    } else if (existingData) {
      submitEdit();
    }
  };

  const submitCreate = () => {
    if (state.title.length === 0) {
      setError(true);
      return;
    }

    setIsLoading(true);
    fetch(`${BASE_URL}/api/calendar/event`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        team: state.team,
        creator: state.user,
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

  const submitRecurringEvents = () => {
    if (!state.isRecurring) return;
    if (state.title.length === 0) {
      setError(true);
      return;
    }

    const recurringEvents = getRecurringEvents();

    setIsLoading(true);
    fetch(`${BASE_URL}/api/calendar/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(recurringEvents),
    })
      .then((a) => {
        if (a.status !== 200) {
          throw new Error(a.statusText);
        }

        return a.json();
      })
      .then(() => {
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
    fetch(`${BASE_URL}/api/calendar/event`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        deleted: {
          team: existingData.team,
          title: existingData.title,
          startTime: existingData.startTime,
          endTime: existingData.endTime,
        },
        added: {
          team: state.team,
          creator: state.user,
          title: state.title,
          description: state.description,
          startTime: state.startTime,
          endTime: state.endTime,
          month: state.startTime.getMonth(),
          recurring: existingData.recurring,
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
      <div className="centered-spinner no-click">
        <ClipLoader
          color="#ae83de"
          loading={state.isLoading}
          size={150}
          speedMultiplier={1.2}
        />
        Hi
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
              {state.validSubteams.map((team) => {
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
            error={state.titleError}
            required
            value={state.title}
          ></TextField>
          <br />
          {/*<FormGroup>
            <FormControlLabel
              className="pad-left-10"
              control={
                <Checkbox checked={state.isAllDay} onChange={toggleIsAllDay} />
              }
              label={"All Day"}
            />
            </FormGroup>*/}
          {!state.isAllDay && (
            <div>
              <br />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Start Time"
                  value={state.startTime}
                  onChange={(time) => setStartTime(time)}
                  className="date-select"
                />
                <br />
                <br />
                <TimePicker
                  label="End Time"
                  value={state.endTime}
                  onChange={(time) => setEndTime(time)}
                  className="date-select"
                />
              </LocalizationProvider>
            </div>
          )}
          {existingData && <br />}
          {!existingData && (
            <FormGroup>
              <FormControlLabel
                className="pad-left-10"
                control={
                  <Checkbox
                    checked={state.isRecurring}
                    onChange={toggleIsRecurring}
                  />
                }
                label={"Recurring"}
              />
            </FormGroup>
          )}
          {state.isRecurring && (
            <div>
              <hr className="sponsor-hr" />
              <FormControl fullWidth>
                <InputLabel required>Repeat Every...</InputLabel>
                <Select
                  label="Repeat Every..."
                  value={state.repeatInterval}
                  onChange={(int) => setRepeatInterval(int)}
                >
                  {repeatIntervals.map((int) => {
                    return (
                      <MenuItem value={int} key={int}>
                        {int}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
              <br />
              <FormControl fullWidth>
                <InputLabel required>Repeat Until...</InputLabel>
                <Select
                  label="Repeat Until..."
                  value={state.repeatUntil}
                  onChange={(end) => setRepeatUntil(end)}
                >
                  {repeatIntervalsEnd.map((end) => {
                    return (
                      <MenuItem value={end} key={end}>
                        {end}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <hr className="sponsor-hr" />
            </div>
          )}
          <br />
          <TextField
            label="Description"
            multiline
            fullWidth
            rows={4}
            value={state.description}
            onChange={(desc) => setDescription(desc)}
          ></TextField>
          {state.isRecurring && (
            <div className="modal-info">
              Note that recurring events will skip reading weeks and exam weeks
            </div>
          )}
          <div className="buttons-container">
            <button className="modal-button" onClick={() => setIsOpen()}>
              Cancel
            </button>
            <button className="modal-button" onClick={delegateSubmission}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
