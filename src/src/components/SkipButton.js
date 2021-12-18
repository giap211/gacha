import React from "react";

const SkipButton = ({ state, setState, content, setContent, resize }) => {
  return (
    <div
      id="skip-button"
      style={{
        height: `${resize.getHeight(55, 55)}px`,
        width: `${resize.getWidth(55)}px`,
        top: `${resize.getWidth(50)}px`,
        right: `${resize.getWidth(50)}px`,
      }}
    >
      <div
        id="skip-button-crosses"
        style={{
          height: `${resize.getHeight(55, 55)}px`,
          width: `${resize.getWidth(55)}px`,
          backgroundImage: "url(./assets/img/misc/close.webp)",
          backgroundSize: `${resize.getWidth(28)}px ${resize.getHeight(
            28,
            28
          )}px`,
        }}
        onClick={() => {
          setState({ ...state, animating: false });
          content === "video"
            ? state.skipSingle
              ? setContent("main")
              : setContent("single")
            : setContent("main");
        }}
      />
    </div>
  );
};

export default SkipButton;
