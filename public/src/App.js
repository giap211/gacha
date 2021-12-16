import "./css/App.css";
import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import Main from "./components/main/Main";
import Collection from "./components/collection/Collection";
import Login from "./components/login/Login";
import HistoryContent from "./components/history/HistoryContent";
import DetailsContent from "./components/details/DetailsContent";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { UserContext } from "./components/UserContext";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <Router>
      <Test />
    </Router>
  );
};

const Test = () => {
  const [user, setUser] = useState(null);

  const location = useLocation();

  const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);

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
    <div className="App">
      <NavBar resize={resize} />
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <UserContext.Provider value={userValue}>
            <Route path="/" exact component={Main} />
            <Route path="/myCollection" component={Collection} />
            <Route path="/login" component={Login} />
            <Route path="/history" component={HistoryContent} />
            <Route path="/details" component={DetailsContent} />
          </UserContext.Provider>
        </Switch>
      </AnimatePresence>
      <Footer resize={resize} />
    </div>
  );
};

export default App;
