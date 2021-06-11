import React from "react";
import PokeCard from "./pokeCard";

const About = () => {
  const tutorialPoke = {
    id: 1,
    data: {
      name: "deerling",
      count: 5,
      inc: 1,
      form: "default",
      tutorial: "true",
    },
  };
  return (
    <div className="container">
      <div className="card user-select-none mb-4">
        <div className="card-header">
          <h5>About SweetScent</h5>
        </div>
        <div className="card-body">
          <p>
            The purpose of SweetScent is to enable users to easily track how
            many of each pokemon they have seen. <br /> For advanced pokemon
            players, this is a very useful statistic.
          </p>
          <p>
            SweetScent is built with the modern front-end javascript frameworks
            React and Redux.
          </p>
          <p>Save data is stored locally in your browser.</p>
        </div>
        <div className="card-header">
          <h5>How to use</h5>
        </div>
        <div className="card-body">
          <div className="col-8 col-sm-6 col-md-4 mx-auto pe-none">
            <PokeCard pokemon={tutorialPoke} />
          </div>
          <p>
            The central number is the main count. This number can be increased
            or decreased with the -1 / +1 buttons.
          </p>
          <p>
            The gear button is the config toggle menu. This will hide or show
            the additional options beside it.
          </p>
          <p>
            The number input field will alter the value of the -1 / +1 buttons.
          </p>
          <p>The trash button will delete the card.</p>
          <p>
            The star button will toggle this pokemon's appearance to become
            shiny. This is useful for marking your hunt as "completed".
          </p>
          <p>
            The background theme that loads with the page depends on the current
            season in real life, matching with Deerling, a pokemon whose
            appearance changes with the seasons.
          </p>
          <p>
            The wheel menu at the top of the page will change the background
            theme, allowing you to preview other seasons.
          </p>
          <p>The cards can be reordered via drag-and-drop.</p>
        </div>
        <div className="card-footer"></div>
      </div>
    </div>
  );
};

export default About;
