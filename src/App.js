import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { changeMode, getDark, getMode, toggleDark } from "./store/ui";
import Navbar from "./components/navbar";
import WheelMenu from "./components/wheelMenu";
import { getSeason, getDaytime } from "./utils/seasons";
import CardMat from "./components/cardMat";
import About from "./components/about";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector(getMode);
  const dark = useSelector(getDark);
  
  useEffect(() => {
    const season = getSeason();
    dispatch(changeMode(season));

    const time = getDaytime();
    if (time === "day" && dark) {
      dispatch(toggleDark());
    }
    if (time === "night" && !dark) {
      dispatch(toggleDark());
    }
  }, [dispatch]);

  const DataTheme = () => {
    return `${mode}-${dark ? "night" : "day"}`;
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Sweet Scent</title>
        <body id="body" data-theme={DataTheme()}></body>
      </Helmet>
      <div className="App">
        <Navbar />
        <div className="d-flex justify-content-end">
          <WheelMenu />
        </div>
        <Switch>
          <Route exact path="/">
            <CardMat />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </HelmetProvider>
  );
}

export default App;
