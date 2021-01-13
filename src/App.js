import "./css/App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/main/Main";
import Collection from "./components/collection/Collection";
import Login from "./components/login/Login";
import HistoryContent from "./components/history/HistoryContent";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
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
    <Router>
      <div className="App">
        <NavBar resize={resize} />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/myCollection" component={Collection} />
          <Route path="/login" component={Login} />
          <Route path="/history" component={HistoryContent} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
