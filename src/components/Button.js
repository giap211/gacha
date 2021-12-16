import React from "react";

const Button = ({
  onClick,
  context,
  resize,
  size = {
    height: `${resize.getHeight(40, 150)}px`,
    width: `${resize.getWidth(150)}px`,
    lineHeight: `${resize.getWidth(37)}px`,
  },
}) => {
  return (
    <div
      className="custom-button"
      style={Object.assign(size, {
        fontSize: `${resize.getWidth(18)}px`,
      })}
      onClick={onClick ? onClick : undefined}
    >
      {context}
    </div>
  );
};

export default Button;
