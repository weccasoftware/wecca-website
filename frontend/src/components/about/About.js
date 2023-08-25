import React from "react";
import "./styles/About.css";
import { EXECUTIVES_LIST } from "../../config";

const About = () => {
  return (
    <div>
      <h1>Meet the Executives</h1>
      <ul className="exec-list">
        {EXECUTIVES_LIST.map((exec) => {
          return (
            <li>
              <img src={exec.image} className="exec-photo" />
              <div className="exec-name">{exec.name}</div>
              <div className="exec-title">{exec.title}</div>
            </li>
          );
        })}
      </ul>
      {/*
      <div>
          This page can contain information about the team, including:
          <ul>
            <li>Gallery of executives (photo, name, role)</li>
            <li>Potentially add descriptions and/or photos of each team</li>
          </ul>
        </div>
      */}
    </div>
  );
};

export default About;
