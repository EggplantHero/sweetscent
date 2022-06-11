import moment from "moment";

export const getSeason = () => {
  const day = moment().dayOfYear();
  let season = "winter";
  if (day > 79) season = "spring";
  if (day > 171) season = "summer";
  if (day > 263) season = "fall";
  if (day > 354) season = "winter";
  return season;
};

export const getDaytime = () => {
  const [hour, am_pm] = moment().format("h,A").split(",");

  if (am_pm === "AM") {
    return hour < 7 ? "night" : "day";
  } else {
    return hour < 7 ? "day" : "night";
  }
};
