import React, { useState } from "react";
import { allBannersAbbr, json } from "../classes/Constants";
import { Dropdown, DropdownToggle, DropdownMenu, Tooltip } from "reactstrap";

const MiniTooltip = ({
  miniBanner,
  index,
  onSelect,
  dropOpen,
  animating,
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

  return (
    <>
      <img
        src={dropOpen ? json.getMini(miniBanner) : ""}
        alt={miniBanner + "-mini-banner"}
        id={`mini-${index}`}
        onClick={() => (!animating ? onSelect(miniBanner) : undefined)}
        // height={`${resize.getHeight(88, 175)}`}
        // width={`${resize.getWidth(175)}`}
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
        {json.getTitle(miniBanner)}
      </Tooltip>
    </>
  );
};
const DropdownBanner = ({ changeBanner, bannersActive, animating, resize }) => {
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
          className="custom-drop"
          style={{
            height: `${resize.getHeight(30, 120)}px`,
            width: `${resize.getWidth(120)}px`,
            fontSize: `${resize.getWidth(14)}px`,
            lineHeight: `${resize.getWidth(27)}px`,
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
              return !banner.includes("_ei") && !bannersActive.includes(banner);
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
