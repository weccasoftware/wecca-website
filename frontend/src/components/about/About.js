import React, { useEffect, useState } from "react";
import "./styles/About.css";
import { EXECUTIVES_LIST, TEAM_INFO } from "../../config";
import SubteamInfo from "./SubteamInfo";

const About = () => {
  const [execsList, setExecsList] = useState(EXECUTIVES_LIST);
  const [teamsList, setTeamsList] = useState(TEAM_INFO);

  return (
    <div className="about-page">
      <h1>Meet the Executives</h1>
      {teamsList.map((subteam) => {
        return (
          <SubteamInfo team={subteam} />
        )
      })}
      <ul className="exec-list">
        {execsList.map((exec) => {
          return (
            <li>
              <img src={exec.image} className="exec-photo" />
              <div className="exec-name">{exec.name}</div>
              <div className="exec-title">{exec.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default About;
