import { unitsForParams } from "../assets/constants";

export function getUnit(param) {
  let unit = unitsForParams[param];
  return unit ? ` in  ${unit}:` : ":";
}
