import React, { useState } from "react";
import { allBannersAbbr } from "../../classes/Constants";
import { Dropdown, DropdownToggle, DropdownMenu, Tooltip } from "reactstrap";

const MiniTooltip = ({
  miniBanner,
  index,
  onSelect,
  dropOpen,
  animating,
  bannerData,
  resize,
}) => {
  const [toolTip, setToolTip] = useState({});

  const toggle = (targetName) => {
    if (!toolTip[targetName]) {
      setToolTip({
        ...toolTip,
        [targetName]: {
          tooltipOpen: true,
        },
      });
    } else {
      setToolTip({
        ...toolTip,
        [targetName]: {
          tooltipOpen: !toolTip[targetName].tooltipOpen,
        },
      });
    }
  };

  const isToolTipOpen = (targetName) => {
    return toolTip[targetName] ? toolTip[targetName].tooltipOpen : false;
  };

  const getMini = (banner) => {
    let miniBanner = "";
    bannerData.map((datum) => {
      if (banner === datum._id) miniBanner = datum.miniBanner;
      return datum;
    });
    return miniBanner;
  };

  const getTitle = (banner) => {
    let title = "";
    bannerData.map((datum) => {
      if (banner === datum._id) title = datum.title;
      return datum;
    });
    return title;
  };

  return (
    <>
      <img
        src={dropOpen ? getMini(miniBanner) : ""}
        alt={miniBanner}
        id={`mini-${index}`}
        onClick={() => (!animating ? onSelect(miniBanner) : undefined)}
        // height={`${resize.getHeight(88, 175)}`}
        // width={`${resize.getWidth(175)}`}
        draggable="false"
      />
      <Tooltip
        placement="right"
        isOpen={isToolTipOpen(`mini-${index}`)}
        target={`mini-${index}`}
        toggle={() => toggle(`mini-${index}`)}
        style={{
          backgroundColor: "#282c34",
          color: "antiquewhite",
        }}
      >
        {getTitle(miniBanner)}
      </Tooltip>
    </>
  );
};
const DropdownBanner = ({
  changeBanner,
  bannersActive,
  animating,
  bannerData,
  resize,
}) => {
  const [dropOpen, setDropOpen] = useState(false);

  const toggleDrop = (miniBanner) => {
    if (miniBanner) changeBanner(miniBanner);
    setDropOpen((prevState) => !prevState);
  };

  return (
    <div
      className="drop-down"
      style={{
        width: `${resize.getWidth(270)}px`,
      }}
    >
      <Dropdown isOpen={dropOpen} toggle={() => toggleDrop(null)} size="sm">
        <DropdownToggle
          tag="div"
          data-toggle="dropdown"
          aria-expanded={dropOpen}
          className="custom-button"
          style={{
            height: `${resize.getHeight(40, 150)}px`,
            width: `${resize.getWidth(150)}px`,
            fontSize: `${resize.getWidth(18)}px`,
            lineHeight: `${resize.getWidth(36)}px`,
          }}
        >
          Theme
        </DropdownToggle>
        <DropdownMenu
          style={{
            backgroundColor: "rgba(50, 50, 50, 0.5)",
          }}
        >
          {allBannersAbbr
            .filter((banner) => {
              return (
                allBannersAbbr.indexOf(banner) % 2 === 0 &&
                !bannersActive.includes(banner)
              );
            })
            .map((miniBanner, index) => {
              return (
                <MiniTooltip
                  key={index}
                  miniBanner={miniBanner}
                  index={index}
                  onSelect={toggleDrop}
                  bannersActive={bannersActive}
                  dropOpen={dropOpen}
                  animating={animating}
                  bannerData={bannerData}
                  resize={resize}
                />
              );
            })}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default DropdownBanner;
