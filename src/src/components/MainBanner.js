import React, { useState } from "react";
import { allBannersAbbr } from "../classes/Constants";
import Carousel from "./Carousel/Carousel";
import CarouselItem from "./Carousel/CarouselItem";
import parseJSON from "../classes/parseJSON";

const json = new parseJSON();

const MainBanner = ({
  props,
  setProps,
  banners,
  setActive,
  prevBanner,
  activeIndex,
  direction,
  resize,
}) => {
  const next = (banners) => {
    if (props.animating) return;
    const nextIndex = activeIndex === banners.length - 1 ? 0 : activeIndex + 1;
    setActive(nextIndex);
  };

  const previous = (banners) => {
    if (props.animating) return;
    const nextIndex = activeIndex === 0 ? banners.length - 1 : activeIndex - 1;
    setActive(nextIndex);
  };

  const SWIPE_THRESHOLD = 40;

  const [touchPos, setTouchPos] = useState({ touchStartX: 0, touchStartY: 0 });

  const handleTouchStart = (e) => {
    setTouchPos({
      ...touchPos,
      touchStartX: e.changedTouches[0].screenX,
      touchStartY: e.changedTouches[0].screenY,
    });
  };

  const handleTouchEnd = (e) => {
    const currentX = e.changedTouches[0].screenX;
    const currentY = e.changedTouches[0].screenY;
    const diffX = Math.abs(touchPos.touchStartX - currentX);
    const diffY = Math.abs(touchPos.touchStartY - currentY);

    // Don't swipe if Y-movement is bigger than X-movement
    if (diffX < diffY) {
      return;
    }

    if (diffX < SWIPE_THRESHOLD) {
      return;
    }

    if (currentX < touchPos.touchStartX) {
      next(banners);
    } else {
      previous(banners);
    }
  };

  const slides = allBannersAbbr.map((banner) => {
    return (
      <CarouselItem
        onExiting={() => setProps({ ...props, animating: true })}
        onExited={() => setProps({ ...props, animating: false })}
        key={banner}
      >
        <img
          className={`main-banner`}
          height={`${resize.getHeight(570, 1100)}`}
          src={
            banners.includes(banner) || banner === prevBanner
              ? json.getMain(banner)
              : undefined
          }
          alt={banner}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
      </CarouselItem>
    );
  });

  const arrows = (prev) => {
    return (
      <div
        id={`carousel-control-${prev ? "prev" : "next"}`}
        style={{
          transform: `${prev ? "rotate(180deg)" : ""}`,
          backgroundImage: "url(./assets/img/misc/arrow.webp)",
          height: `${resize.getHeight(44, 32)}px`,
          width: `${resize.getWidth(32)}px`,
          backgroundSize: `${resize.getWidth(32)}px ${resize.getHeight(
            44,
            32
          )}px`,
        }}
        onClick={() => (prev ? previous(banners) : next(banners))}
      />
    );
  };

  return (
    <section id="main-banner-section">
      {arrows(true)}
      <Carousel
        activeIndex={allBannersAbbr.indexOf(banners[activeIndex])}
        next={next}
        previous={previous}
        direction={direction}
        interval={false}
      >
        {slides}
      </Carousel>
      {arrows(false)}
    </section>
  );
};

export default MainBanner;
