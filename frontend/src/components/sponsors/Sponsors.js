import React, { useEffect, useState } from "react";
import "./styles/Sponsors.css";
import { TextField } from "@mui/material";
import { FINANCE_CAPTAIN_EMAIL, SPONSORSHIP_FORM_TYPE, WINDOW_SIZE_THRESHOLD_PX } from "../../config";
import { sendMail } from "../../util/Mail";
import mte from '../../assets/sponsor-logos/MTE.png'
import autotube from '../../assets/sponsor-logos/Autotube.png'
import cornerstone from '../../assets/sponsor-logos/Cornerstone.png'
import ellisdon from '../../assets/sponsor-logos/EllisDon.png'
import dillon from '../../assets/sponsor-logos/Dillon.png'
import sbm from '../../assets/sponsor-logos/SBM.png'
import purpleImage from '../../assets/sponsors/sponsors-tier-photo-1.png'
import goldImage from '../../assets/sponsors/sponsors-tier-photo-2.png'
import platinumImage from '../../assets/sponsors/sponsors-tier-photo-3.png'

const Sponsors = () => {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const platinumBenefits = [
    "Company logo put on competition T-Shirts",
    "Company shoutouts at weekly team meetings",
    "Company logo on WECCA's website",
  ];
  const goldBenefits = [
    "Company logo put on competition T-shirts",
    "Company shoutouts on social media and at weekly team meetings",
    "Company logo on WECCA's website",
    'Custom "Thank You" plaque',
  ];
  const purpleBenefits = [
    "Company logo put on competition T-shirts",
    "Company shoutouts on social media and at weekly team meetings",
    "Company logo decals on the team trailer",
    'Custom "Thank You" package from WECCA',
    "Company logo on WECCA's Website",
  ];
  const SUCCESS_MESSAGE =
    "Thank you for reaching out, please allow some time for us to get back to you.";
  const FAILURE_MESSAGE = `Your message could not be delivered at this time. You can reach out to our finance captain directly at ${FINANCE_CAPTAIN_EMAIL}.`;

  const platinumLogos = [
    dillon, mte, cornerstone, sbm
  ]
  const goldLogos = [
    autotube, ellisdon
  ]
  const purpleLogos = [

  ]

  const renderedPackages = {
    purple: (
      <div className="tier-content">
        <div className="tier-image-container">
          <img src={purpleImage} className="tier-image purple-tier" />
        </div>
        <div className="tier-description-container">
          <div className="tier-subtitle">Purple Sponsors: $1,500+</div>
          <ul>
            {purpleBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
    gold: (
      <div className="tier-content">
        <div className="tier-image-container">
          <img src={goldImage} className="tier-image gold-tier" />
        </div>
        <div className="tier-description-container">
          <div className="tier-subtitle">Gold Sponsors: $1,000-$1,499</div>
          <ul>
            {goldBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
    platinum: (
      <div className="tier-content">
        <div className="tier-image-container">
          <img src={platinumImage} className="tier-image platinum-tier" />
        </div>
        <div className="tier-description-container">
          <div className="tier-subtitle">Platinum Sponsors: $500-$999</div>
          <ul>
            {platinumBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
  };

  const mobilePackages = {
    purple: (
      <div className="tier-content-mobile">
        <div className="tier-image-container-mobile">
          <img src={purpleImage} className="tier-image-mobile purple-tier" />
        </div>
        <div className="tier-description-container-mobile">
          <div className="tier-subtitle-mobile">Purple Sponsors: $1,500+</div>
          <ul>
            {purpleBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
    gold: (
      <div className="tier-content-mobile">
        <div className="tier-image-container-mobile">
          <img src={goldImage} className="tier-image-mobile gold-tier" />
        </div>
        <div className="tier-description-container-mobile">
        <div className="tier-subtitle-mobile">Gold Sponsors: $1,000-$1,499</div>
          <ul>
            {goldBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
    platinum: (
      <div className="tier-content-mobile">
        <div className="tier-image-container-mobile">
          <img src={platinumImage} className="tier-image-mobile platinum-tier" />
        </div>
        <div className="tier-description-container-mobile">
        <div className="tier-subtitle-mobile">Platinum Sponsors: $500-$999</div>
          <ul>
            {platinumBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    )
  }

  const [renderedPackage, setRenderedPackage] = useState(renderedPackages.gold);
  const [selectedTier, setSelectedTier] = useState("purple");
  const [email, setEmail] = useState(null);
  const [question, setQuestion] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (windowSize[0] > WINDOW_SIZE_THRESHOLD_PX) {
      setRenderedPackage(renderedPackages[selectedTier]);
    } else {
      setRenderedPackage(mobilePackages[selectedTier]);
    }
  }, [selectedTier, windowSize]);

  const handleTierChange = (val) => {
    setSelectedTier(val);
  };

  const generateEmailBody = () => {
    const heading = `<h3>The sponsorship form has been submitted</h3>`;
    const user = `<p><b>Email:</b> ${email}</p>`;
    const message = `<p><b>Message:</b> ${question}</p>`;
    return heading + user + message;
  };

  const handleContactSubmit = () => {
    setEmail(email || "");
    setQuestion(question || "");
    if (email.length === 0 || question.length === 0) return;

    sendMail(
      FINANCE_CAPTAIN_EMAIL,
      email,
      generateEmailBody(),
      setSubmitMessage,
      SPONSORSHIP_FORM_TYPE,
      SUCCESS_MESSAGE,
      FAILURE_MESSAGE
    );
  };

  return (
    <div className="sponsors-page">
      <div className="sponsor-header-image"></div>
      <h1 className="centre">Sponsorship Packages</h1>
      <ul className="sponsorship-tiers-list">
        <li
          onClick={() => handleTierChange("purple")}
          className={selectedTier === "purple" ? "selected-tier" : ""}
        >
          Purple
        </li>
        <li
          onClick={() => handleTierChange("gold")}
          className={selectedTier === "gold" ? "selected-tier" : ""}
        >
          Gold
        </li>
        <li
          onClick={() => handleTierChange("platinum")}
          className={selectedTier === "platinum" ? "selected-tier" : ""}
        >
          Platinum
        </li>
      </ul>
      <div className="sponsor-tier-content">{renderedPackage}</div>
      <hr className="sponsor-hr"/>
      <h1 className="sponsorship-title">Our Sponsors</h1>
      <div className="sponsorship-caption">
        Thank you to our current sponsors for the 2023-24 year! 
      </div>
      {purpleLogos && purpleLogos.length > 0 && <div className="sponsorship-tier-company-box">
        <div className="sponsorship-tier-company-header">Purple Tier</div>
        <div className="sponsorship-tier-company-content purple-tier">
          {
            purpleLogos.map((logo) => {
              return (
                <div className="sponsor-logo-container">
                  <img src={logo} />
                </div>
              )
            })
          }
        </div>
      </div>}
      {goldLogos && goldLogos.length > 0 && <div className="sponsorship-tier-company-box">
        <div className="sponsorship-tier-company-header">Gold Tier</div>
        <div className="sponsorship-tier-company-content gold-tier">
        {
            goldLogos.map((logo) => {
              return (
                <div className="sponsor-logo-container">
                  <img src={logo} />
                </div>
              )
            })
          }
        </div>
      </div>}
      {platinumLogos && platinumLogos.length > 0 && <div className="sponsorship-tier-company-box">
        <div className="sponsorship-tier-company-header">Platinum Tier</div>
        <div className="sponsorship-tier-company-content platinum-tier">
        {
            platinumLogos.map((logo) => {
              return (
                <div className="sponsor-logo-container">
                  <img src={logo} />
                </div>
              )
            })
          }
        </div>
      </div>}
      <hr className="sponsor-hr"/>
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
            required
            error={email !== null && email.length === 0}
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
            required
            error={question !== null && question.length === 0}
            onChange={(q) => setQuestion(q.target.value)}
          ></TextField>
        </div>
        <button className="donate-button" onClick={() => handleContactSubmit()}>
          Submit
        </button>
        {submitMessage && submitMessage.length > 0 && (
          <div className="sponsor-response-message">{submitMessage}</div>
        )}
      </div>
      {/*<h2>Sponsors</h2>
      This page can show the club's sponsor information, including:
      <ul>
        <li>Current sponsors</li>
        <li>
          Sponsorship package (see Finance Captain Google Drive) + download link
        </li>
        <li>Link to donate</li>
        <li>Finance captain's contact info</li>
        <li>Maybe: interest form?</li>
        </ul>*/}
    </div>
  );
};

export default Sponsors;
