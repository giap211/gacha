import React from "react";
import { json } from "../../classes/Constants";

const MiniBanners = ({ bannersActive, setActive, activeIndex, resize }) => {
  const selected = (index) =>
    bannersActive.indexOf(bannersActive[activeIndex]) === index;

  const minis = bannersActive.map((banner, index) => {
    return (
      <img
        key={index}
        className={`${
          selected(index) ? "mini-banner selected" : "mini-banner"
        }`}
        src={
          selected(index) ? json.getMiniActive(banner) : json.getMini(banner)
        }
        alt={
          selected(index) ? json.getMiniActive(banner) : json.getMini(banner)
        }
        height={`${resize.getHeight(95, 188)}`}
        width={`${resize.getWidth(188)}`}
        onClick={() => setActive(index)}
        draggable="false"
      />
    );
  });

  return (
    <div id="mini-banners" style={{ width: `${resize.getWidth(700)}px` }}>
      {minis}
    </div>
  );
};

export default MiniBanners;
