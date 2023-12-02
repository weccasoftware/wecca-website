import "./styles/Calendar.css";
import "./styles/TeamClasses.css";
import React, { useEffect, useState } from "react";
import {
  addMonths,
  format,
  subMonths,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isSameWeek,
  subDays,
} from "date-fns";
import EventContainer from "./EventContainer";
import CreateEvent from "./CreateEvent";
import { teamClassMap } from "./teamClassMap";
import {
  BASE_URL,
  CAPTAIN_ROLE,
  EMAIL_KEY,
  FILTER_TEAMS,
  NAME_KEY,
  TEAM_KEY,
} from "../../config";

/**
 * Notes for backend:
 *  We will need to return all events in the last week of the previous month, all events in the current month, and all events in the first week of the next month
 *  We can have an endpoint that returns events for the day, sorted by start time (or we can do this on the client side)
 *  We will need an API endpoint for deleting events
 */

const TableRow = ({ row, isDateRow }) => {
  return (
    <tr className={isDateRow ? "date-row" : "info-row"}>
      {row.map((val) => {
        return val;
      })}
    </tr>
  );
};

const CalendarComponent = () => {
  const [state, setState] = useState({
    currentMonth: new Date(),
    selectedDate: new Date(),
    modalOpen: false,
    events: [],
    appliedFilters: [],
    loadError: false,
    user: null,
  });

  useEffect(() => {
    const userName = sessionStorage.getItem(NAME_KEY);
    if (!userName) return;
    setState((s) => ({
      ...s,
      user: userName,
    }));
  }, []);

  useEffect(() => {
    loadAllEvents();
  }, [state.currentMonth]);

  const setLoadError = (val) => {
    setState((s) => ({
      ...s,
      loadError: val,
    }));
  };

  const loadAllEvents = () => {
    const viewLevel = sessionStorage.getItem(EMAIL_KEY)
      ? sessionStorage.getItem(TEAM_KEY) === CAPTAIN_ROLE
        ? 3
        : 2
      : 1;
    fetch(
      `${BASE_URL}/api/calendar/events/${viewLevel}/${state.currentMonth.getMonth()}`
    )
      .then((a) => {
        if (a.status !== 200) {
          throw new Error(a.statusText);
        }

        return a.json();
      })
      .then((result) => {
        setState((s) => ({
          ...s,
          events: result.map((e) => {
            return {
              ...e,
              startTime: new Date(e.startTime),
              endTime: new Date(e.endTime),
            };
          }),
        }));
      })
      .catch((err) => {
        setLoadError(true);
      });
  };

  const goToToday = () => {
    setState((s) => ({
      ...s,
      currentMonth: new Date(),
      selectedDate: new Date(),
    }));
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="calendar-header">
        <div
          onClick={() => decrementMonth()}
          className="cal-nav left-arrow"
        ></div>
        <div className="cal-head">
          <span>{format(state.currentMonth, dateFormat)}</span>
        </div>
        <div
          onClick={() => incrementMonth()}
          className="cal-nav right-arrow"
        ></div>
      </div>
    );
  };

  const renderTable = () => {
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
      let week = [];
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        week.push(
          <td
            className={`${
              !isSameMonth(day, monthStart)
                ? "cal-disabled"
                : isSameDay(day, state.selectedDate)
                ? "cal-selected"
                : isSameDay(day, new Date())
                ? "cal-today"
                : ""
            }`}
            key={day}
            onClick={() =>
              dayClick(cloneDay, !isSameMonth(cloneDay, monthStart))
            }
          >
            <span className={`date-number`}>{formattedDate}</span>
            <span className="icon-area">
              {state.events
                .filter(
                  (event) =>
                    (isSameDay(day, event.startTime) ||
                      isSameDay(day, event.endTime)) &&
                    !state.appliedFilters.includes(event.team)
                )
                .map((event) => {
                  return (
                    <span
                      className={`date-items ${teamClassMap[event.team]}`}
                      key={`${event.team}-${event.startTime}`}
                      title={`${event.team} Event`}
                    ></span>
                  );
                })}
            </span>
          </td>
        );
        day = addDays(day, 1);
      }
      days.push(week);
      days.push([
        <td
          colSpan={7}
          className={`${
            isSameWeek(subDays(day, 1), state.selectedDate) ? "" : "hidden"
          }`}
          key={++rowCount}
        >
          <div>
            <div className="expand-title">
              {format(state.selectedDate, "MMMM d, yyyy")}
            </div>
            {state.events
              .filter(
                (event) =>
                  (isSameDay(state.selectedDate, event.startTime) ||
                    isSameDay(state.selectedDate, event.endTime)) &&
                  !state.appliedFilters.includes(event.team)
              )
              .sort((a, b) => {
                return a.startTime - b.startTime;
              })
              .map((event) => {
                return (
                  <EventContainer
                    event={event}
                    key={`${event.title}-${event.startTime}`}
                    deleteEvent={(ti, te, st) => deleteEvent(ti, te, st)}
                    triggerRefresh={() => loadAllEvents()}
                  />
                );
              })}
            {state.events.filter(
              (event) =>
                (isSameDay(state.selectedDate, event.startTime) ||
                  isSameDay(state.selectedDate, event.endTime)) &&
                !state.appliedFilters.includes(event.team)
            ).length === 0 && (
              <div>
                <i>No events today</i>
              </div>
            )}
          </div>
          {state.user && (
            <div>
              <br />
              <button
                onClick={() => toggleModal(true)}
                className="add-event-button"
              >
                Add Event
              </button>
            </div>
          )}
        </td>,
      ]);
    }

    return (
      <table className="cal-table">
        <thead>
          <tr>
            <th>SUN</th>
            <th>MON</th>
            <th>TUE</th>
            <th>WED</th>
            <th>THU</th>
            <th>FRI</th>
            <th>SAT</th>
          </tr>
        </thead>
        <tbody>
          {days.map((row, rowId) => (
            <TableRow row={row} isDateRow={row.length > 1} key={rowId} />
          ))}
        </tbody>
      </table>
    );
  };

  const incrementMonth = () => {
    setState({
      ...state,
      currentMonth: addMonths(state.currentMonth, 1),
    });
  };

  const decrementMonth = () => {
    setState({
      ...state,
      currentMonth: subMonths(state.currentMonth, 1),
    });
  };

  const dayClick = (day, disabled) => {
    if (disabled) return;
    if (isSameDay(day, state.selectedDate)) {
      setState({
        ...state,
        selectedDate: subDays(day, 10000), //kind of a hack but it works
      });
    } else {
      setState({
        ...state,
        selectedDate: day,
      });
    }
  };

  const toggleModal = (val) => {
    setState((s) => ({
      ...s,
      modalOpen: val,
    }));
  };

  const toggleFilterEvent = (ev) => {
    const currentFilters = state.appliedFilters;
    if (currentFilters.includes(ev)) {
      currentFilters.splice(currentFilters.indexOf(ev), 1);
    } else {
      currentFilters.push(ev);
    }

    setState((s) => ({
      ...s,
      appliedFilters: currentFilters,
    }));
  };

  const toggleAllFiltersOff = () => {
    setState((s) => ({
      ...s,
      appliedFilters: [],
    }));
  };

  const toggleAllFiltersOn = () => {
    setState((s) => ({
      ...s,
      appliedFilters: [...FILTER_TEAMS],
    }));
  };

  const deleteEvent = (title, team, start) => {
    const filteredEvents = state.events.filter((ev) => {
      return ev.title !== title && ev.team !== team && ev.startTime !== start;
    });
    setState((s) => ({
      ...s,
      events: filteredEvents,
    }));
  };

  if (state.loadError) {
    return (
      <div className="load-events-error">
        Unable to load calendar... Please try again later
      </div>
    );
  }
  return (
    <div className="calendar-outline">
      {state.modalOpen && (
        <div className="modal-overlay">
          <div className="overlay-opacity" onClick={() => toggleModal(false)} />
          <CreateEvent
            setIsOpen={(val) => toggleModal(val)}
            date={state.selectedDate}
            triggerRefresh={() => loadAllEvents()}
          />
        </div>
      )}
      <div className="event-filters">
        <div
          className="event-filter-container event-filter-container-toggle"
          onClick={() => toggleAllFiltersOn()}
        >
          <div>Hide All Events</div>
        </div>
        <div
          className="event-filter-container event-filter-container-toggle"
          onClick={() => toggleAllFiltersOff()}
        >
          <div>Show All Events</div>
        </div>
      </div>
      <div className="event-filters event-filters-bottom">
        {FILTER_TEAMS.map((item) => {
          return (
            <div
              className={`event-filter-container ${
                state.appliedFilters.includes(item)
                  ? "event-filter-item-strike"
                  : ""
              }`}
              onClick={() => toggleFilterEvent(item)}
            >
              <div
                className={`item-so event-filter-item ${teamClassMap[item]}`}
              ></div>
              <div>{item}</div>
            </div>
          );
        })}
      </div>
      {renderHeader()}
      <div>
        <button className="calendar-today-button" onClick={goToToday}>
          Go to Today
        </button>
      </div>
      {renderTable()}
    </div>
  );
};

export default CalendarComponent;
