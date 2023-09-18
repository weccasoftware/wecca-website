import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Login from "./Login";
import { BASE_URL, EMAIL_KEY, NAME_KEY, TEAM_KEY } from "../../config";

const Verify = () => {
  const [params, setParams] = useSearchParams();
  const [verificationText, setVerificationText] = useState('');

  const setVerificationTimeout = () => {
    setVerificationText("Thank you for verifying your email. Please wait for Dylan or Ethan to verify your account before you may login.")
    setTimeout(() => {
        setVerificationText('')
    }, 5000)
  }

  const submitVerification = (
    email,
    password,
    isLoadingCallback,
    errorCallback
  ) => {
    fetch(`${BASE_URL}/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        password: password,
        email: email,
        key: params.get("token").replace(/\s/g, '+'),
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
        isLoadingCallback(false);
        setVerificationTimeout();
      })
      .catch((err) => {
        errorCallback(err.message);
        isLoadingCallback(false);
      });
  };

  return <Login overrideSubmit={submitVerification} verificationText={verificationText}/>;
};

export default Verify;
