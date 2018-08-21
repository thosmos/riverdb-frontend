import geolib from "geolib";
import L from "leaflet";

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
