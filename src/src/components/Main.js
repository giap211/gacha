import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import DropdownBanner from "./DropdownBanner";
import MainBanner from "./MainBanner";
import MiniBanners from "./MiniBanners";
import WishButtons from "./WishButtons";
import SkipButton from "./SkipButton";
import WishModal from "./WishModal";
import WishSingle from "./WishSingle";
import SkipCheckboxes from "./SkipCheckboxes";
import Stats from "./Stats";
import Footer from "./Footer";
import Example from "./Example";
import { CalcWish } from "../classes/CalcWish";
import { allBanners } from "../classes/Banner";
import WishVideo from "./WishVideo";

const Main = () => {
  const [state, setState] = useState({
    isModalOpen: false,
    wishes: 0,
    primos: 0,
    currentWish: [],
    animating: false,
    skipVideo: false,
    skipSingle: false,
  });

  const [hasFive, setHasFive] = useState(false);
  const [hasFour, setHasFour] = useState(false);

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const [activeBanners, setActiveBanners] = useState([
    "albedo",
    "albedo_ei",
    "standard",
  ]);

  const [prevBanner, setPrevBanner] = useState(undefined);

  const [bannerContent, setBannerContent] = useState([
    {
      banner: allBanners[0],
      rateFive: 0.006,
      rateFour: 0.051,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
    {
      banner: allBanners[5],
      rateFive: 0.007,
      rateFour: 0.06,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
    {
      banner: allBanners[allBanners.length - 1],
      rateFive: 0.006,
      rateFour: 0.051,
      guaranteeFive: false,
      guaranteeFour: false,
      pityFive: 0,
      pityFour: 0,
    },
  ]);

  const [direction, setDirection] = useState("right");

  const [content, setContent] = useState("main");

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
    bannersClone[1] = banner + "_ei";
    allBanners.map((item) => {
      if (item.abbr === banner) bannerContentClone[0].banner = item;
      else if (item.abbr === banner + "_ei")
        bannerContentClone[1].banner = item;
      return item;
    });
    setActiveBanners((prevBanners) => {
      setPrevBanner(prevBanners[currentBannerIndex]);
      return bannersClone;
    });
    setBannerContent(bannerContentClone);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const getWidth = (width) =>
    window.innerWidth > 1280 ? width : windowWidth / (1280 / width);
  const getHeight = (height, width) =>
    window.innerWidth > 1280 ? height : (getWidth(width) * height) / width;

  const getWidthSelected = (width, peak) =>
    window.innerWidth > peak ? width : windowWidth / (peak / width);

  const getHeightSelected = (height, width, peak) =>
    window.innerWidth > peak
      ? height
      : (getWidthSelected(width, peak) * height) / width;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mainStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  };

  const otherStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleContent = () => {
    if (content === "main") {
      return (
        <>
          <NavBar resize={{ getHeight, getWidth, windowWidth }} />
          <section id="top-section-main">
            {windowWidth <= 425 ? (
              <></>
            ) : (
              <DropdownBanner
                changeBanner={changeBanner}
                bannersActive={activeBanners}
                animating={state.animating}
                resize={{ getHeight, getWidth, getWidthSelected }}
              />
            )}
            {windowWidth <= 425 ? (
              <div id="top-top-section">
                <DropdownBanner
                  changeBanner={changeBanner}
                  bannersActive={activeBanners}
                  animating={state.animating}
                  resize={{ getHeight, getWidth, getWidthSelected }}
                />
                <Stats primos={state.primos} resize={{ getHeight, getWidth }} />
              </div>
            ) : (
              <></>
            )}
            <MiniBanners
              bannersActive={activeBanners}
              setActive={setActiveBanner}
              activeIndex={currentBannerIndex}
              changeBanner={changeBanner}
              resize={{ getHeight, getWidth }}
            />
            {windowWidth <= 425 ? (
              <></>
            ) : (
              <Stats primos={state.primos} resize={{ getHeight, getWidth }} />
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
            resize={{ getHeight, getWidth }}
          />
          <section id="bottom-section-main">
            <WishButtons
              onWish={handleWish}
              activeIndex={currentBannerIndex}
              resize={{ getHeight, getWidth }}
            />
            <SkipCheckboxes props={state} setState={setState} />
          </section>
          <Footer />
        </>
      );
    } else
      return (
        <section>
          <SkipButton
            state={state}
            setState={setState}
            content={content}
            setContent={setContent}
            resize={{ getHeight, getWidth }}
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
              resize={{
                getWidth,
                height: (window.innerHeight / window.innerWidth) * windowWidth,
              }}
            />
          ) : (
            <WishSingle
              currentWish={state.currentWish}
              setContent={setContent}
              resize={{
                getHeight,
                getWidth,
                getHeightSelected,
                getWidthSelected,
              }}
            />
          )}
        </section>
      );
  };

  return (
    <div id="main" style={content === "main" ? mainStyle : otherStyle}>
      {
        handleContent()
        // <Example />
        // <div id="test"></div>
      }
      <WishModal
        props={state}
        toggle={toggleModal}
        isMain={content === "main"}
        skipAll={state.skipVideo && state.skipSingle}
        resize={{ getHeight, getWidth }}
      />
    </div>
  );
};

export default Main;
