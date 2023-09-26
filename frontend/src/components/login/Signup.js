import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { BASE_URL, SIGNUP_ROLES } from "../../config";
import { useNavigate } from "react-router-dom";
import {
  sendConfirmationEmail,
  sendMail,
  sendSignupEmail,
} from "../../util/Mail";

const Signup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    team: SIGNUP_ROLES[0],
    email: "",
    name: "",
    password: "",
    comparePassword: "",
    signupError: "",
    isLoading: false,
    signupSuccess: false,
  });

  useEffect(() => {
    comparePasswords();
  }, [state.password, state.comparePassword]);

  const setTeam = (t) => {
    setState((s) => ({
      ...s,
      team: t,
    }));
  };

  const setEmail = (e) => {
    setState((s) => ({
      ...s,
      email: e,
    }));
  };

  const setSignupSuccess = (s) => {
    setState((s) => ({
      ...s,
      signupSuccess: s,
    }));
  };

  const setName = (n) => {
    setState((s) => ({
      ...s,
      name: n,
    }));
  };

  const setPassword = (p) => {
    setState((s) => ({
      ...s,
      password: p,
    }));
  };

  const setComparePassword = (p) => {
    setState((s) => ({
      ...s,
      comparePassword: p,
    }));
  };

  const setSignupError = (e) => {
    setState((s) => ({
      ...s,
      signupError: e,
    }));

    setTimeout(() => {
      setState((s) => ({
        ...s,
        signupError: "",
      }));
    }, 3000);
  };

  const setIsLoading = (v) => {
    setState((s) => ({
      ...s,
      isLoading: v,
    }));
  };

  const comparePasswords = () => {
    if (!state.comparePassword || state.comparePassword.length === 0) return;
    if (state.password !== state.comparePassword) {
      setState((s) => ({
        ...s,
        comparePasswordError: true,
      }));
    } else {
      setState((s) => ({
        ...s,
        comparePasswordError: false,
      }));
    }
  };

  const perfomValidation = () => {
    setState((s) => ({
      ...s,
      nameError: state.name.length === 0,
      emailError: state.email.length === 0,
      passwordError: state.password.length === 0,
    }));
  };

  const submitSignup = () => {
    perfomValidation();
    if (
      state.name.length === 0 ||
      state.email.length === 0 ||
      state.password.length === 0 ||
      state.passwordError
    )
      return;

    setIsLoading(true);

    fetch(`${BASE_URL}/api/users/signup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        team: state.team,
        name: state.name,
        password: state.password,
        email: state.email,
      }),
    })
      .then((a) => {
        if (a.status !== 200) {
          throw new Error(a.statusText);
        }

        return a.json();
      })
      .then((result) => {
        setIsLoading(false);
        sendConfirmationEmail(
          result.email,
          result.name,
          result.verificationUrl
        );
        sendSignupEmail(result.email, result.name, result.validationUrl);
        setSignupSuccess(true);
      })
      .catch((err) => {
        setSignupError(err.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="signup-container">
      <h2 className="signup-header">Executive Signup</h2>
      <p className="signup-description">
        <i>Please use your UWO email to sign up</i>
      </p>
      <div className="signup-form">
        <FormControl fullWidth>
          <InputLabel required>Subteam</InputLabel>
          <Select
            label="Subteam"
            value={state.team}
            onChange={(team) => setTeam(team.target.value)}
          >
            {Object.values(SIGNUP_ROLES).map((team) => {
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
          label="Email"
          fullWidth
          onChange={(email) => setEmail(email.target.value)}
          error={state.emailError}
          required
          value={state.email}
        ></TextField>
        <br />
        <br />
        <TextField
          label="First and Last Name"
          fullWidth
          onChange={(name) => setName(name.target.value)}
          error={state.nameError}
          required
          value={state.name}
        ></TextField>
        <br />
        <br />
        <TextField
          label="Password"
          fullWidth
          onChange={(pwd) => setPassword(pwd.target.value)}
          error={state.passwordError}
          required
          type="password"
          value={state.password}
        ></TextField>
        <br />
        <br />
        <TextField
          label="Confirm Password"
          fullWidth
          onChange={(pwd) => setComparePassword(pwd.target.value)}
          error={state.passwordError}
          required
          type="password"
          value={state.comparePassword}
        ></TextField>
        {state.comparePasswordError && (
          <div className="delete-event-error">
            <i>Passwords do not match</i>
          </div>
        )}
        <div className="centre">
          <button className="signup-button" onClick={submitSignup}>
            {!state.isLoading ? "Sign Up" : "Loading..."}
          </button>
        </div>
        {state.signupError && (
          <div className="delete-event-error centre">
            <i>Error signing up: {state.signupError}</i>
          </div>
        )}
        {state.signupSuccess && (
          <div className="verify-event-success centre">
            <i>
              Thank you for signing up. Please check your junk mail for
              verification instructions. If you encounter any issues, reach out
              to Ethan or Dylan on slack.
            </i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
