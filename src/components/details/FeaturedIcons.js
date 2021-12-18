import React from "react";
import { json, type } from "../../classes/Constants";

const FeaturedIcon = ({ item, stars, resize }) => {
  return (
    <div
      className="icon-container"
      style={{
        height: `${resize.getWidth(126)}px`,
        width: `${resize.getWidth(358)}px`,
        borderWidth: `${resize.getWidth(4)}px`,
      }}
    >
      <div
        className="icon-background"
        stars={stars}
        style={{
          height: `${resize.getWidth(106)}px`,
          width: `${resize.getWidth(106)}px`,
          marginLeft: `${resize.getWidth(5)}px`,
        }}
      >
        <div
          style={{
            backgroundImage: `url(${json.getThumb(item)})`,
          }}
          stars={stars}
        >
          <img
            src={type[json.getType(item)]}
            alt={json.getType(item)}
            style={{
              width: `${resize.getWidth(30)}px`,
            }}
            draggable="false"
          />
        </div>
      </div>
      <p
        style={{
          fontSize: `${resize.getWidth(24)}px`,
          marginTop: `${resize.getWidth(25)}px`,
          marginLeft: `${resize.getWidth(140)}px`,
        }}
      >
        {json.getName(item)}
      </p>
      <img
        src={type[json.getType(item)]}
        alt={json.getType(item)}
        style={{
          marginRight: `${resize.getWidth(-30)}px`,
          marginBottom: `${resize.getWidth(-40)}px`,
        }}
        draggable="false"
      />
    </div>
  );
};

const FeaturedIcons = ({ featured, stars, resize }) => {
  return (
    <section className="icons-section">
      {featured.map((item) => {
        return (
          <FeaturedIcon key={item} item={item} stars={stars} resize={resize} />
        );
      })}
    </section>
  );
};

export default FeaturedIcons;
