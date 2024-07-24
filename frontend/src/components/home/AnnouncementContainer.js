import React from "react";

const AnnouncementContainer = ({ alignLeft, title, content, image, downloadLinks, isSmallView}) => {

  const flexDirectionStyle = {
      flexDirection: isSmallView ? 'column' : 'row'
  } ;

  return (
    <div className="announcement-container" style = {flexDirectionStyle}>
      {(alignLeft && !isSmallView) && (
        <div className={isSmallView ? "announcement-image-container-mobile" : "announcement-image-container"}>
          <img src={image} className="announcement-image"/>
        </div>
      )}
      <div className={isSmallView ? "announcement-content-mobile" : "announcement-content"}>
        <b><span className="announcement-title">{title}</span></b>
        <div className="announcement-text">{content}</div>
          {downloadLinks && (
              <>
                  <div className="announcement-download-links">
                      <b><a href={downloadLinks.macLink.ref} target="_blank">{downloadLinks.macLink.text}</a></b>
                      <b><a href={downloadLinks.pcLink.ref} target="_blank">{downloadLinks.pcLink.text}</a></b>
                  </div>
                  {!isSmallView && (
                      <i>
                          <span className="announcement-hint-text">
                          A note for Mac users: After you try and open PADDL for the first time,
                          you need to go to Settings > Privacy & Security.
                          You’ll see a message saying the app is from a third party developer. Click “Open Anyway”.
                          </span>
                      </i>
                    )
                  }
              </>
          )}
      </div>
        {(isSmallView || !alignLeft) && (
            <div className={isSmallView ? "announcement-image-container-mobile" : "announcement-image-container"}>
                <img src={image} className="announcement-image"/>
            </div>
        )}
    </div>
  );
};

export default AnnouncementContainer;
