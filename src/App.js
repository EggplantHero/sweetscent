import "./App.css";
import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { changeMode, getMode } from "./store/ui";
import Navbar from "./components/navbar";
import SearchBar from "./components/searchBar";
import WheelMenu from "./components/wheelMenu";
import { getSeason } from "./utils/seasons";
import CardMat from "./components/cardMat";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector(getMode);

  useEffect(() => {
    const season = getSeason();
    dispatch(changeMode(season));
  }, [dispatch]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Sweet Scent</title>
        <body id="body" data-theme={mode}></body>
      </Helmet>
      <div className="App">
        <Navbar />
        <SearchBar />
        <WheelMenu />
        <CardMat />
      </div>
    </HelmetProvider>
  );
}

export default App;
