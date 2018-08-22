import uniq from "lodash/uniq";

export function getLocalWatersheds(stations) {
  return uniq(stations.map(s => s.LocalWatershed)).sort();
}

export function getLocalWaterbodies(stations) {
  return uniq(stations.map(s => s.LocalWaterbody)).sort();
}

export function getRiverForks(stations) {
  return uniq(stations.map(s => s.RiverFork)).sort();
}

export function getStationNames(stations) {
  return stations.map(s => s.StationName).sort();
}
