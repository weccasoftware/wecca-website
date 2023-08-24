import React from "react";

const AnnouncementContainer = ({ alignLeft, title, content, image }) => {
  return (
    <div className="announcement-container">
      {alignLeft && (
        <div className="announcement-image-container">
          <img src={image} className="announcement-image" />
        </div>
      )}
      <div className="announcement-content">
        <h3 className="announcement-title">{title}</h3>
        <div className="announcement-text">{content}</div>
      </div>
      {!alignLeft && (
        <div className="announcement-image-container">
          <img src={image} className="announcement-image" />
        </div>
      )}
    </div>
  );
};

export default AnnouncementContainer;
