import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMode, getMode } from "../store/ui";

const WheelMenu = () => {
  const dispatch = useDispatch();
  const mode = useSelector(getMode);
  const seasons = ["spring", "summer", "fall", "winter"];

  const changeSeason = (season) => {
    if (season === mode) return;
    dispatch(changeMode(season));
  };

  return (
    <div className="mt-2 d-inline-block">
      <div className="d-flex justify-content-end mx-5 my-2">
        <div className="wheel">
          {seasons.map((season) => (
            <button
              key={season}
              className="btn square"
              onClick={() => changeSeason(season)}
            ></button>
          ))}
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default WheelMenu;
