import React from "react";
import './styles/About.css'
import image1 from '../../assets/ethan-exec.jpeg'

const About = () => {
    return (
        <div>
            <h2>About</h2>
            <div>
                This page can contain information about the team, including:
                <ul>
                    <li>Gallery of executives (photo, name, role)</li>
                    <li>Potentially add descriptions and/or photos of each team</li>
                </ul>
            </div>
            <ul className="exec-list">
                <li>
                    <img src={image1} className="exec-photo" />
                    <div className="exec-name">Name</div>
                    <div className="exec-title">Title</div>
                </li>
                <li>
                    <img src={image1} className="exec-photo" />
                    <div className="exec-name">Name</div>
                    <div className="exec-title">Title</div>
                </li>
                <li>
                    <img src={image1} className="exec-photo" />
                    <div className="exec-name">Name</div>
                    <div className="exec-title">Title</div>
                </li>
                <li>
                    <img src={image1} className="exec-photo" />
                    <div className="exec-name">Name</div>
                    <div className="exec-title">Title</div>
                </li>
            </ul>
        </div>
    )
}

export default About;