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

export function getMinMaxValue(plotData) {
  const onlyValues = plotData.map(p => {
    let temp = [];
    p.data.forEach(d => {
      // If linegraph only return actual value not date
      if (d) {
        if ((d.length === 2 && d[1]) || (d.length === 2 && d[1] === 0)) {
          temp.push(d[1]);
          //  if boxgraph return min and max value
        } else if (d.length === 5) {
          console.log("d[0]", d[0]);
          console.log("d[4]", d[4]);
          temp.push(d[0]);
          temp.push(d[4]);
        }
      }
    });
    return temp;
  });
  console.log("onlyValues", onlyValues);
  let min = onlyValues.map(p => Math.min(...p));
  let max = onlyValues.map(p => Math.max(...p));
  return [Math.min(...min), Math.max(...max)];
}
