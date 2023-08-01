import React, { useEffect, useState } from "react";
import "./styles/Sponsors.css";
import image from "../../assets/ethan-exec.jpeg";
import { TextField } from "@mui/material";
import { FINANCE_CAPTAIN_EMAIL, SPONSORSHIP_FORM_TYPE } from "../../config";
import { sendMail } from "../../util/Mail";

const Sponsors = () => {
  const goldBenefits = [];
  const silverBenefits = [];
  const bronzeBenefits = [];
  const purpleBenefits = [];
  const SUCCESS_MESSAGE =
    "Thank you for reaching out, please allow some time for us to get back to you.";
  const FAILURE_MESSAGE = 
    `Your message could not be delivered at this time. You can reach out to our finance captain directly at ${FINANCE_CAPTAIN_EMAIL}.`;

  const renderedPackages = {
    gold: (
      <div className="tier-content">
        <div className="tier-image-container">
          <img src={image} className="tier-image" />
        </div>
        <div className="tier-description-container">
          <div className="tier-subtitle">Gold Sponsors: $1,750+</div>
          <ul>
            {goldBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
    silver: (
      <div className="tier-content">
        <div className="tier-image-container">
          <img src={image} className="tier-image" />
        </div>
        <div className="tier-description-container">
          <div className="tier-subtitle">Silver Sponsors: $1,250-$1,749</div>
          <ul>
            {silverBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
    bronze: (
      <div className="tier-content">
        <div className="tier-image-container">
          <img src={image} className="tier-image" />
        </div>
        <div className="tier-description-container">
          <div className="tier-subtitle">Bronze Sponsors: $750-$1,249</div>
          <ul>
            {bronzeBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
    purple: (
      <div className="tier-content">
        <div className="tier-image-container">
          <img src={image} className="tier-image" />
        </div>
        <div className="tier-description-container">
          <div className="tier-subtitle">Purple Sponsors: $500-$749</div>
          <ul>
            {purpleBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
  };

  const [renderedPackage, setRenderedPackage] = useState(renderedPackages.gold);
  const [selectedTier, setSelectedTier] = useState("gold");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    setRenderedPackage(renderedPackages[selectedTier]);
  }, [selectedTier]);

  const handleTierChange = (val) => {
    setSelectedTier(val);
  };

  const generateEmailBody = () => {
    const heading = `<h3>The sponsorship form has been submitted</h3>`;
    const user = `<p><b>Email:</b> ${email}</p>`;
    const message = `<p><b>Message:</b> ${question}</p>`;
    return heading + user + message;
  };

  return (
    <div className="sponsors-page">
      <h1 className="centre">Our Sponsors</h1>
      <div className="sponsors-tier">Gold Tier</div>
      <div className="sponsor-box">
        <div>Hi</div>
      </div>
      <div className="sponsors-tier">Silver Tier</div>
      <div className="sponsor-box">
        <div>Hello</div>
      </div>
      <div className="sponsors-tier">...</div>
      <h1 className="centre">Sponsorship Packages</h1>
      <ul className="sponsorship-tiers-list">
        <li
          onClick={() => handleTierChange("gold")}
          className={selectedTier === "gold" ? "selected-tier" : ""}
        >
          Gold
        </li>
        <li
          onClick={() => handleTierChange("silver")}
          className={selectedTier === "silver" ? "selected-tier" : ""}
        >
          Silver
        </li>
        <li
          onClick={() => handleTierChange("bronze")}
          className={selectedTier === "bronze" ? "selected-tier" : ""}
        >
          Bronze
        </li>
        <li
          onClick={() => handleTierChange("purple")}
          className={selectedTier === "purple" ? "selected-tier" : ""}
        >
          Purple
        </li>
      </ul>
      <div className="sponsor-tier-content">{renderedPackage}</div>
      <div className="donate-form">
        <h1 className="centre">Become a Sponsor</h1>
        <form
          action="https://www.westernconnect.ca/site/SPageNavigator/ConcreteCanoe"
          target="_blank"
        >
          <button className="donate-button" type="submit">
            Donate Online Now
          </button>
        </form>
        <div className="donate-subtext">
          For any questions or concerns regarding sponsorship opportunities,
          contact our Finance Captain Liam Reeves.
        </div>
        <div className="donate-input">
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></TextField>
        </div>
        <div className="donate-input">
          <TextField
            label="Question"
            fullWidth
            multiline
            value={question}
            rows={4}
            onChange={(q) => setQuestion(q.target.value)}
          ></TextField>
        </div>
        <button
          className="donate-button"
          onClick={() =>
            sendMail(
              FINANCE_CAPTAIN_EMAIL,
              email,
              generateEmailBody(),
              setSubmitMessage,
              SPONSORSHIP_FORM_TYPE,
              SUCCESS_MESSAGE, 
              FAILURE_MESSAGE
            )
          }
        >
          Submit
        </button>
        {submitMessage && submitMessage.length > 0 && (
          <div className="sponsor-response-message">{submitMessage}</div>
        )}
      </div>
      <hr />
      <h2>Sponsors</h2>
      This page can show the club's sponsor information, including:
      <ul>
        <li>Current sponsors</li>
        <li>
          Sponsorship package (see Finance Captain Google Drive) + download link
        </li>
        <li>Link to donate</li>
        <li>Finance captain's contact info</li>
        <li>Maybe: interest form?</li>
      </ul>
    </div>
  );
};

export default Sponsors;
