import "../../css/details.css";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageTransition, baseThreeStar, json } from "../../classes/Constants";
import DetailsTable from "./DetailsTable";
import { allBanners } from "../../classes/Banner";
import DetailsFeatured from "./DetailsFeatured";

export default function DetailsContent({ location }) {
  document.body.style.background = "rgb(235, 235, 235)";

  const banner = location.state ? location.state.activeBanner : allBanners[0];

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

  return (
    <motion.section
      className="content-section"
      initial="out"
      exit="out"
      animate="in"
      variants={pageTransition}
    >
      <h1 style={{ color: "black" }}>
        Event Wish "{json.getTitle(banner.abbr)}"
      </h1>
      <DetailsFeatured
        featuredFive={banner.rateUpFive}
        featuredFour={banner.rateUpFour}
        resize={resize}
      />
      <DetailsTable
        banner={banner.rateUpFive.concat(
          banner.poolFiveChar.concat(banner.poolFiveWeapon)
        )}
        rateUp={banner.rateUpFive}
        resize={resize}
      />
      <DetailsTable
        banner={banner.rateUpFour.concat(
          banner.poolFourChar.concat(banner.poolFourWeapon)
        )}
        rateUp={banner.rateUpFour}
        resize={resize}
      />
      <DetailsTable banner={baseThreeStar} resize={resize} />
    </motion.section>
  );
}
