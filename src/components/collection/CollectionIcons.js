import React, { useState, useEffect } from "react";
import { allChars, json, type } from "../../classes/Constants";

export default function CollectionIcons({
  activeFilters,
  activeItem,
  loading,
  setActiveItem,
  setAnimating,
  stash,
  setStash,
  sortOrder,
  searchItem,
  resize,
}) {
  const sortRarity = (a, b) => {
    let bVal = json.getStars(b.itemId) * 10;
    if (allChars.includes(b.itemId)) bVal++;
    let aVal = json.getStars(a.itemId) * 10;
    if (allChars.includes(a.itemId)) aVal++;
    return bVal - aVal;
  };

  const sortName = (a, b) => {
    let bVal = b.count * 10 + json.getStars(b.itemId);
    if (allChars.includes(b.itemId)) bVal++;
    let aVal = a.count * 10 + json.getStars(a.itemId);
    if (allChars.includes(a.itemId)) aVal++;
    return bVal - aVal;
  };

  useEffect(() => {
    let originalStash = JSON.parse(sessionStorage.getItem("stash") || []);
    if (activeFilters.includes("Default"))
      if (sortOrder) setStash(originalStash);
      else setStash(originalStash.reverse());
    else if (activeFilters.includes("By Rarity")) {
      if (sortOrder) setStash(originalStash.sort(sortRarity));
      else setStash(originalStash.sort(sortRarity).reverse());
    } else if (activeFilters.includes("By Count")) {
      if (sortOrder) setStash(originalStash.sort(sortName));
      else setStash(originalStash.sort(sortName).reverse());
    }
  }, [activeFilters, sortOrder]);

  // kill me
  const handleFilterUnlocked = (item) => {
    return (
      item.count > 0 &&
      (searchItem !== ""
        ? json
            .getName(item.itemId)
            .toLowerCase()
            .includes(searchItem.toLowerCase())
        : true) &&
      (!activeFilters.includes("Pyro")
        ? json.getType(item.itemId) !== "Pyro"
        : true) &&
      (!activeFilters.includes("Anemo")
        ? json.getType(item.itemId) !== "Anemo"
        : true) &&
      (!activeFilters.includes("Cryo")
        ? json.getType(item.itemId) !== "Cryo"
        : true) &&
      (!activeFilters.includes("Electro")
        ? json.getType(item.itemId) !== "Electro"
        : true) &&
      (!activeFilters.includes("Geo")
        ? json.getType(item.itemId) !== "Geo"
        : true) &&
      (!activeFilters.includes("Hydro")
        ? json.getType(item.itemId) !== "Hydro"
        : true) &&
      (!activeFilters.includes("Sword")
        ? json.getType(item.itemId) !== "Sword"
        : true) &&
      (!activeFilters.includes("Claymore")
        ? json.getType(item.itemId) !== "Claymore"
        : true) &&
      (!activeFilters.includes("Bow")
        ? json.getType(item.itemId) !== "Bow"
        : true) &&
      (!activeFilters.includes("Polearm")
        ? json.getType(item.itemId) !== "Polearm"
        : true) &&
      (!activeFilters.includes("Catalyst")
        ? json.getType(item.itemId) !== "Catalyst"
        : true) &&
      (!activeFilters.includes("5-Star")
        ? json.getStars(item.itemId) !== 5
        : true) &&
      (!activeFilters.includes("4-Star")
        ? json.getStars(item.itemId) !== 4
        : true) &&
      (!activeFilters.includes("3-Star")
        ? json.getStars(item.itemId) !== 3
        : true)
    );
  };

  const handleFilterLocked = (item) => {
    return (
      item.count === 0 &&
      (searchItem !== ""
        ? json
            .getName(item.itemId)
            .toLowerCase()
            .includes(searchItem.toLowerCase())
        : true) &&
      (!activeFilters.includes("Pyro")
        ? json.getType(item.itemId) !== "Pyro"
        : true) &&
      (!activeFilters.includes("Anemo")
        ? json.getType(item.itemId) !== "Anemo"
        : true) &&
      (!activeFilters.includes("Cryo")
        ? json.getType(item.itemId) !== "Cryo"
        : true) &&
      (!activeFilters.includes("Electro")
        ? json.getType(item.itemId) !== "Electro"
        : true) &&
      (!activeFilters.includes("Geo")
        ? json.getType(item.itemId) !== "Geo"
        : true) &&
      (!activeFilters.includes("Hydro")
        ? json.getType(item.itemId) !== "Hydro"
        : true) &&
      (!activeFilters.includes("Sword")
        ? json.getType(item.itemId) !== "Sword"
        : true) &&
      (!activeFilters.includes("Claymore")
        ? json.getType(item.itemId) !== "Claymore"
        : true) &&
      (!activeFilters.includes("Bow")
        ? json.getType(item.itemId) !== "Bow"
        : true) &&
      (!activeFilters.includes("Polearm")
        ? json.getType(item.itemId) !== "Polearm"
        : true) &&
      (!activeFilters.includes("Catalyst")
        ? json.getType(item.itemId) !== "Catalyst"
        : true) &&
      (!activeFilters.includes("5-Star")
        ? json.getStars(item.itemId) !== 5
        : true) &&
      (!activeFilters.includes("4-Star")
        ? json.getStars(item.itemId) !== 4
        : true) &&
      (!activeFilters.includes("3-Star")
        ? json.getStars(item.itemId) !== 3
        : true)
    );
  };

  const [multiclick, setMulticlick] = useState();

  const handleMultiClick = (item) => {
    clearTimeout(multiclick);
    setAnimating(true);
    setMulticlick(setTimeout(() => setAnimating(false), 500));
  };

  return (
    <section id="main-collection-section">
      {activeFilters.includes("Unlocked") ? (
        stash
          .filter((item) => handleFilterUnlocked(item))
          .map((item, index) => {
            return (
              <div
                className="unlocked"
                key={item.itemId + index}
                stars={json.getStars(item.itemId)}
                active={activeItem.itemId === item.itemId ? "true" : "false"}
                style={{
                  margin: `${resize.getWidth(5)}px`,
                  height: `${resize.getWidth(106)}px`,
                  width: `${resize.getWidth(106)}px`,
                  opacity: `${loading ? "0" : "1"}`,
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${json.getThumb(item.itemId)})`,
                  }}
                  stars={json.getStars(item.itemId)}
                  onClick={() => {
                    setActiveItem((prevItem) =>
                      prevItem === item ? undefined : handleMultiClick(item)
                    );
                    setActiveItem(item);
                  }}
                >
                  {activeFilters.includes("Count") ? (
                    <p
                      style={{
                        marginLeft: `${resize.getWidth(8)}px`,
                        fontSize: `${resize.getWidth(18)}px`,
                      }}
                    >
                      {item.count}
                    </p>
                  ) : (
                    <></>
                  )}
                  <img
                    src={type[json.getType(item.itemId)]}
                    alt={json.getType(item.itemId)}
                    style={{
                      width: `${resize.getWidth(30)}px`,
                      marginRight: `${resize.getWidth(5)}px`,
                    }}
                    draggable="false"
                  />
                </div>
              </div>
            );
          })
      ) : (
        <></>
      )}
      {activeFilters.includes("Locked") ? (
        stash
          .filter((item) => handleFilterLocked(item))
          .map((item, index) => {
            return (
              <div
                key={item.itemId + index}
                active={activeItem.itemId === item.itemId ? "true" : "false"}
                style={{
                  margin: `${resize.getWidth(5)}px`,
                  height: `${resize.getWidth(106)}px`,
                  width: `${resize.getWidth(106)}px`,
                  opacity: `${loading ? "0" : "1"}`,
                }}
              >
                <div
                  style={{
                    backgroundImage: `url(${json.getThumb(item.itemId)})`,
                    filter: "brightness(0)",
                  }}
                  onClick={() => {
                    setActiveItem((prevItem) =>
                      prevItem === item ? undefined : handleMultiClick()
                    );
                    setActiveItem(item);
                  }}
                />
              </div>
            );
          })
      ) : (
        <></>
      )}
    </section>
  );
}
