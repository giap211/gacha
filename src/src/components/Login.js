import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Login = () => {
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
  return (
    <div id="login">
      <NavBar resize={{ getWidth, getHeight, windowWidth }} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "87vmin",
        }}
      >
        <h1 style={{ margin: "auto", color: "antiquewhite" }}>
          Under Construction
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
