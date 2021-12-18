import React, { useState, useEffect } from "react";
import { allChars, json, type } from "../../classes/Constants";

const WishSingle = ({ currentWish, setContent, resize }) => {
  console.log(currentWish);

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
        draggable="false"
      />
    );
  };

  useEffect(() => {
    setItem(currentWish[state.singleWishIndex]);
  }, [currentWish, state.singleWishIndex]);

  return (
    <div
      className="overlay"
      onClick={nextSingle}
      style={{
        overflow: state.animating ? "hidden" : "",
        backgroundColor: "rgba(38, 37, 49, 0.9)",
      }}
    >
      <div id={`${state.animating ? "single-info" : ""}`}>
        <img
          className={`${state.animating ? "single-type" : "transparent"}`}
          src={type[json.getType(item)]}
          alt={type[type[json.getType(item)]]}
          width={`${resize.getWidth(115)}`}
          draggable="false"
        />
        <div id="info-pair">
          <h1
            className={`${state.animating ? "single-name" : "transparent"}`}
            style={{
              fontSize:
                resize.windowWidth <= 425
                  ? undefined
                  : `${resize.getWidth(40)}px`,
              textShadow: "1px 0 5px black",
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
              ${allChars.includes(item) ? "single-char" : "single-weapon"}`}
              src={json.getSingle(wish)}
              alt={wish}
              onAnimationEnd={() => setState({ ...state, animating: true })}
              height={`${
                allChars.includes(item)
                  ? `${resize.getWidth(1000)}px`
                  : json.getType(item) === "Sword"
                  ? `${resize.getHeight(750, 200)}px`
                  : json.getType(item) === "Bow"
                  ? `${resize.getHeight(750, 200)}px`
                  : json.getType(item) === "Claymore"
                  ? `${resize.getHeight(850, 200)}px`
                  : json.getType(item) === "Polearm"
                  ? `${resize.getHeight(850, 200)}px`
                  : undefined
              }`}
              width={`${
                json.getType(item) === "Catalyst"
                  ? `${resize.getWidth(450)}px`
                  : undefined
              }`}
              type={json.getType(item)}
              draggable="false"
            />
          </div>
        );
      })}
    </div>
  );
};

export default WishSingle;
