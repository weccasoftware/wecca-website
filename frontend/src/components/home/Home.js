import React, { useEffect, useState } from "react";
import "./styles/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageCarousel from "./ImageCarousel";
import AnnouncementContainer from "./AnnouncementContainer";
import temp1 from '../../assets/homepage/temp-1.jpg';
import temp2 from '../../assets/homepage/temp-2.jpg';
import {faInstagram, faSlack, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { WINDOW_SIZE_THRESHOLD_PX } from "../../config";

const upcomingEvents = [
    {
        title: "Come meet us at our introductory meeting",
        text: "WECCA will be having its first meeting of the year at 4:30 pm on Tuesday, September 12th (room TBD)." + 
                " Everyone is welcome, and you will have the chance to meet the executives and learn more about the club." + 
                " If you have any questions before then, feel free to contact us via our contact form.",
        image: temp1
    },
    {
        title: "Join us for WRECCA on September 16th",
        text: "WRECCA is an annual event where WECCA members have the chance to help " + 
                "destroy our canoe from the previous year. This will be taking place on " + 
                "Saturday, September 16th at 12:00 pm behind ACEB. Everyone is welcome to come " +
                "out and help us destroy The Argo!",
        image: temp2
    }
]

const Home = () => {
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
          Western Engineering Concrete Canoe Association (WECCA) is group of very dedicated students who work to design, build, and race a concrete canoe. 
          Each year, WECCA competes at the Canadian National Concrete Canoe Competition (CNCCC) against both Canadian and International Schools.
        </div>
      </div>
      {windowSize[0] > WINDOW_SIZE_THRESHOLD_PX && <div>
        <hr className="sponsor-hr" />
        <div className="carousel-container">
          <ImageCarousel />
        </div>
        <hr className="sponsor-hr" />
      </div>}
      <h1>Announcements</h1>
      <div>
        {
            upcomingEvents.map((ev, index) => {
                return <AnnouncementContainer 
                    alignLeft={index % 2 === 1}
                    title={ev.title}
                    content={ev.text}
                    image={ev.image} />
            })
        }
      </div>
      <div className="social-icon-container">
        <a href="https://www.instagram.com/wecca.uwo/" target="_blank">
            <FontAwesomeIcon icon={faInstagram} className='social-icon'/>
        </a>
        <a href="https://www.linkedin.com/company/western-engineering-concrete-canoe-association/" target="_blank">
            <FontAwesomeIcon icon={faLinkedin} className='social-icon'/>
        </a>
        <a href="https://join.slack.com/t/wecca2023-24/shared_invite/zt-21o0f5jn9-al9lZLzSOjTrxhflOeR3eQ" target="_blank">
            <FontAwesomeIcon icon={faSlack} className='social-icon'/>
        </a>
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
