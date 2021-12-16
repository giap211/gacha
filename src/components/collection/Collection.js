import "../../css/collection.css";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Info from "./Info";
import CollectionIcons from "./CollectionIcons";
import { motion } from "framer-motion";
import { pageTransition } from "../../classes/Constants";

const Collections = () => {
  document.body.style.background = "rgb(235, 235, 235)";

  const [stash, setStash] = useState(
    JSON.parse(sessionStorage.getItem("stash")) || []
  );

  const [sortOrder, setSortOrder] = useState(true);

  const [animating, setAnimating] = useState(false);

  const [searchItem, setSearchItem] = useState("");

  const hasWished = () => {
    let hasWished = false;
    if (stash.length === 0) return hasWished;
    stash.map((item) => {
      if (item.count > 0) hasWished = true;
      return item;
    });
    return hasWished;
  };

  const [activeFilters, setActiveFilters] = useState([
    "Default",
    "Anemo",
    "Cryo",
    "Electro",
    "Geo",
    "Hydro",
    "Pyro",
    "Sword",
    "Claymore",
    "Bow",
    "Polearm",
    "Catalyst",
    "5-Star",
    "4-Star",
    "3-Star",
    hasWished() ? "Unlocked" : "Locked",
  ]);

  const [activeItem, setActiveItem] = useState(
    stash.filter((item) => item.count > 0).length !== 0
      ? stash.filter((item) => item.count > 0)[0]
      : stash[0]
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    var loadDelay = setTimeout(() => setLoading(false), 400);
    return () => {
      clearTimeout(loadDelay);
    };
  }, []);

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
      <section id="collection-content">
        <Info
          item={activeItem}
          animating={animating}
          loading={loading}
          resize={resize}
        />
        <CollectionIcons
          activeFilters={activeFilters}
          loading={loading}
          stash={stash}
          setStash={setStash}
          setAnimating={setAnimating}
          sortOrder={sortOrder}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          searchItem={searchItem}
          resize={resize}
        />
        <Filter
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          setSearchItem={setSearchItem}
          resize={resize}
        />
      </section>
    </motion.section>
  );
};

export default Collections;
