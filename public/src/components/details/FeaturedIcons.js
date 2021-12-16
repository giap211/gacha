import React from "react";
import { allChars } from "../../classes/Constants";

const FeaturedIcon = ({
  item,
  charData,
  weaponData,
  typeData,
  stars,
  resize,
}) => {
  const getThumb = (item) => {
    let thumb = "";
    allChars.includes(item)
      ? charData.map((datum) => {
          if (item === datum._id) thumb = datum.thumb;
          return datum;
        })
      : weaponData.map((datum) => {
          if (item === datum._id) thumb = datum.thumb;
          return datum;
        });
    return thumb;
  };

  const getTypeIcon = (item) => {
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
    let typeIcon = "";
    typeData.map((datum) => {
      if (typeId === datum._id) typeIcon = datum.location;
      return datum;
    });
    return typeIcon;
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
            backgroundImage: `url(${getThumb(item)})`,
          }}
          stars={stars}
        >
          <img
            src={getTypeIcon(item)}
            alt={getTypeIcon(item)}
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
        {getName(item)}
      </p>
      <img
        src={getTypeIcon(item)}
        alt={getTypeIcon(item)}
        style={{
          marginRight: `${resize.getWidth(-30)}px`,
          marginBottom: `${resize.getWidth(-40)}px`,
        }}
        draggable="false"
      />
    </div>
  );
};

const FeaturedIcons = ({
  featured,
  charData,
  weaponData,
  typeData,
  stars,
  resize,
}) => {
  return (
    <section className="icons-section">
      {featured.map((item) => {
        return (
          <FeaturedIcon
            key={item}
            item={item}
            charData={charData}
            weaponData={weaponData}
            typeData={typeData}
            stars={stars}
            resize={resize}
          />
        );
      })}
    </section>
  );
};

export default FeaturedIcons;
