import React from "react";

const WishButtons = ({ onWish, activeIndex, resize }) => {
  return (
    <div className="wish-buttons">
      <img
        src={
          activeIndex === 2
            ? "./assets/img/misc/acq_1.webp"
            : "./assets/img/misc/int_1.webp"
        }
        alt={
          activeIndex === 2
            ? "./assets/img/misc/acq_1.webp"
            : "./assets/img/misc/int_1.webp"
        }
        onClick={() => onWish(1)}
        height={`${resize.getHeight(75, 293)}`}
        width={`${resize.getWidth(293)}`}
        style={{
          marginRight: `${resize.getWidth(15)}px`,
        }}
      />
      <img
        src={
          activeIndex === 2
            ? "./assets/img/misc/acq_10.webp"
            : "./assets/img/misc/int_10.webp"
        }
        alt={
          activeIndex === 2
            ? "./assets/img/misc/acq_1.webp"
            : "./assets/img/misc/int_1.webp"
        }
        onClick={() => onWish(10)}
        height={`${resize.getHeight(75, 293)}`}
        width={`${resize.getWidth(293)}`}
      />
    </div>
  );
};

export default WishButtons;
