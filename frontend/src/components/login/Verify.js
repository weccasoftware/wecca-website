import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Login from "./Login";
import { BASE_URL, EMAIL_KEY, NAME_KEY, TEAM_KEY } from "../../config";

const Verify = () => {
  const VALIDATION_INCOMPLETE =
    "Thank you for verifying your email. Please wait for Dylan or Ethan to verify your account before you may login.";
  const VALIDATION_COMPLETE =
    "Thank you for verifying your email - you have been logged in.";

  const [params, setParams] = useSearchParams();
  const [verificationText, setVerificationText] = useState("");

  const setVerificationTimeout = (text) => {
    setVerificationText(text);
    setTimeout(() => {
      setVerificationText("");
    }, 5000);
  };

  const submitVerification = (
    email,
    password,
    isLoadingCallback,
    errorCallback
  ) => {
    isLoadingCallback(true);
    fetch(`${BASE_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        password: password,
        email: email,
        key: params.get("token").replace(/\s/g, "+"),
      }),
    })
      .then((a) => {
        if (a.status !== 200) {
          throw new Error(a.statusText);
        }

        return a.json();
      })
      .then((result) => {
        if (!result.success) throw new Error("Failed to verify");

        if (EMAIL_KEY in result) {
          sessionStorage.setItem(NAME_KEY, result.name);
          sessionStorage.setItem(TEAM_KEY, result.team);
          sessionStorage.setItem(EMAIL_KEY, result.email);
          dispatchEvent(new Event("login"));
        }

        isLoadingCallback(false);
        if (EMAIL_KEY in result) {
          setVerificationTimeout(VALIDATION_COMPLETE);
        } else {
          setVerificationTimeout(VALIDATION_INCOMPLETE);
        }
      })
      .catch((err) => {
        errorCallback(err.message);
        isLoadingCallback(false);
      });
  };

  return (
    <Login
      overrideSubmit={submitVerification}
      verificationText={verificationText}
    />
  );
};

export default Verify;
