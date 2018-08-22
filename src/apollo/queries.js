import gql from "graphql-tag";

export const GET_STATIONS = gql`
  {
    stations {
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
  query getStationData($station: Int!) {
    sitevisits(station: $station) {
      id
      date
      notes
      results {
        H2O_Cond {
          mean
        }
        H2O_pH {
          mean
        }
        H2O_DO {
          mean
        }
        H2O_Turbidity {
          mean
        }
        # Water Temp
        H2O_Temp {
          mean
        }
      }
    }
  }
`;
