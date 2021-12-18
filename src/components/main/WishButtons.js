import React from "react";

const WishButtons = ({ onWish, activeIndex, resize }) => {
  return (
    <div
      className="wish-buttons"
      style={{ width: `${resize.getWidth(293) * 2 + resize.getWidth(15)}px` }}
    >
      <img
        onClick={() => onWish(1)}
        src={
          activeIndex === 2
            ? "./assets/img/misc/acq_1.webp"
            : "./assets/img/misc/int_1.webp"
        }
        alt={
          activeIndex === 2
            ? "./assets/img/misc/acq_10.webp"
            : "./assets/img/misc/int_10.webp"
        }
        height={`${resize.getHeight(75, 293)}px`}
        width={`${resize.getWidth(293)}px`}
        style={{
          marginRight: `${resize.getWidth(15)}px`,
        }}
        draggable="false"
      />
      <img
        onClick={() => onWish(10)}
        src={
          activeIndex === 2
            ? "./assets/img/misc/acq_10.webp"
            : "./assets/img/misc/int_10.webp"
        }
        alt={
          activeIndex === 2
            ? "./assets/img/misc/acq_10.webp"
            : "./assets/img/misc/int_10.webp"
        }
        height={`${resize.getHeight(75, 293)}px`}
        width={`${resize.getWidth(293)}px`}
        draggable="false"
      />
    </div>
  );
};

export default WishButtons;
