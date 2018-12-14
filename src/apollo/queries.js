import gql from "graphql-tag";

export const GET_STATIONS = gql`
  query getStations($agency: String) {
    stations(agency: $agency) {
      HydrologicUnit
      StationName
      RiverFork
      StreamSubsystem
      Active
      LocalWaterbody
      LocalWatershed
      StationCode
      StationID
      TargetLat
      TargetLong
      County
      ForkTribGroup
      LocalWaterbody
      Active
    }
  }
`;

export const GET_STATION_DATA = gql`
  query getStationData($stationCode: String) {
    sitevisits(stationCode: $stationCode) {
      id
      date
      notes
      resultsv {
        analyte
        is_valid
        matrix
        mean
        unit
      }
    }
  }
`;
