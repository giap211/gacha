import React from "react";

const MiniBanners = ({
  bannersActive,
  setActive,
  activeIndex,
  bannerData,
  resize,
}) => {
  const selected = (index) =>
    bannersActive.indexOf(bannersActive[activeIndex]) === index;

  const getMini = (banner) => {
    let miniBanner = "";
    bannerData.map((datum) => {
      if (banner === datum._id) miniBanner = datum.miniBanner;
      return datum;
    });
    return miniBanner;
  };

  const getMiniActive = (banner) => {
    let miniActive = "";
    bannerData.map((datum) => {
      if (banner === datum._id) miniActive = datum.miniActive;
      return datum;
    });
    return miniActive;
  };

  const minis = bannersActive.map((banner, index) => {
    return (
      <img
        key={index}
        className={`${
          selected(index) ? "mini-banner selected" : "mini-banner"
        }`}
        src={selected(index) ? getMiniActive(banner) : getMini(banner)}
        alt={selected(index) ? getMiniActive(banner) : getMini(banner)}
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
