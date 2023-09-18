import React, { useState } from "react";
import Login from "./Login";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../config";

const Validate = () => {
  const [params, setParams] = useSearchParams();
  const [verificationText, setVerificationText] = useState('');

  const setVerificationTimeout = () => {
    setVerificationText("User is now authorized.")
    setTimeout(() => {
        setVerificationText('')
    }, 5000)
  }

  const callValidation = (
    email,
    password,
    isLoadingCallback,
    errorCallback
  ) => {
    fetch(`${BASE_URL}/validate`, {
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
        if (!result.success) throw new Error("Failed to validate");
        isLoadingCallback(false);
        setVerificationTimeout();
      })
      .catch((err) => {
        errorCallback(err.message);
        isLoadingCallback(false);
      });
  };

  return <Login overrideSubmit={callValidation} verificationText={verificationText}/>;
};

export default Validate;
