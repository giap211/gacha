import "../../css/details.css";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { pageTransition, baseThreeStar } from "../../classes/Constants";
import DetailsTable from "./DetailsTable";
import { allBanners } from "../../classes/Banner";
import axios from "axios";
import DetailsFeatured from "./DetailsFeatured";

export default function DetailsContent({ location }) {
  document.body.style.background = "rgb(235, 235, 235)";

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

  const getTitle = (banner) => {
    let title = "";
    bannerData.map((datum) => {
      if (banner === datum._id) title = datum.title;
      return datum;
    });
    return title;
  };

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
      <h1 style={{ color: "black" }}>Event Wish "{getTitle(banner.abbr)}"</h1>
      <DetailsFeatured
        featuredFive={banner.rateUpFive}
        featuredFour={banner.rateUpFour}
        charData={charData}
        weaponData={weaponData}
        typeData={typeData}
        resize={resize}
      />
      <DetailsTable
        banner={banner.rateUpFive.concat(
          banner.poolFiveChar.concat(banner.poolFiveWeapon)
        )}
        rateUp={banner.rateUpFive}
        charData={charData}
        weaponData={weaponData}
        resize={resize}
      />
      <DetailsTable
        banner={banner.rateUpFour.concat(
          banner.poolFourChar.concat(banner.poolFourWeapon)
        )}
        rateUp={banner.rateUpFour}
        charData={charData}
        weaponData={weaponData}
        resize={resize}
      />
      <DetailsTable
        banner={baseThreeStar}
        charData={charData}
        weaponData={weaponData}
        resize={resize}
      />
    </motion.section>
  );
}
