import React, { useEffect, useState } from "react";
import "./styles/Sponsors.css";
import { TextField } from "@mui/material";
import {
  FINANCE_CAPTAIN_EMAIL,
  SPONSORSHIP_FORM_TYPE,
  WINDOW_WIDTH_THRESHOLD_PX,
} from "../../config";
import { sendMail } from "../../util/Mail";

import mte from "../../assets/sponsor-logos/MTE Sponsorship Logo.png";
import autotube from "../../assets/sponsor-logos/Autotube.png";
import cornerstone from "../../assets/sponsor-logos/Cornerstone Architecture.png";
import ellisdon from "../../assets/sponsor-logos/EllisDon.png";
import dillon from "../../assets/sponsor-logos/Dillon.png";
import sbm from "../../assets/sponsor-logos/SBM.png";
import johnaarts from "../../assets/sponsor-logos/JohnAarts.png";
import williams from "../../assets/sponsor-logos/Williams.png";
import am from "../../assets/sponsor-logos/AM.png";
import dassault from "../../assets/sponsor-logos/Dassault_Systèmes Logo.png";
import dufferin from "../../assets/sponsor-logos/Dufferin Construction.png";
import federalwhite from "../../assets/sponsor-logos/Federal White Cement.png";
import gananoqueinn from "../../assets/sponsor-logos/Gananoque Inn and Spa.jpg";
import chandos from "../../assets/sponsor-logos/Chandos Logo.jpg";
import optagroup from "../../assets/sponsor-logos/Opta Group Logo.png";
import solidworks from "../../assets/sponsor-logos/SolidWorks Logo.png";

import goldImage from "../../assets/sponsors/sponsors-tier-photo-1.png";
import silverImage from "../../assets/sponsors/sponsors-tier-photo-2.png";
import bronzeImage from "../../assets/sponsors/sponsors-tier-photo-3.png";
import purpleImage from "../../assets/sponsors/sponsors-tier-photo-4.jpg";

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

  const goldBenefits = [
    "Invitation to End-of-Year Canoe Unveiling + Sponsor Appreciation Event",
    {
      title: "EXTRA Large Logo On:",
      list: [
        "Team T-Shirts",
        "Sponsorship Banner Displayed at Competition",
        "WECCA Website, LinkedIn and Instagram",
      ],
    },
    "Dedicated Thank you post on social media",
    "Custom 'Thank You' package",
    "Priority speaking opportunity at End-Of-Year Unveiling",
    "Invitation to Campus Visit with Team in Lab",
    "Exclusive recognition in WECCA's 2025 Team Promo Video"
  ];
  const silverBenefits = [
    "Invitation to End-of-Year Canoe Unveiling + Sponsor Appreciation Event",
    {
      title: "Large Logo On:",
      list: [
        "Team T-Shirts",
        "Sponsorship Banner Displayed at Competition",
        "WECCA Website, LinkedIn and Instagram",
      ],
    },
    "Dedicated Thank you post on social media",
    "Custom 'Thank You' package",
    "Priority speaking opportunity at End-Of-Year Unveiling",
    "Invitation to Campus Visit with Team in Lab",
  ];
  const bronzeBenefits = [
    "Invitation to End-of-Year Canoe Unveiling + Sponsor Appreciation Event",
    {
      title: "Medium Logo On:",
      list: [
        "Team T-Shirts",
        "Sponsorship Banner Displayed at Competition",
        "WECCA Website, LinkedIn and Instagram",
      ],
    },
    "Dedicated Thank you post on social media",
    'Custom "Thank You" package',
  ];
  const purpleBenefits = [
    "Invitation to End-of-Year Canoe Unveiling + Sponsor Appreciation Event",
    {
      title: "Small Logo On:",
      list: [
        "Team T-Shirts",
        "Sponsorship Banner Displayed at Competition",
        "WECCA Website, LinkedIn and Instagram",
      ],
    },
    "Dedicated Thank you post on social media",
    'Custom "Thank You" package',
  ];
  const SUCCESS_MESSAGE =
    "Thank you for reaching out, please allow some time for us to get back to you.";
  const FAILURE_MESSAGE = `Your message could not be delivered at this time. You can reach out to our finance captain directly at ${FINANCE_CAPTAIN_EMAIL}.`;

  const goldLogos = [
    {
      image: chandos,
      name: "Chandos Construction",
      website: "https://www.chandos.com/"
    },
    {
      image: gananoqueinn,
      name: "Gananoque Inn & Spa",
      website: "https://www.gananoqueinn.com/"
    },
  ];
  const silverLogos = [
    {
      image: dufferin,
      name: "Dufferin Construction",
      website: "https://dufferinconstruction.com/"
    },
  ];
  const bronzeLogos = [
  ];
  const purpleLogos = [
    {
      image: mte,
      name: "MTE",
      website: "https://www.mte85.com"
    },
    {
      image: cornerstone,
      name: "Cornerstone Architecture",
      website: "https://www.cornerstonearchitecture.ca",
    },
  ];
  const mentorshipLogos = [
    {
      image: dassault,
      name: "Dassault Systems",
      website: "https://www.3ds.com/"
    },
    {
      image: solidworks,
      name: "Solidworks",
      website: "https://www.solidworks.com/"
    },
  ];
  const materialLogos = [
    {
      image: federalwhite,
      name: "Federal White Cement",
      website: "https://www.federalwhitecement.com/"
    },
    {
      image: optagroup,
      name: "Opta Group",
      website: "https://opta-group.com/"
    },
  ];
  const pastSponsors = [
    { // Previous Platinum Sponsors
      image: dillon,
      name: "Dillon Consulting",
      website: "https://www.dillon.ca",
    },
    { image: mte,
      name: "MTE",
      website: "https://www.mte85.com"
    },
    {
      image: sbm,
      name: "Strik Baldinelli Moniz",
      website: "https://www.sbmltd.ca",
    },
    {
      image: williams,
      name: "Williams Form Engineering Corp.",
      website: "https://www.williamsform.com",
    },

      // Previous gold sponsors
    {
      image: autotube,
      name: "Autotube",
      website: "https://www.autotube.com"
    },
    {
      image: ellisdon,
      name: "EllisDon",
      website: "https://www.ellisdon.com" },
    {
      image: johnaarts,
      name: "John Aarts Group",
      website: "https://johnaartsgroup.com",
    },
    {
      image: am,
      name: "Architectural Millwork & Door Installations",
      website: "https://amdiinc.com",
    },
  ];

  const renderedPackages = {
    gold: (
      <div className="tier-content">
        <div className="tier-image-container">
          <img src={goldImage} className="tier-image gold-tier" />
        </div>
        <div className="tier-description-container">
          <div className="tier-subtitle">Gold Sponsors: $1,500+</div>
          <ul>
            {goldBenefits.map((benefit, index) => {
              if (typeof benefit === "string") {
                return <li key={index}>{benefit}</li>;
              }

              return (
                  <li key={index}>
                    {benefit.title}
                    <ul>
                      {benefit.list.map((item, i) => (
                          <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </li>
              );
            })}
          </ul>
        </div>
      </div>
    ),
    silver: (
      <div className="tier-content">
        <div className="tier-image-container">
          <img src={silverImage} className="tier-image silver-tier" />
        </div>
        <div className="tier-description-container">
          <div className="tier-subtitle">Silver Sponsors: $1,000-$1,499</div>
          <ul>
            {silverBenefits.map((benefit, index) => {
              if (typeof benefit === "string") {
                return <li key={index}>{benefit}</li>;
              }

              return (
                  <li key={index}>
                    {benefit.title}
                    <ul>
                      {benefit.list.map((item, i) => (
                          <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </li>
              );
            })}
          </ul>
        </div>
      </div>
    ),
    bronze: (
      <div className="tier-content">
        <div className="tier-image-container">
          <img src={bronzeImage} className="tier-image bronze-tier" />
        </div>
        <div className="tier-description-container">
          <div className="tier-subtitle">Bronze Sponsors: $500-$999</div>
          <ul>
            {bronzeBenefits.map((benefit, index) => {
              if (typeof benefit === "string") {
                return <li key={index}>{benefit}</li>;
              }
              return (
                  <li key={index}>
                    {benefit.title}
                    <ul>
                      {benefit.list.map((item, i) => (
                          <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </li>
              );
            })}
          </ul>
        </div>
      </div>
    ),
    purple: (
        <div className="tier-content">
          <div className="tier-image-container">
            <img src={purpleImage} className="tier-image purple-tier" />
          </div>
          <div className="tier-description-container">
            <div className="tier-subtitle">Purple Sponsors: &lt;$500</div>
            <ul>
              {purpleBenefits.map((benefit, index) => {
                if (typeof benefit === "string") {
                  return <li key={index}>{benefit}</li>;
                }

                return (
                    <li key={index}>
                      {benefit.title}
                      <ul>
                        {benefit.list.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </li>
                );
              })}
            </ul>
          </div>
        </div>
    ),
  };
  const mobilePackages = {
    gold: (
      <div className="tier-content-mobile">
        <div className="tier-image-container-mobile">
          <img src={goldImage} className="tier-image-mobile gold-tier" />
        </div>
        <div className="tier-description-container-mobile">
          <div className="tier-subtitle-mobile">Gold Sponsors: $1,500+</div>
          <ul>
            {goldBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
    silver: (
      <div className="tier-content-mobile">
        <div className="tier-image-container-mobile">
          <img src={silverImage} className="tier-image-mobile silver-tier" />
        </div>
        <div className="tier-description-container-mobile">
          <div className="tier-subtitle-mobile">
            Silver Sponsors: $1,000-$1,499
          </div>
          <ul>
            {silverBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
    bronze: (
      <div className="tier-content-mobile">
        <div className="tier-image-container-mobile">
          <img
            src={bronzeImage}
            className="tier-image-mobile bronze-tier"
          />
        </div>
        <div className="tier-description-container-mobile">
          <div className="tier-subtitle-mobile">
            Bronze Sponsors: $500-$999
          </div>
          <ul>
            {bronzeBenefits.map((item) => {
              return <li className="tier-list-item">{item}</li>;
            })}
          </ul>
        </div>
      </div>
    ),
    purple: (
      <div className="tier-content-mobile">
        <div className="tier-image-container-mobile">
          <img
            src={purpleImage}
            className="tier-image-mobile purple-tier"
          />
        </div>
        <div className="tier-description-container-mobile">
          <div className="tier-subtitle-mobile">
            Purple Sponsors: &lt;$500
          </div>
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
  const [email, setEmail] = useState(null);
  const [question, setQuestion] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    if (windowSize[0] > WINDOW_WIDTH_THRESHOLD_PX) {
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
      <hr className="sponsor-hr" />
      <h1 className="sponsorship-title">Our Sponsors</h1>
      <div className="sponsorship-caption">
        Thank you to our current sponsors for the 2025-26 year!
      </div>
      {goldLogos && goldLogos.length > 0 && (
        <div className="sponsorship-tier-company-box">
          <div className="sponsorship-tier-company-header">Gold Sponsors</div>
          <div className="sponsorship-tier-company-content gold-tier">
            {goldLogos.map((logo) => {
              return (
                <a className="sponsor-logo-container" title={logo.name} href={logo.website} target="_blank">
                  <img src={logo.image} />
                </a>
              );
            })}
          </div>
        </div>
      )}
      {silverLogos && silverLogos.length > 0 && (
        <div className="sponsorship-tier-company-box">
          <div className="sponsorship-tier-company-header">Silver Sponsors</div>
          <div className="sponsorship-tier-company-content silver-tier">
            {silverLogos.map((logo) => {
              return (
                <a className="sponsor-logo-container" title={logo.name} href={logo.website} target="_blank">
                  <img src={logo.image}/>
                </a>
              );
            })}
          </div>
        </div>
      )}
      {bronzeLogos && bronzeLogos.length > 0 && (
          <div className="sponsorship-tier-company-box">
            <div className="sponsorship-tier-company-header">Bronze Sponsors</div>
            <div className="sponsorship-tier-company-content bronze-tier">
              {bronzeLogos.map((logo) => {
                return (
                    <a className="sponsor-logo-container" title={logo.name} href={logo.website} target="_blank">
                      <img src={logo.image} />
                    </a>
                );
              })}
            </div>
          </div>
      )}
      {purpleLogos && purpleLogos.length > 0 && (
          <div className="sponsorship-tier-company-box">
            <div className="sponsorship-tier-company-header">Purple Tier</div>
            <div className="sponsorship-tier-company-content purple-tier">
              {purpleLogos.map((logo) => {
                return (
                    <a className="sponsor-logo-container" title={logo.name} href={logo.website} target="_blank">
                      <img src={logo.image} />
                    </a>
                );
              })}
            </div>
          </div>
      )}
      {mentorshipLogos && mentorshipLogos.length > 0 && (
          <div className="sponsorship-tier-company-box">
            <div className="sponsorship-tier-company-header">Mentorship Sponsors</div>
            <div className="sponsorship-tier-company-content other-tier">
              {mentorshipLogos.map((logo) => {
                return (
                    <a className="sponsor-logo-container" title={logo.name} href={logo.website} target="_blank">
                      <img src={logo.image} />
                    </a>
                );
              })}
            </div>
          </div>
      )}
      {materialLogos && materialLogos.length > 0 && (
          <div className="sponsorship-tier-company-box">
            <div className="sponsorship-tier-company-header">Material Sponsors</div>
            <div className="sponsorship-tier-company-content other-tier">
              {materialLogos.map((logo) => {
                return (
                    <a className="sponsor-logo-container" title={logo.name} href={logo.website} target="_blank">
                      <img src={logo.image} />
                    </a>
                );
              })}
            </div>
          </div>
      )}
      <hr className="sponsor-hr" />
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
