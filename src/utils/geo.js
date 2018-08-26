import geolib from "geolib";
import L from "leaflet";
import compact from "lodash/compact";

/**
 * Takes in GeoJson (with {multiple} features polygons) and returns [[lat,lng],[...],...]
 *
 * @param {Object} geoJson  FeatureCollection
 * @returns Array[[Number,Number]]
 */
function _flattenGeoJson(geoJson) {
  let arr = [];
  geoJson.features.map(f => {
    f.geometry.coordinates.map(c => {
      c.map(i => {
        arr.push([i[1], i[0]]);
      });
    });
  });
  return arr;
}

export function calculateBoundsOfStations(stations) {
  if (!stations || stations.length === 0) {
    let corner1 = L.latLng(39.14266, -120.34478);
    let corner2 = L.latLng(39.59836, -121.57581);
    return L.latLngBounds(corner1, corner2);
  }
  let allLats = compact(stations.map(s => s.value.TargetLat));
  let allLngs = compact(stations.map(s => s.value.TargetLong));
  let minLat = Math.min(...allLats);
  let maxLat = Math.max(...allLats);
  let minLng = Math.min(...allLngs);
  let maxLng = Math.max(...allLngs);
  if (minLat && minLng && maxLat && maxLng) {
    return L.latLngBounds(L.latLng(minLat, minLng), L.latLng(maxLat, maxLng));
  } else {
    // TODO: find more flexible way, this is because otherwise it renders a blank map and doesn't recover once it get's the stations....
    let corner1 = L.latLng(39.14266, -120.34478);
    let corner2 = L.latLng(39.59836, -121.57581);
    return L.latLngBounds(corner1, corner2);
  }
}
// /**
//  * calculates bounds ready for leaflet from GeoJson
//  * returned Object is {"_southWest": {"lat": Number, "lng": Number}, "_northEast": { "lat...."} }
//  *
//  * @export calculateBounds
//  * @param {Object} geoJson
//  * @returns {Object} bounds
//  */
// export function calculateBounds(geoJson) {
//   return L.latLngBounds(_flattenGeoJson(geoJson));
// }

// /**
//  * calculates center of GeoJson ready for leaflet
//  *
//  * @export calculateCenterOfGeoJson
//  * @param {Object} geoJson
//  * @returns {Object} {lat: Number, lng: Number}
//  */
// export function calculateCenterOfGeoJson(geoJson) {
//   let center = geolib.getCenterOfBounds(_flattenGeoJson(geoJson));
//   return L.latLng(center.longitude, center.latitude);
// }
