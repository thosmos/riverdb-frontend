import uniqBy from "lodash/uniqBy";
import sortBy from "lodash/sortBy";
// import forkNames from "../assets/riverForkNames";

const fullForkNames = {
  DC: "Deer Creek",
  LY: "Lower Yuba",
  LYT: "Lower Yuba Tributaries",
  MY: "Middle Yuba",
  MYT: "Middle Yuba Tributaries",
  NY: "North Yuba",
  NYT: "North Yuba Tributaries",
  SY: "South Yuba",
  SYT: "South Yuba Tributaries"
};

export function getLocalWaterbodies(stations) {
  return uniqBy(
    stations.map(s => {
      return {
        label: s.LocalWaterbody,
        value: s.LocalWaterbody,
        fork: s.TribForkGroup
      };
    }),
    "label"
  ).sort();
}

export function getRiverForks(stations) {
  return uniqBy(
    stations.map(s => {
      return {
        label: s.ForkTribGroup,
        value: s
      };
    }),
    "label"
  ).sort();
}

export function getStationNames(stations) {
  return stations
    .map(s => {
      return { label: s.StationName, value: s };
    })
    .sort();
}

/**
 * For selection form
 *
 * @export
 * @param {[Object]} allForks
 * @returns {[Object]} [{label: ..., value: ...}]
 */
export function calculateForksForSelection(allForks) {
  let tempForks = allForks
    ? allForks.map(f => {
        return {
          label: f.label,
          value: f.label,
          fullName: fullForkNames[f.label] || f.label
        };
      })
    : [];
  // remove null label
  tempForks = tempForks.filter(f => f.label);
  // sort
  tempForks = sortBy(tempForks, o => o.label);
  return [{ label: "All Forks", value: null, fullName: "All Forks" }].concat(
    tempForks
  );
}
export function calculateStationsForSelection(allStations, forkSelection) {
  let tempStations = allStations
    ? allStations.map(s => {
        return { label: `${s.StationName} #${s.StationID} `, value: s };
      })
    : [];
  if (forkSelection) {
    tempStations = tempStations.filter(s => {
      return forkSelection.value === s.value.ForkTribGroup;
    });
  }
  return tempStations;
}
