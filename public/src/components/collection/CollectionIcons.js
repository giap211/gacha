import React, { useState, useEffect } from "react";
import { allChars } from "../../classes/Constants";
import axios from "axios";

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
  const [charData, setCharData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("http://localhost:3000/characters/", { cancelToken: source.token })
      .then((response) => {
        setCharData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      source.cancel();
    };
  }, []);

  const [weaponData, setWeaponData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("http://localhost:3000/weapons/", { cancelToken: source.token })
      .then((response) => {
        setWeaponData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      source.cancel();
    };
  }, []);

  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("http://localhost:3000/types/", { cancelToken: source.token })
      .then((response) => {
        setTypeData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      source.cancel();
    };
  }, []);

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

  const sortRarity = (a, b) => {
    let bVal = getStars(b.itemId) * 10;
    if (allChars.includes(b.itemId)) bVal++;
    let aVal = getStars(a.itemId) * 10;
    if (allChars.includes(a.itemId)) aVal++;
    return bVal - aVal;
  };

  const sortName = (a, b) => {
    let bVal = b.count * 10 + getStars(b.itemId);
    if (allChars.includes(b.itemId)) bVal++;
    let aVal = a.count * 10 + getStars(a.itemId);
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

  // kill me
  const handleFilterUnlocked = (item) => {
    return (
      item.count > 0 &&
      (searchItem !== ""
        ? getName(item.itemId).toLowerCase().includes(searchItem.toLowerCase())
        : true) &&
      (!activeFilters.includes("Pyro")
        ? getType(item.itemId) !== "Pyro"
        : true) &&
      (!activeFilters.includes("Anemo")
        ? getType(item.itemId) !== "Anemo"
        : true) &&
      (!activeFilters.includes("Cryo")
        ? getType(item.itemId) !== "Cryo"
        : true) &&
      (!activeFilters.includes("Electro")
        ? getType(item.itemId) !== "Electro"
        : true) &&
      (!activeFilters.includes("Geo")
        ? getType(item.itemId) !== "Geo"
        : true) &&
      (!activeFilters.includes("Hydro")
        ? getType(item.itemId) !== "Hydro"
        : true) &&
      (!activeFilters.includes("Sword")
        ? getType(item.itemId) !== "Sword"
        : true) &&
      (!activeFilters.includes("Claymore")
        ? getType(item.itemId) !== "Claymore"
        : true) &&
      (!activeFilters.includes("Bow")
        ? getType(item.itemId) !== "Bow"
        : true) &&
      (!activeFilters.includes("Polearm")
        ? getType(item.itemId) !== "Polearm"
        : true) &&
      (!activeFilters.includes("Catalyst")
        ? getType(item.itemId) !== "Catalyst"
        : true) &&
      (!activeFilters.includes("5-Star")
        ? getStars(item.itemId) !== 5
        : true) &&
      (!activeFilters.includes("4-Star")
        ? getStars(item.itemId) !== 4
        : true) &&
      (!activeFilters.includes("3-Star") ? getStars(item.itemId) !== 3 : true)
    );
  };

  const handleFilterLocked = (item) => {
    return (
      item.count === 0 &&
      (searchItem !== ""
        ? getName(item.itemId).toLowerCase().includes(searchItem.toLowerCase())
        : true) &&
      (!activeFilters.includes("Pyro")
        ? getType(item.itemId) !== "Pyro"
        : true) &&
      (!activeFilters.includes("Anemo")
        ? getType(item.itemId) !== "Anemo"
        : true) &&
      (!activeFilters.includes("Cryo")
        ? getType(item.itemId) !== "Cryo"
        : true) &&
      (!activeFilters.includes("Electro")
        ? getType(item.itemId) !== "Electro"
        : true) &&
      (!activeFilters.includes("Geo")
        ? getType(item.itemId) !== "Geo"
        : true) &&
      (!activeFilters.includes("Hydro")
        ? getType(item.itemId) !== "Hydro"
        : true) &&
      (!activeFilters.includes("Sword")
        ? getType(item.itemId) !== "Sword"
        : true) &&
      (!activeFilters.includes("Claymore")
        ? getType(item.itemId) !== "Claymore"
        : true) &&
      (!activeFilters.includes("Bow")
        ? getType(item.itemId) !== "Bow"
        : true) &&
      (!activeFilters.includes("Polearm")
        ? getType(item.itemId) !== "Polearm"
        : true) &&
      (!activeFilters.includes("Catalyst")
        ? getType(item.itemId) !== "Catalyst"
        : true) &&
      (!activeFilters.includes("5-Star")
        ? getStars(item.itemId) !== 5
        : true) &&
      (!activeFilters.includes("4-Star")
        ? getStars(item.itemId) !== 4
        : true) &&
      (!activeFilters.includes("3-Star") ? getStars(item.itemId) !== 3 : true)
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
                stars={getStars(item.itemId)}
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
                    backgroundImage: `url(${getThumb(item.itemId)})`,
                  }}
                  stars={getStars(item.itemId)}
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
                    src={getTypeIcon(item.itemId)}
                    alt={getTypeIcon(item.itemId)}
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
                    backgroundImage: `url(${getThumb(item.itemId)})`,
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
