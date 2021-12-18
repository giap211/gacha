import "../../css/history.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HistoryTable from "./HistoryTable";
import HistoryDropdown from "./HistoryDropdown";
import HistoryPagination from "./HistoryPagination";
import CloseButton from "../CloseButton";
import { motion } from "framer-motion";
import { pageTransition } from "../../classes/Constants";

const HistoryContent = ({ location }) => {
  const MAX_PAG = 10;

  const history = location.state ? location.state.history : [[], [], []];

  const [selectedIndex, setSelectedIndex] = useState(
    location.state ? location.state.bannerIndex : 0
  );

  const [pagIndex, setPagIndex] = useState(
    Math.ceil(
      history[selectedIndex].length === 0
        ? 1
        : Math.ceil(history[selectedIndex].length / MAX_PAG)
    )
  );

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

  const fontSize = (size) =>
    resize.windowWidth < 425 ? {} : { fontSize: `${resize.getWidth(size)}px` };

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
          background: "rgb(235, 235, 235)",
        }}
      />
      <section id="collection-top-section">
        <div id="history-wish-select">
          <p
            style={Object.assign(fontSize(30), {
              color: "rgb(143, 143, 143)",
              width:
                resize.windowWidth < 425
                  ? undefined
                  : `${resize.getWidth(300)}px`,
            })}
          >
            Select Wish Type:
          </p>
          <HistoryDropdown
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            setPagIndex={setPagIndex}
            history={history}
            MAX_PAG={MAX_PAG}
            resize={resize}
          />
        </div>
        <Link exact="true" to="/">
          <CloseButton resize={resize} onClick={undefined} style={{}} />
        </Link>
      </section>
      <HistoryTable
        history={[...history[selectedIndex]].slice(
          (pagIndex - 1) * MAX_PAG,
          (pagIndex - 1) * MAX_PAG + MAX_PAG + 1
        )}
        pagIndex={pagIndex}
        resize={resize}
      />
      <HistoryPagination
        pagIndex={pagIndex}
        setPagIndex={setPagIndex}
        maxPag={Math.ceil(history[selectedIndex].length / MAX_PAG)}
        resize={resize}
      />
    </motion.section>
  );
};

export default HistoryContent;
