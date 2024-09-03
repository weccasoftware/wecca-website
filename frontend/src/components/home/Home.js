import React, { useEffect, useState } from "react";
import "./styles/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCarousel from "./ImageCarousel";
import AnnouncementContainer from "./AnnouncementContainer";
import {
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  INSTAGRAM_LINK,
  LINKEDIN_LINK, MOBILE_WIDTH_THRESHOLD_PX,
  TEAMS_LINK,
  WINDOW_WIDTH_THRESHOLD_PX,
} from "../../config";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import comp from '../../assets/homepage/competition.jpeg'
import paddl from '../../assets/homepage/paddl.png'
import MicrosoftTeamsIcon from "./TeamsSVG";

const upcomingEvents = [
    {
      title: "Congratulations to the team on a fifth place finish at competition!",
      text: "WECCA had our best year in recent memory, finishing fifth overall at the 2024 CNCCC competiton. This included " + 
                "a second place finish in the Enhanced Focus Area and a third place finish in the Project Proposal. We are so " + 
                "proud of the team and everything that we have accomplished this year!",
      image: comp,
    },
  {
    title: "Introducing PADDL, our newest civil engineering analysis software!",
    text: "We are thrilled to announce the initial launch of PADDL - Precision Analysis & Design for Dynamic Loading." +
            " PADDL is our in house custom software solution for engineering design and analysis problems we face during the construction" +
            " of a concrete canoe. The Java-based desktop app is a candidate for our 2025 Enhanced Focus Area and we are excited for its further development" +
            " in the 2024-2025 school year.",
    image: paddl,
    downloadLinks: {
      macLink: { text: "Download PADDL Mac", ref: "https://github.com/Tyler-Liquornik/canoe-analysis/releases/download/v1.0.0-MAC/PADDL-1.0.0.dmg" },
      pcLink: { text: "Download PADDL PC", ref: "https://github.com/Tyler-Liquornik/canoe-analysis/releases/download/v1.0.0-PC/PADDL-1.0.0.msi" }
    }
  }
];

const Home = () => {
  const navigate = useNavigate()
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

  return (
      <div className="home-page">
        <div className="header-image"/>
        <div className="about-wecca-home">
          <div className="about-wecca-body">
          <span>
            The Western Engineering Concrete Canoe Association (WECCA) is a team
            of dedicated and innovative students who come together to design,
            build and race a concrete canoe each year. WECCA competes annually
            in the Canadian National Concrete Canoe Competition against over a
            dozen other Universities from across North America. Team members can
            be involved in many different aspects of the project including
            procuring an optimal concrete mix, designing the canoe’s hull
            profile, as well as casting and finishing the final product. WECCA
            provides an excellent opportunity for students to gain technical and
            teamwork skills in a welcoming and inclusive environment.
          </span>
            <span>
            Designing a canoe can be challenging, but that has never stopped us. We decided to take it up a
            notch. <br/><br/> <i>Concrete floats our boat, what floats yours?</i>
          </span>
          </div>
        </div>
        {windowSize[0] > WINDOW_WIDTH_THRESHOLD_PX && (
            <div>
              <hr className="sponsor-hr"/>
              <div className="carousel-container">
                <ImageCarousel/>
              </div>
            </div>
        )}
        <hr className="sponsor-hr"/>
        {upcomingEvents.length > 0 && (
            <div>
              <div className="announcements-section-title">Announcements</div>
              <div>
                {upcomingEvents.map((ev, index) => {
                  return (
                      <AnnouncementContainer
                          alignLeft={index % 2 === 1}
                          title={ev.title}
                          content={ev.text}
                          image={ev.image}
                          downloadLinks={ev.downloadLinks}
                          isSmallView={windowSize[0] < WINDOW_WIDTH_THRESHOLD_PX}
                      />
                  );
                })}
              </div>
            </div>
        )}
        <div
            className={windowSize[0] > MOBILE_WIDTH_THRESHOLD_PX ? "social-icon-container" : "social-icon-container-mobile"}>
          <a href={INSTAGRAM_LINK} target="_blank">
            <FontAwesomeIcon icon={faInstagram} className="social-icon"/>
          </a>
          <a href={LINKEDIN_LINK} target="_blank">
            <FontAwesomeIcon icon={faLinkedin} className="social-icon"/>
          </a>
          <a href={TEAMS_LINK} target="_blank">
            <MicrosoftTeamsIcon className="social-icon"/>
          </a>
          <div className="inline-div" onClick={() => navigate('/login')}>
            <FontAwesomeIcon icon={faUser} className="social-icon"/>
          </div>
        </div>
        {/* <hr className="sponsor-hr" />
      <div className="home-content">
        Other things this page can include:
        <ul>
          <li>Showcase of Captains?</li>
          <li>Contact Form/Link to Contact Page</li>
        </ul>
    </div>*/}
      </div>
  );
};

export default Home;
