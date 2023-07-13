import React from "react";
import './styles/Home.css'

const Home = () => {
    return (
        <div className="home-page">
            <div className="header-image"/>
            <div className="about-wecca-home">
                <div className="about-wecca-title">Western Engineering Concrete Canoe Association</div>
                <div className="about-wecca-body">Description about WECCA...</div>
            </div>
            <hr/>
            <div>
                Image carousel goes here...
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