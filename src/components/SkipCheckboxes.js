import React from "react";

const SkipCheckboxes = ({
  skipVideo,
  setSkipVideo,
  skipSingle,
  setSkipSingle,
}) => {
  return (
    <section id="checkbox-container">
      <div className="checkbox">
        <input
          type="checkbox"
          id="skip-video"
          checked={skipVideo}
          onChange={() => setSkipVideo(!skipVideo)}
        />
        <label htmlFor="skip-video" style={{ margin: "0.4rem" }}>
          Skip Video
        </label>
      </div>
      <div className="checkbox">
        <input
          type="checkbox"
          id="skip-single"
          checked={skipSingle}
          onChange={() => setSkipSingle(!skipSingle)}
        />
        <label htmlFor="skip-single" style={{ margin: "0.4rem" }}>
          Skip Single Items
        </label>
      </div>
    </section>
  );
};

export default SkipCheckboxes;
