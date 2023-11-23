import React from "react";
import "./styles/About.css";

const SubteamInfo = ({ team }) => {
  return (
    <div className="team-container">
      <div className="team-container-left">
        <img src={team.image} className="team-container-image"/>
      </div>
      <div className="team-container-right">
        <div className="team-container-header">{team.name}</div>
        <div className="team-container-text">{team.description}</div>
      </div>
    </div>
  );
};

export default SubteamInfo;
