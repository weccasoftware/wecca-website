import React, { useEffect, useState } from "react";
import "./styles/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageCarousel from "./ImageCarousel";
import AnnouncementContainer from "./AnnouncementContainer";
import {
  faInstagram,
  faSlack,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  INSTAGRAM_LINK,
  LINKEDIN_LINK,
  SLACK_LINK,
  WINDOW_SIZE_THRESHOLD_PX,
} from "../../config";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const upcomingEvents = [
  /*{
        title: "Come to our first meeting!",
        text: "WECCA will be having its first meeting of the year at 4:30 pm on Tuesday, September 12th (room TBD)." + 
                " Everyone is welcome, and you will have the chance to meet the executives and learn more about the club." + 
                " If you have any questions before then, feel free to contact us via our contact form.",
        image: temp1
    },*/
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
      <div className="header-image" />
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
            The most recent national competition in May 2023 was held at Western
            University in London, Ontario. As the host team, WECCA finished in
            the top half of the standings, proudly earning the competition’s
            Most Improved Team award.
          </span>
          <span>
            Designing a canoe can be challenging. We decided to take it up a
            notch. <i>Concrete floats our boat, what floats yours?</i>
          </span>
        </div>
      </div>
      {windowSize[0] > WINDOW_SIZE_THRESHOLD_PX && (
        <div>
          <hr className="sponsor-hr" />
          <div className="carousel-container">
            <ImageCarousel />
          </div>
          <hr className="sponsor-hr" />
        </div>
      )}
      {upcomingEvents.length > 0 && (
        <div>
          <h1>Announcements</h1>
          <div>
            {upcomingEvents.map((ev, index) => {
              return (
                <AnnouncementContainer
                  alignLeft={index % 2 === 1}
                  title={ev.title}
                  content={ev.text}
                  image={ev.image}
                />
              );
            })}
          </div>
        </div>
      )}
      <div className="social-icon-container">
        <a href={INSTAGRAM_LINK} target="_blank">
          <FontAwesomeIcon icon={faInstagram} className="social-icon" />
        </a>
        <a href={LINKEDIN_LINK} target="_blank">
          <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
        </a>
        <a href={SLACK_LINK} target="_blank">
          <FontAwesomeIcon icon={faSlack} className="social-icon" />
        </a>
        <div className="inline-div" onClick={() => navigate('/login')}>
          <FontAwesomeIcon icon={faUser} className="social-icon" />
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
