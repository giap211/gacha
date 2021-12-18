import React from "react";

const SkipCheckboxes = ({ props, setState }) => {
  return (
    <div id="checkbox-container">
      <div className="checkbox">
        <input
          type="checkbox"
          id="skip-video"
          checked={props.skipVideo}
          onChange={() => setState({ ...props, skipVideo: !props.skipVideo })}
        />
        <label htmlFor="skip-video">Skip Video</label>
      </div>
      <div className="checkbox">
        <input
          type="checkbox"
          id="skip-single"
          checked={props.skipSingle}
          onChange={() => setState({ ...props, skipSingle: !props.skipSingle })}
        />
        <label htmlFor="skip-single">Skip Single Items</label>
      </div>
    </div>
  );
};

export default SkipCheckboxes;
