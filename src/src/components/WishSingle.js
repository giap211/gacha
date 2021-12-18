import React, { useState, useEffect } from "react";
import { type, json } from "../classes/Constants";

const WishSingle = ({ currentWish, setContent, resize }) => {
  const [state, setState] = useState({
    singleWishIndex: 0,
    animating: false,
  });
  const [item, setItem] = useState(currentWish[0]);

  const nextSingle = () => {
    if (state.singleWishIndex === currentWish.length - 1) {
      setContent("main");
      return;
    }
    setState({
      ...state,
      singleWishIndex: state.singleWishIndex + 1,
      animating: false,
    });
  };

  const starPrinter = (i) => {
    return (
      <img
        className={`${state.animating ? "single-stars" : "transparent"}`}
        key={i}
        src="./assets/img/misc/star.webp"
        alt="star"
        height={`${resize.getHeight(26, 26)}`}
        width={`${resize.getWidth(26)}`}
        star={i + 1}
      />
    );
  };

  useEffect(() => {
    setItem(currentWish[state.singleWishIndex]);
  }, [currentWish, state.singleWishIndex]);

  return (
    <div
      id="overlay"
      onClick={nextSingle}
      style={{ overflow: state.animating ? "hidden" : "" }}
    >
      <div id="single-info">
        <img
          className={`${state.animating ? "single-type" : "transparent"}`}
          src={type[json.getType(item)]}
          alt={type[type[json.getType(item)]]}
          width={`${resize.getWidth(115)}`}
        />
        <div id="info-pair">
          <h1
            className={`${state.animating ? "single-name" : "transparent"}`}
            style={{
              fontSize: `${resize.getWidth(40)}px`,
            }}
          >
            {json.getName(item)}
          </h1>
          <div
            id="stars-container"
            style={{
              height: `${resize.getHeight(26, 26)}px`,
            }}
          >
            {Array(json.getStars(item))
              .fill()
              .map((e, i) => {
                return starPrinter(i);
              })}
          </div>
        </div>
      </div>
      {currentWish.map((wish, i) => {
        return (
          <div className="single-pair" key={wish + i}>
            <img
              className={`${
                i === state.singleWishIndex ? "single-pull" : "transparent"
              }
              ${json.isChar(item) ? "single-char" : "single-weapon"}`}
              src={json.getSingle(wish)}
              alt={wish}
              onAnimationEnd={() => setState({ ...state, animating: true })}
              height={`${
                json.isChar(item)
                  ? `${resize.getWidthSelected(1000, 1536)}px`
                  : json.getType(item) === "Sword"
                  ? `${resize.getHeightSelected(750, 200, 1745)}px`
                  : json.getType(item) === "Bow"
                  ? `${resize.getHeightSelected(750, 200, 1745)}px`
                  : json.getType(item) === "Claymore"
                  ? `${resize.getHeightSelected(850, 200, 1745)}px`
                  : json.getType(item) === "Polearm"
                  ? `${resize.getHeightSelected(850, 200, 1745)}px`
                  : undefined
              }`}
              width={`${
                json.getType(item) === "Catalyst"
                  ? `${resize.getWidthSelected(450, 1745)}px`
                  : undefined
              }`}
              type={json.getType(item)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WishSingle;
