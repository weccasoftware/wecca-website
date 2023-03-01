import React, { useEffect, useState } from "react";
import './styles/CreateEvent.css'
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { addHours, format } from "date-fns";

const subTeams = [
    "General",
    "Executive",
    "Software Development",
    "Materials",
    "Technical Communications"
]

const CreateEvent = ({setIsOpen, date, addEvent}) => {
    const [state, setState] = useState({
        team: "General",
        title: '',
        startTime: new Date(),
        endTime: addHours(new Date(), 1),
        description: '',
        titleError: ''
    })

    useEffect(() => {
        console.log(state)
    }, [state])
    
    const setTeam = (team) => {
        setState({
            ...state,
            team: team.target.value
        })
    }

    const setTitle = (title) => {
        setState({
            ...state,
            title: title.target.value,
            titleError: ''
        })
    }

    const setStartTime = (time) => {
        setState({
            ...state,
            startTime: time
        })
    }

    const setEndTime = (time) => {
        setState({
            ...state,
            endTime: time
        })
    }

    const setDescription = (desc) => {
        setState({
            ...state,
            description: desc.target.value
        })
    }

    const setError = (err) => {
        setState((s) => ({
            ...s,
            titleError: err
        }))
    }

    const submitForm = () => {
        if(state.title.length === 0){
            setError("Event must have a title")
            return;
        }

        const stateCopy = {...state}
        delete stateCopy.titleError
        addEvent(stateCopy)
    }

    if(!setIsOpen) return <></>
    return (
        <div className='centered'>
            <div className="modal">
                <div className="background-modal">
                    <h5 className="modal-head">Create event on {format(date, 'MMMM d, yyyy')}</h5>
                </div>
                <FormControl fullWidth>
                    <InputLabel required>Team</InputLabel>
                    <Select
                        label="Team"
                        value={state.team}
                        onChange={(team) => setTeam(team)}>
                        {subTeams.map((team) => {
                            return (<MenuItem value={team} key={team}>{team}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
                <br/><br/>
                <TextField label='Title' fullWidth 
                    onChange={(title) => setTitle(title)}
                    error={state.titleError} required></TextField>
                <br/><br/>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopTimePicker
                        label="Start Time"
                        value={state.startTime}
                        onChange={(time) => setStartTime(time) }
                        renderInput={(params) => <TextField {...params} fullWidth required/>}
                    />
                    <br/><br/>
                    <DesktopTimePicker
                        label="End Time"
                        value={state.endTime}
                        onChange={(time) => {
                            setEndTime(time);
                        }}
                        renderInput={(params) => <TextField {...params} fullWidth required/>}
                    />
                </LocalizationProvider>
                <br/><br/>
                <TextField label="Description"
                    multiline fullWidth
                    rows={4} value={state.description}
                    onChange={(desc) => setDescription(desc)}></TextField>
                <div className='buttons-container'>
                    <button className="modal-button" onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>
                    <button className="modal-button" onClick={() => submitForm()}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent;