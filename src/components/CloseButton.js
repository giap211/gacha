import React from "react";

const CloseButton = ({ type, onClick, style, resize }) => {
  return (
    <div
      id="close-button"
      style={Object.assign(style, {
        height:
          resize.windowWidth <= 425 ? undefined : `${resize.getWidth(55)}px`,
        width:
          resize.windowWidth <= 425 ? undefined : `${resize.getWidth(55)}px`,
      })}
    >
      <div
        id="close-button-type"
        style={{
          backgroundImage: `url(${
            type === "close"
              ? "../assets/img/misc/close.webp"
              : "../assets/img/misc/return.webp"
          })`,
          backgroundSize:
            resize.windowWidth <= 425
              ? undefined
              : `${resize.getWidth(28)}px ${resize.getWidth(28)}px`,
        }}
        onClick={onClick}
      />
    </div>
  );
};

export default CloseButton;
