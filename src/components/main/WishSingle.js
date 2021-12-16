import React, { useState, useEffect } from "react";
import { allChars } from "../../classes/Constants";

const WishSingle = ({
  currentWish,
  setContent,
  charData,
  weaponData,
  typeData,
  resize,
}) => {
  const [state, setState] = useState({
    singleWishIndex: 0,
    animating: false,
  });

  const getStars = (item) => {
    let stars = "";
    allChars.includes(item)
      ? charData.map((datum) => {
          if (item === datum._id) stars = datum.rarity;
          return datum;
        })
      : weaponData.map((datum) => {
          if (item === datum._id) stars = datum.rarity;
          return datum;
        });
    return stars;
  };

  const getName = (item) => {
    let name = "";
    allChars.includes(item)
      ? charData.map((datum) => {
          if (item === datum._id) name = datum.name;
          return datum;
        })
      : weaponData.map((datum) => {
          if (item === datum._id) name = datum.name;
          return datum;
        });
    return name;
  };

  const getSingle = (item) => {
    let single = "";
    allChars.includes(item)
      ? charData.map((datum) => {
          if (item === datum._id) single = datum.gachaSingle;
          return datum;
        })
      : weaponData.map((datum) => {
          if (item === datum._id) single = datum.gachaSingle;
          return datum;
        });
    return single;
  };

  const getTypeLocation = (item) => {
    let typeId = "";
    allChars.includes(item)
      ? charData.map((datum) => {
          if (item === datum._id) typeId = datum.vision;
          return datum;
        })
      : weaponData.map((datum) => {
          if (item === datum._id) typeId = datum.type;
          return datum;
        });

    let typeLocation = "";
    typeData.map((datum) => {
      if (typeId === datum._id) typeLocation = datum.location;
      return datum;
    });
    return typeLocation;
  };

  const getType = (item) => {
    let typeId = "";
    allChars.includes(item)
      ? charData.map((datum) => {
          if (item === datum._id) typeId = datum.vision;
          return datum;
        })
      : weaponData.map((datum) => {
          if (item === datum._id) typeId = datum.type;
          return datum;
        });
    let type = "";
    typeData.map((datum) => {
      if (typeId === datum._id) type = datum.type;
      return datum;
    });
    return type;
  };

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
          src={getTypeLocation(item)}
          alt={getType(item)}
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
            {getName(item)}
          </h1>
          <div
            id="stars-container"
            style={{
              height: `${resize.getHeight(26, 26)}px`,
            }}
          >
            {Array(getStars(item))
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
              src={getSingle(wish)}
              alt={wish}
              onAnimationEnd={() => setState({ ...state, animating: true })}
              height={`${
                allChars.includes(item)
                  ? `${resize.getWidth(1000)}px`
                  : getType(item) === "Sword"
                  ? `${resize.getHeight(750, 200)}px`
                  : getType(item) === "Bow"
                  ? `${resize.getHeight(750, 200)}px`
                  : getType(item) === "Claymore"
                  ? `${resize.getHeight(850, 200)}px`
                  : getType(item) === "Polearm"
                  ? `${resize.getHeight(850, 200)}px`
                  : undefined
              }`}
              width={`${
                getType(item) === "Catalyst"
                  ? `${resize.getWidth(450)}px`
                  : undefined
              }`}
              type={getType(item)}
              draggable="false"
            />
          </div>
        );
      })}
    </div>
  );
};

export default WishSingle;
