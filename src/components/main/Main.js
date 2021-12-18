import "../../css/main.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropdownBanner from "./DropdownBanner";
import MainBanner from "./MainBanner";
import MiniBanners from "./MiniBanners";
import WishButtons from "./WishButtons";
import CloseButton from "../CloseButton";
import WishModal from "./WishModal";
import WishSingle from "./WishSingle";
import Checkbox from "../Checkbox";
import Stats from "./Stats";
import { CalcWish } from "../../classes/CalcWish";
import { allBanners } from "../../classes/Banner";
import WishVideo from "./WishVideo";
import History from "../../classes/History";
import Button from "../Button";
import {
  allBannersAbbr,
  allChars,
  allWeapons,
  pageTransition,
} from "../../classes/Constants";
import axios from "axios";
import { motion } from "framer-motion";

const Main = () => {
  const [state, setState] = useState({
    isModalOpen: false,
    wishes: 0,
    primos: parseInt(sessionStorage.getItem("primos")) || 0,
    currentWish: [],
    animating: false,
    skipVideo: sessionStorage.getItem("skipVideo") === "true",
    skipSingle: sessionStorage.getItem("skipSingle") === "true",
  });

  const [hasFive, setHasFive] = useState(false);
  const [hasFour, setHasFour] = useState(false);

  const [currentBannerIndex, setCurrentBannerIndex] = useState(
    parseInt(sessionStorage.getItem("bannerIndex")) || 0
  );

  const [activeBanners, setActiveBanners] = useState([
    "5fff6b9b9d4d2c31707c5eb6",
    "5fff6b9b9d4d2c31707c5eb7",
    "5fff6b9b9d4d2c31707c5ec2",
  ]);

  const [prevBanner, setPrevBanner] = useState(undefined);

  const [bannerContent, setBannerContent] = useState([
    {
      banner: allBanners[0],
      rateFive: 0.006,
      rateFour: 0.051,
      guaranteeFive: sessionStorage.getItem("charGuaranteeFive") === "true",
      guaranteeFour: sessionStorage.getItem("charGuaranteeFour") === "true",
      pityFive: parseInt(sessionStorage.getItem("charPityFive")) || 0,
      pityFour: parseInt(sessionStorage.getItem("charPityFour")) || 0,
    },
    {
      banner: allBanners[1],
      rateFive: 0.007,
      rateFour: 0.06,
      guaranteeFive: sessionStorage.getItem("weaponGuaranteeFive") === "true",
      guaranteeFour: sessionStorage.getItem("weaponGuaranteeFour") === "true",
      pityFive: parseInt(sessionStorage.getItem("weaponPityFive")) || 0,
      pityFour: parseInt(sessionStorage.getItem("weaponPityFour")) || 0,
    },
    {
      banner: allBanners[allBanners.length - 1],
      rateFive: 0.006,
      rateFour: 0.051,
      guaranteeFive: sessionStorage.getItem("standardGuaranteeFive") === "true",
      guaranteeFour: sessionStorage.getItem("standardGuaranteeFour") === "true",
      pityFive: parseInt(sessionStorage.getItem("standardPityFive")) || 0,
      pityFour: parseInt(sessionStorage.getItem("standardPityFour")) || 0,
    },
  ]);

  const [history, setHistory] = useState([
    JSON.parse(sessionStorage.getItem("charHistory")) || [],
    JSON.parse(sessionStorage.getItem("weaponHistory")) || [],
    JSON.parse(sessionStorage.getItem("standardHistory")) || [],
  ]);

  const [direction, setDirection] = useState("right");

  const [content, setContent] = useState("main");

  const sessionStore = (suffix, value) => {
    switch (currentBannerIndex) {
      case 0:
        sessionStorage.setItem("char" + suffix, value);
        break;
      case 1:
        sessionStorage.setItem("weapon" + suffix, value);
        break;
      default:
        sessionStorage.setItem("standard" + suffix, value);
        break;
    }
  };

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

  // creates stash
  useEffect(() => {
    if (JSON.parse(sessionStorage.getItem("stash"))) return;
    let stash = [];
    allChars.map((char) => stash.push({ itemId: char, count: 0 }));
    allWeapons.map((weapon) => stash.push({ itemId: weapon, count: 0 }));
    sessionStorage.setItem("stash", JSON.stringify(stash));
  }, []);

  const updateStash = (wishItem) => {
    let stash = JSON.parse(sessionStorage.getItem("stash"));
    stash.map((stashItem) => {
      if (stashItem.itemId === wishItem) stashItem.count += 1;
      return stashItem;
    });
    orderStash(stash);
    sessionStorage.setItem("stash", JSON.stringify(stash));
  };

  const orderStash = (stash) => {
    for (let i = 1; i < stash.length; i++) {
      if (stash[i].count > 0) {
        for (let j = i - 1; j >= 0; j--) {
          if (stash[j].count === 0) {
            let tmp = stash[j];
            stash[j] = stash[j + 1];
            stash[j + 1] = tmp;
          }
        }
      }
    }
  };

  const lockables = (wishResults) => {
    wishResults.map((item) => {
      updateStash(item);
      return item;
    });
  };

  const handleWish = (wishes) => {
    if (!state.skipVideo) setContent("video");
    else if (state.skipVideo && state.skipSingle) setContent("main");
    else setContent("single");
    let wishResults = [];
    const currentBanner = activeBanners[currentBannerIndex];
    setHasFive(false);
    setHasFour(false);
    for (let i = 0; i < wishes; i++)
      wishResults.push(
        CalcWish(currentBanner, bannerContent, setHasFive, setHasFour)
      );
    lockables(wishResults);
    sessionStorage.setItem("primos", state.primos + wishes * 160);
    sessionStore("PityFive", bannerContent[currentBannerIndex].pityFive);
    sessionStore("PityFour", bannerContent[currentBannerIndex].pityFour);
    sessionStore(
      "GuaranteeFive",
      bannerContent[currentBannerIndex].guaranteeFive
    );
    sessionStore(
      "GuaranteeFour",
      bannerContent[currentBannerIndex].guaranteeFour
    );
    let historyClone = [...history];
    historyClone[currentBannerIndex] = historyClone[currentBannerIndex].concat(
      new History(wishResults).getHistory()
    );
    sessionStore("History", JSON.stringify(historyClone[currentBannerIndex]));
    setHistory([...historyClone]);
    setState({
      ...state,
      isModalOpen: true,
      wishes: wishes,
      primos: state.primos + wishes * 160,
      currentWish: wishResults,
    });
  };

  const setActiveBanner = (index) => {
    if (state.animating) return;
    let edgeBanner =
      (currentBannerIndex === 0 && index === activeBanners.length - 1) ||
      (currentBannerIndex === activeBanners.length - 1 && index === 0)
        ? true
        : false;
    if (currentBannerIndex - index < 0) {
      if (edgeBanner) setDirection("left");
      else setDirection("right");
    } else {
      if (edgeBanner) setDirection("right");
      else setDirection("left");
    }
    setCurrentBannerIndex(index);
  };

  const toggleModal = () => {
    setState({ ...state, isModalOpen: false });
  };
  const changeBanner = (banner) => {
    if (state.animating) return;
    let bannersClone = [...activeBanners];
    let bannerContentClone = [...bannerContent];
    bannersClone[0] = banner;
    bannersClone[1] = allBannersAbbr[allBannersAbbr.indexOf(banner) + 1];
    allBanners.map((item) => {
      if (item.abbr === banner) bannerContentClone[0].banner = item;
      else if (item.abbr === bannersClone[1])
        bannerContentClone[1].banner = item;
      return item;
    });
    setActiveBanners((prevBanners) => {
      setPrevBanner(prevBanners[currentBannerIndex]);
      return bannersClone;
    });
    setBannerContent(bannerContentClone);
  };

  const handleCheckbox = (e) => {
    switch (e.target.id) {
      case "skip-video":
        setState({ ...state, skipVideo: e.target.checked });
        break;
      default:
        setState({ ...state, skipSingle: e.target.checked });
        break;
    }
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const getWidth = (width) =>
    window.innerWidth > 1280 ? width : windowWidth / (1280 / width);
  const getHeight = (height, width) =>
    window.innerWidth > 1280 ? height : (getWidth(width) * height) / width;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resize = {
    windowWidth,
    height: (window.innerHeight / window.innerWidth) * windowWidth,
    getWidth,
    getHeight,
  };

  const handleContent = () => {
    if (content === "main") {
      return (
        <>
          <section
            id="top-section-main"
            style={{ height: `${resize.getHeight(95, 188)}` }}
          >
            {windowWidth <= 425 ? (
              <></>
            ) : (
              <DropdownBanner
                changeBanner={changeBanner}
                bannersActive={activeBanners}
                animating={state.animating}
                bannerData={bannerData}
                resize={resize}
              />
            )}
            {windowWidth <= 425 ? (
              <div id="top-top-section-main">
                <DropdownBanner
                  changeBanner={changeBanner}
                  bannersActive={activeBanners}
                  animating={state.animating}
                  bannerData={bannerData}
                  resize={resize}
                />
                <Stats primos={state.primos} resize={resize} />
              </div>
            ) : (
              <></>
            )}
            <MiniBanners
              bannersActive={activeBanners}
              setActive={setActiveBanner}
              activeIndex={currentBannerIndex}
              changeBanner={changeBanner}
              bannerData={bannerData}
              resize={resize}
            />
            {windowWidth <= 425 ? (
              <></>
            ) : (
              <Stats primos={state.primos} resize={resize} />
            )}
          </section>
          <MainBanner
            props={state}
            setProps={setState}
            banners={activeBanners}
            setActive={setActiveBanner}
            prevBanner={prevBanner}
            activeIndex={currentBannerIndex}
            direction={direction}
            bannerData={bannerData}
            resize={resize}
          />
          <section id="bottom-section-main">
            <div
              id="bottom-top-section-main"
              style={{ height: `${resize.getHeight(75, 293)}px` }}
            >
              <Link
                to={{
                  pathname: "/history",
                  state: {
                    history: history,
                    bannerIndex: currentBannerIndex,
                  },
                }}
                style={{ textDecoration: "none" }}
                onClick={() => {
                  sessionStorage.setItem("bannerIndex", currentBannerIndex);
                  sessionStorage.setItem("skipVideo", state.skipVideo);
                  sessionStorage.setItem("skipSingle", state.skipSingle);
                }}
              >
                <Button context="History" resize={resize} />
              </Link>
              <WishButtons
                onWish={handleWish}
                activeIndex={currentBannerIndex}
                resize={resize}
              />
            </div>
            <div id="checkbox-container">
              <Checkbox
                checked={state.skipVideo}
                id={"skip-video"}
                text={"Skip Video"}
                onChange={(e) => handleCheckbox(e)}
                resize={resize}
              />
              <Checkbox
                checked={state.skipSingle}
                id={"skip-single"}
                text={"Skip Single"}
                onChange={(e) => handleCheckbox(e)}
                resize={resize}
              />
            </div>
          </section>
        </>
      );
    } else
      return (
        <section>
          <CloseButton
            onClick={() => {
              setState({ ...state, animating: false });
              content === "video"
                ? state.skipSingle
                  ? setContent("main")
                  : setContent("single")
                : setContent("main");
            }}
            type="close"
            style={{
              top: `${getWidth(50)}px`,
              right: `${getWidth(50)}px`,
              position: "absolute",
              zIndex: "1052",
            }}
            resize={resize}
          />
          {content === "video" ? (
            <WishVideo
              src={
                state.currentWish.length > 1
                  ? hasFive
                    ? "/assets/img/misc/5_star.webm"
                    : "/assets/img/misc/4_star.webm"
                  : hasFive
                  ? "/assets/img/misc/5_star_single.webm"
                  : hasFour
                  ? "/assets/img/misc/4_star_single.webm"
                  : "/assets/img/misc/3_star.webm"
              }
              onEnded={() =>
                state.skipSingle ? setContent("main") : setContent("single")
              }
              resize={resize}
            />
          ) : (
            <WishSingle
              currentWish={state.currentWish}
              setContent={setContent}
              charData={charData}
              weaponData={weaponData}
              typeData={typeData}
              resize={resize}
            />
          )}
        </section>
      );
  };

  return (
    <motion.section
      className="content-section"
      initial="out"
      exit="out"
      animate="in"
      variants={pageTransition}
    >
      <div
        className="background"
        style={{
          backgroundImage: "url(../assets/img/misc/background.webp)",
          zIndex: `${content === "main" ? "-1" : "1050"}`,
        }}
      />
      {handleContent()}
      <WishModal
        props={state}
        toggle={toggleModal}
        isMain={content === "main"}
        skipAll={state.skipVideo && state.skipSingle}
        charData={charData}
        weaponData={weaponData}
        typeData={typeData}
        resize={resize}
      />
    </motion.section>
  );
};

export default Main;
