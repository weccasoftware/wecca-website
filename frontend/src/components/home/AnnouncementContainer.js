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
                            To run PADDL, you’ll need to give your computer permission to run a third party app.
                              <br/>
                            On macOS: After you try and open PADDL for the first time, you'll need to go to Settings > Privacy & Security.
                            Scroll down and click “Open Anyway”.
                              <br/>
                            On PC: When opening the PADDL installer, you’ll see the “Windows protected your PC” dialog. Click “More info”, and then “Run anyway”.
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
