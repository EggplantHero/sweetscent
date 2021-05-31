import moment from "moment";

export const getSeason = () => {
  const day = moment().dayOfYear();
  let season = "winter";
  if (day > 79) season = "spring";
  if (day > 171) season = "summer";
  if (day > 263) season = "fall";
  if (day > 354) season = "summer";
  return season;
};
