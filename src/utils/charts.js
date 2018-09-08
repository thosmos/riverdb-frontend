import { unitsForParams, parameterInfoObj } from "../assets/constants";
import names from "../assets/parameterNames";

export function getUnit(param) {
  let unit = unitsForParams[param];
  return unit ? ` in  ${unit}:` : ":";
}

export function getParamInfoLine(param) {
  try {
    return parameterInfoObj[param];
  } catch (err) {
    console.log("err", err);
    return [];
  }
}

export function getFullParamName(param) {
  try {
    return names[param].text;
  } catch (err) {
    return "";
  }
}
