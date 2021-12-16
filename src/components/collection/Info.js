import React, { useState, useEffect } from "react";
import { allChars } from "../../classes/Constants";
import { allBanners } from "../../classes/Banner";
import axios from "axios";

const Info = ({ item, animating, loading, resize }) => {
  const isChar = (item) => allChars.includes(item);

  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("http://localhost:3000/banners/", { cancelToken: source.token })
      .then((response) => {
        setBannerData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      source.cancel();
    };
  }, []);

  const getBanner = (id) => {
    let banner = "";
    bannerData.map((datum) => {
      if (id === datum._id) banner = datum.title;
      return datum;
    });
    return banner;
  };

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

  const getType = (id) => {
    let type = "";
    typeData.map((datum) => {
      if (id === datum._id) type = datum.type;
      return datum;
    });
    return type;
  };

  const getTypeIcon = (id) => {
    let typeIcon = "";
    typeData.map((datum) => {
      if (id === datum._id) typeIcon = datum.location;
      return datum;
    });
    return typeIcon;
  };

  const [itemInfo, setItemInfo] = useState({
    name: "",
    typeId: "",
    weaponType: "",
    rarity: 0,
    portrait: "",
  });

  useEffect(() => {
    const fetchChar = async (charId) => {
      const response = axios.get(
        "http://localhost:3000/characters/find=" + charId
      );
      return await response;
    };
    const fetchWeapon = async (weaponId) => {
      const response = axios.get(
        "http://localhost:3000/weapons/find=" + weaponId
      );
      return await response;
    };

    isChar(item.itemId)
      ? fetchChar(item.itemId)
          .then((res) =>
            setItemInfo({
              name: res.data.name,
              typeId: res.data.vision,
              rarity: res.data.rarity,
              weaponType: res.data.weapon,
              portrait: res.data.portrait,
            })
          )
          .catch((err) => console.log(err))
      : fetchWeapon(item.itemId)
          .then((res) =>
            setItemInfo({
              name: res.data.name,
              typeId: res.data.type,
              rarity: res.data.rarity,
              portrait: res.data.gachaSingle,
            })
          )
          .catch((err) => console.log(err));
  }, [item]);

  const starPrinter = (i) => {
    return (
      <img
        key={i}
        className="item-stars"
        src="./assets/img/misc/star.webp"
        alt="star"
        animating={animating ? "true" : "false"}
        locked={item.count === 0 ? "true" : "false"}
        height={`${resize.getHeight(26, 26)}`}
        width={`${resize.getWidth(26)}`}
        star={i + 1}
        draggable="false"
      />
    );
  };

  const findBanner = (item) => {
    if (itemInfo.rarity === 3) return <li>All Banners</li>;
    let banners = [];
    for (const banner of allBanners) {
      if (isChar(item)) {
        if (
          banner.rateUpFive.includes(item) ||
          banner.rateUpFour.includes(item)
        )
          banners.push({ id: banner.abbr, rateUp: true });
        else if (
          banner.poolFiveChar.includes(item) ||
          banner.poolFourChar.includes(item)
        )
          banners.push({ id: banner.abbr, rateUp: false });
      } else {
        if (
          banner.rateUpFive.includes(item) ||
          banner.rateUpFour.includes(item)
        )
          banners.push({ id: banner.abbr, rateUp: true });
        else if (
          banner.poolFiveWeapon.includes(item) ||
          banner.poolFourWeapon.includes(item)
        )
          banners.push({ id: banner.abbr, rateUp: false });
      }
    }
    return banners.map((banner, index) => {
      return (
        <li key={banner + index}>
          {getBanner(banner.id) + (banner.rateUp ? " Rate Up" : "")}
        </li>
      );
    });
  };

  return (
    <section id="collection-info-section">
      <div
        style={{
          opacity: `${loading ? "0" : "1"}`,
        }}
      >
        <div
          id="item-info"
          style={{
            height: "550px",
          }}
        >
          <h3>{itemInfo.name}</h3>
          <div
            id="item-portrait"
            animating={animating ? "true" : "false"}
            locked={item.count === 0 ? "true" : "false"}
            style={{
              backgroundImage: `url(${itemInfo.portrait})`,
              backgroundSize: `${
                getType(itemInfo.typeId) === "Catalyst"
                  ? "350px 350px"
                  : "contain"
              }`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "inherit",
              width: "inherit",
            }}
          />
          <div
            id="item-type"
            style={{
              backgroundImage: `url(${getTypeIcon(itemInfo.typeId)})`,
              height: "115px",
              width: "115px",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
            animating={animating ? "true" : "false"}
            locked={item.count === 0 ? "true" : "false"}
          />

          <div id="stars-container">
            {Array(itemInfo.rarity)
              .fill()
              .map((e, i) => {
                return starPrinter(i);
              })}
          </div>
        </div>
        <h3>Count: {item.count}</h3>
        {}
        {isChar(item.itemId) ? (
          <h3>Character stats here</h3>
        ) : (
          <h3>gimme weapon stats</h3>
        )}
        <h3>What banner am I in?</h3>
        <ul>{findBanner(item.itemId)}</ul>{" "}
      </div>
    </section>
  );
};

export default Info;
