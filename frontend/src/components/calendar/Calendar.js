import './Calendar.css'
import React from "react";
import CalendarComponent from './CalendarComponent';

const Calendar = () => {
    return (
        <div>
            <h2>Calendar</h2>
            <div>
                This page can contain a custom calendar, with the following:
                <ul>
                    <li>All users can access the general and sub-team calendar</li>
                    <li>Only executives and captains can see the executive calendar</li>
                    <li>Only captains can see the captain calendar</li>
                    <li>Executives can only configure events for their own subteams (and general? - bring up in exec meeting)</li>
                    <li>Captains can configure events for any subteams</li>
                    <li>Captains can also configure executive and general events</li>
                    <li>Events can be created, edited, and deleted</li>
                    <li>Events have the following information: date, start time, end time, team (also determines icon colour), title, comment</li>
                    <li>Maybe: people can select if they are going or not going to events</li>
                    <li>Maybe: events can be filtered (ie only show all software events)</li>
                    <li>Maybe: allow for users to subscribe to the calendar (ie with google calendar)</li>
                </ul>
            </div>
            <CalendarComponent />
        </div>
    )
}

export default Calendar;