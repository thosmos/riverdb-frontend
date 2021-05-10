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

export const GET_SAFETOSWIM = gql`
  query getSafeToSwim($agency: String) {
    stations: safetoswim(agency: $agency) {
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
      Agency {
        AgencyCode
      }
      latest { 
        date 
        value
        qual
        avg 
      }
      values { 
        date 
        value
        qual
        avg
      }
    }
  }
`;

export const GET_AGENCIES = gql`
  query getAgencies {
    allagencylookups (filter:{Active:true}) {
      AgencyCode
      AgencyDescr
      City
      Email
      Logo
      Mission
      PrimaryContact
      Projects {
        Active
        Description
        Name
        ProjectID
        Public
        Parameters {
          id
          Name
          NameShort
          Active
          Constituent{
            AnalyteCode {
              AnalyteShort
            }
            MatrixCode {
              MatrixShort
            }
            UnitCode {
              Unit
            }
          }
          High
          Low
          Replicates
          SampleType {
            SampleTypeCode
          }
        }
      }
    }
  }
`;