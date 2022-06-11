import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeMode, getDark, getMode, toggleDark } from "../store/ui";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";

const WheelMenu = () => {
  const dispatch = useDispatch();
  const mode = useSelector(getMode);
  const dark = useSelector(getDark);
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
          <div className="circle" onClick={() => dispatch(toggleDark())}>
            {dark ? <BsMoonStarsFill /> : <BsSun />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheelMenu;
