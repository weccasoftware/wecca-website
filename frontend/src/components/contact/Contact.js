import React, { useState } from "react";
import "./styles/Contact.css";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
    CONTACT_FORM_TYPE,
  FINANCE_CAPTAIN_EMAIL,
  LOGISTICS_CAPTAIN_EMAIL,
  LOGISTICS_CAPTAIN_NAME,
} from "../../config";
import { sendMail } from "../../util/Mail";

const Contact = () => {
  const GENERAL_MSG = "General";
  const SPONSOR_MSG = "Sponsor";
  const SUCCESS_MESSAGE =
    "Thank you for reaching out, we will review your message within 1-2 days.";
  const FAILURE_MESSAGE = `Your message could not be submitted. You can reach our Logistics Captain directly at ${LOGISTICS_CAPTAIN_EMAIL}.`;

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(GENERAL_MSG);
  const [displayMessage, setDisplayMessage] = useState("");

  const generateEmailBody = () => {
    const heading = `<h3>The contact form has been submitted with type ${messageType}</h3>`;
    const name = `<p><b>Name:</b> ${firstName} ${lastName}</p>`;
    const user = `<p><b>Email:</b> ${email}</p>`;
    const type = `<p><b>Message Type:</b> ${messageType}</p>`;
    const msg = `<p><b>Message:</b> ${message}</p>`;
    return heading + name + user + type + msg;
  };

  const handleFormSubmit = () => {
    //Check if any inputs are not filled out, and throw errors in this case
    setFirstName(firstName || "");
    setLastName(lastName || "");
    setEmail(email || "");
    setMessage(message || "");
    if (
      message.length === 0 ||
      email.length === 0 ||
      lastName.length === 0 ||
      firstName.length === 0
    )
      return;

    //Determine who to send the email to, then send it
    const mailTo =
      messageType === SPONSOR_MSG
        ? FINANCE_CAPTAIN_EMAIL
        : LOGISTICS_CAPTAIN_EMAIL;
    sendMail(
      mailTo,
      email,
      generateEmailBody(),
      setDisplayMessage,
      CONTACT_FORM_TYPE,
      SUCCESS_MESSAGE,
      FAILURE_MESSAGE
    );
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <div className="contact-form">
        <div className="contact-description centre">
          Contact our Logistics Captain, {LOGISTICS_CAPTAIN_NAME}
        </div>
        <div className="contact-input-sm">
          <TextField
            label="First Name"
            fullWidth
            required
            error={firstName !== null && firstName.length === 0}
            value={firstName}
            onChange={(n) => setFirstName(n.target.value)}
          ></TextField>
        </div>
        <div className="contact-input-sm">
          <TextField
            label="Last Name"
            fullWidth
            required
            error={lastName !== null && lastName.length === 0}
            value={lastName}
            onChange={(n) => setLastName(n.target.value)}
          ></TextField>
        </div>
        <div className="contact-input-lg">
          <TextField
            label="Email"
            fullWidth
            required
            error={email !== null && email.length === 0}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </div>
        <div className="contact-input-lg">
          <FormControl fullWidth>
            <InputLabel required>Message Type</InputLabel>
            <Select
              label="Message Type"
              fullWidth
              required
              value={messageType}
              onChange={(type) => setMessageType(type.target.value)}
            >
              <MenuItem value={GENERAL_MSG} key={GENERAL_MSG}>
                {GENERAL_MSG}
              </MenuItem>
              <MenuItem value={SPONSOR_MSG} key={SPONSOR_MSG}>
                {SPONSOR_MSG}
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="contact-input-lg">
          <TextField
            label="Message"
            multiline
            rows={4}
            fullWidth
            required
            error={message !== null && message.length === 0}
            value={message}
            onChange={(m) => setMessage(m.target.value)}
          ></TextField>
        </div>
        <div className="contact-button-container">
          <button className="contact-button" onClick={() => handleFormSubmit()}>
            Submit
          </button>
        </div>
        {displayMessage && displayMessage.length > 0 && (
          <div className="sponsor-response-message">{displayMessage}</div>
        )}
      </div>
      {/*<h2>Contact</h2>
      Will be a general contact form to get involved in the club <br />
      Collect first name, last name, email, and comment (with select for sponsor
      or other)
      <br />
      Maybe like a "come find us" thing? Or address?*/}
    </div>
  );
};

export default Contact;
