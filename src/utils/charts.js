import { unitsForParams } from "../assets/constants";

export function getUnit(param) {
  console.log("param", param);
  let unit = unitsForParams[param];
  console.log("unit", unit);
  return unit ? ` in  ${unit}:` : ":";
}
