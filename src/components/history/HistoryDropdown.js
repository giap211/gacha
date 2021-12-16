import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

const HistoryDropdown = ({
  selectedIndex,
  setSelectedIndex,
  setPagIndex,
  history,
  MAX_PAG,
  resize,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleWishType = (index) => {
    setSelectedIndex(index);
    setPagIndex(
      history[index].length === 0
        ? 1
        : Math.ceil(history[index].length / MAX_PAG)
    );
    toggle();
  };

  const bannerType = () => {
    switch (selectedIndex) {
      case 1:
        return "Weapon Event Wish";
      case 2:
        return "Permanent Wish";
      default:
        return "Character Event Wish";
    }
  };

  const fontSize =
    resize.windowWidth < 425 ? {} : { fontSize: `${resize.getWidth(16)}px` };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle
        caret
        style={Object.assign(fontSize, {
          color: "rgb(117, 117, 117)",
          textShadow: "none",
          backgroundColor: "rgb(219, 215, 211)",
        })}
      >
        {bannerType()}
      </DropdownToggle>
      <DropdownMenu
        style={{
          backgroundColor: "rgb(219, 215, 211)",
        }}
      >
        <div className="history-wish" onClick={() => handleWishType(0)}>
          Character Event Wish
        </div>
        <div className="history-wish" onClick={() => handleWishType(1)}>
          Weapon Event Wish
        </div>
        <div className="history-wish" onClick={() => handleWishType(2)}>
          Permanent Wish
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default HistoryDropdown;
