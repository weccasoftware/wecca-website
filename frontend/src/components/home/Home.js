import React, { useState } from "react";
import './styles/Home.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageCarousel from "./ImageCarousel";

const Home = () => {
    const IMAGE_SOURCE_LIST = [
        'carousel-image-1', 'carousel-image-2'
    ]
    const [displayedImage, setDisplayedImage] = useState(IMAGE_SOURCE_LIST[0])

    const handleCarouselLeftClick = () => {
        console.log("LEFT")
        const displayedImageComponents = displayedImage.split('-');
        const currentIndex = parseInt(displayedImageComponents[displayedImageComponents.length - 1]);
        setDisplayedImage((IMAGE_SOURCE_LIST.length + currentIndex - 1) % IMAGE_SOURCE_LIST.length)
    }

    const handleCarouselRightClick = () => {
        console.log("RIGHT")
        const displayedImageComponents = displayedImage.split('-');
        const currentIndex = parseInt(displayedImageComponents[displayedImageComponents.length - 1]);
        setDisplayedImage((currentIndex + 1) % IMAGE_SOURCE_LIST.length)
    }

    return (
        <div className="home-page">
            <div className="header-image"/>
            <div className="about-wecca-home">
                <div className="about-wecca-title">Western Engineering Concrete Canoe Association</div>
                <div className="about-wecca-body">Description about WECCA...</div>
            </div>
            <hr/>
            <div className="about-wecca-home">
                <ImageCarousel/>
            </div>
            <hr/>
            <div>
                Announcements/news goes here...
            </div>
            <hr/>
            <div>
                Social media goes here...
            </div>
            <hr/>
            <div className="home-content">
                Other things this page can include:
                <ul>
                    <li>Showcase of Captains?</li>
                    <li>Contact Form/Link to Contact Page</li>
                </ul>
            </div>
        </div>
    )
}

export default Home;