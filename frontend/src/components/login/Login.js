import React, { useEffect, useState } from "react";
import "./styles/Login.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { BASE_URL, EMAIL_KEY, NAME_KEY, SIGNUP_ROLES, TEAM_KEY } from "../../config";
import { useNavigate } from "react-router-dom";

const Login = ({ overrideSubmit, verificationText }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
    loginError: "",
  });

  const setEmail = (e) => {
    setState((s) => ({
      ...s,
      email: e,
    }));
  };

  const setPassword = (p) => {
    setState((s) => ({
      ...s,
      password: p,
    }));
  };

  const setLoginError = (e) => {
    setState((s) => ({
      ...s,
      loginError: e,
    }));

    setTimeout(() => {
      setState((s) => ({
        ...s,
        loginError: "",
      }));
    }, 3000);
  };

  const setIsLoading = (v) => {
    setState((s) => ({
      ...s,
      isLoading: v,
    }));
  };

  const perfomValidation = () => {
    setState((s) => ({
      ...s,
      emailError: state.email.length === 0,
      passwordError: state.password.length === 0,
    }));
  };

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const submitLogin = () => {
    perfomValidation();
    if (state.email.length === 0 || state.password.length === 0) return;

    setIsLoading(true);

    fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
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
        sessionStorage.setItem(NAME_KEY, result.name);
        sessionStorage.setItem(TEAM_KEY, result.team);
        sessionStorage.setItem(EMAIL_KEY, result.email);
        dispatchEvent(new Event("login"));
        setIsLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoginError(err.message);
        setIsLoading(false);
      });
  };

  const callOverrideFunction = async () => {
    perfomValidation();
    if (state.email.length === 0 || state.password.length === 0) return;

    await overrideSubmit(
      state.email,
      state.password,
      setIsLoading,
      setLoginError
    );
  };

  if (sessionStorage.getItem(EMAIL_KEY)) {
    return (
      <div>
        <div className="login-info">
          You are logged in as {sessionStorage.getItem(EMAIL_KEY)}
        </div>
        <button className="signup-button" onClick={logout}>
          Log Out
        </button>
      </div>
    );
  }
  return (
    <div className="signup-container">
      <h2 className="signup-header">Login{overrideSubmit ? " to Verify" : ""}</h2>
      <p className="signup-description">
      <div onClick={() => navigate('/signup')} className="inline-div underline-link"><i>Sign up here</i></div>
      </p>
      <div className="signup-form">
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
          label="Password"
          fullWidth
          onChange={(pwd) => setPassword(pwd.target.value)}
          error={state.passwordError}
          required
          type="password"
          value={state.password}
        ></TextField>
        <div className="centre">
          <button
            className="signup-button"
            onClick={
              overrideSubmit ? callOverrideFunction : submitLogin
            }
          >
            {!state.isLoading ? "Log In" : "Loading..."}
          </button>
        </div>
        {state.loginError && (
          <div className="delete-event-error centre">
            <i>Error logging in: {state.loginError}</i>
          </div>
        )}
        {verificationText && verificationText.length > 0 && (
          <div className="verify-event-success centre">
            <i>
              Thank you for verifying your email. Please wait for Dylan or Ethan
              to verify your account before you may login.
            </i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
