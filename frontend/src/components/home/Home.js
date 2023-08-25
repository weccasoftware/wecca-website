import React, { useState } from "react";
import "./styles/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageCarousel from "./ImageCarousel";
import AnnouncementContainer from "./AnnouncementContainer";
import testImage from '../../assets/alt-sponsors-photo.jpg';
import {faInstagram, faSlack, faLinkedin} from '@fortawesome/free-brands-svg-icons'

const upcomingEvents = [
    {
        title: "Come to Our Introductory Meeting",
        text: "WECCA will be having its first meeting of the year at [TIME] " + 
                "in [LOCATION], where members will have the chance to meet " + 
                "the executives and learn more about the club. If you have any " + 
                "questions before then, feel free to contact us via our contact form.",
        image: testImage
    },
    {
        title: "Join us for WRECCA on [DATE]",
        text: "WRECCA is an annual event where WECCA members have the chance to help " + 
                "destroy our canoe from the previous year. This will be taking place on " + 
                "[TIME] at [LOCATION]. [Write something else here].",
        image: testImage
    }
]

const Home = () => {
  const IMAGE_SOURCE_LIST = ["carousel-image-1", "carousel-image-2"];
  const [displayedImage, setDisplayedImage] = useState(IMAGE_SOURCE_LIST[0]);

  const handleCarouselLeftClick = () => {
    console.log("LEFT");
    const displayedImageComponents = displayedImage.split("-");
    const currentIndex = parseInt(
      displayedImageComponents[displayedImageComponents.length - 1]
    );
    setDisplayedImage(
      (IMAGE_SOURCE_LIST.length + currentIndex - 1) % IMAGE_SOURCE_LIST.length
    );
  };

  const handleCarouselRightClick = () => {
    console.log("RIGHT");
    const displayedImageComponents = displayedImage.split("-");
    const currentIndex = parseInt(
      displayedImageComponents[displayedImageComponents.length - 1]
    );
    setDisplayedImage((currentIndex + 1) % IMAGE_SOURCE_LIST.length);
  };

  return (
    <div className="home-page">
      <div className="header-image" />
      <div className="about-wecca-home">
        <h1 className="about-wecca-title">
          Western Engineering Concrete Canoe Association
        </h1>
        <div className="about-wecca-body">
          [SAMPLE] Western Engineering Concrete Canoe Association (WECCA) is group of very dedicated students who work to design, build, and race a concrete canoe. 
          Each year, WECCA competes at the Canadian National Concrete Canoe Competition (CNCCC) against both Canadian and International Schools.
        </div>
      </div>
      <hr className="sponsor-hr" />
      <div className="carousel-container">
        <ImageCarousel />
      </div>
      <hr className="sponsor-hr" />
      <h2>Announcements</h2>
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
