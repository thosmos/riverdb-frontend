import gql from "graphql-tag";

export const GET_STATIONS = gql`
  query getStations($agency: String, $project: String, $params: [String]) {
    stations(agency: $agency, project: $project, params: $params) {
      id
      StationID
      StationCode
      HydrologicUnit
      StationName
      RiverFork
      StreamSubsystem
      Active
      LocalWaterbody
      LocalWatershed
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
  query getStationData($stationRef: ID, $sampleType: String) {
    sitevisits(stationRef: $stationRef, sampleType: $sampleType) {
      id
      date
      notes
      resultsv {
        analyte
        is_valid
        matrix
        mean
        unit
        type
        param {
          name
        }
      }
    }
  }
`;

export const GET_LOGGER_DATA = gql`
  query getLoggerData($stationRef: ID) {
    logsamples(stationRef: $stationRef) {
      date
      value
    }
  }
`;

export const GET_SAFETOSWIM = gql`
  query getSafeToSwim($agency: String) {
    stations: safetoswim(agency: $agency) {
      id
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
        avg
      }
      values {
        date
        value
        avg
      }
    }
  }
`;

export const GET_PROJECTS = gql`
  query getProjects ($agency: String) {
    projects: allprojectslookups (filter: {Public:true, AgencyCode:$agency}) {
      Active
      Description
      Name
      ProjectID
      ProjectType {
        ident
        name
      }
      Public
      Parameters {
        id
        Name
        NameShort
        Active
        Constituent{
          id
          AnalyteCode {
            AnalyteShort
            AnalyteName
          }
          MatrixCode {
            MatrixShort
            MatrixName
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
          Name
        }
      }
    }
  }`

export const GET_PROJECT = gql`
  query getProject($agency: String, $project:String){
    project: projectslookup(AgencyCode:$agency, ProjectID:$project){
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
  }`

export const GET_AGENCIES = gql`
  query getAgencies {
    agencies: allagencylookups (filter:{Active:true}) {
      AgencyCode
      AgencyDescr
      Name
      NameShort
      Logo
      Mission
      PrimaryContact
      Email
      Telephone
      StreetAddress
      City
      State
      Zip
      WebAddress
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

export const GET_AGENCY = gql`
  query getAgency ($agency:String) {
    agency: agencylookup (AgencyCode:$agency) {
      AgencyCode
      AgencyDescr
      Name
      NameShort
      Logo
      Mission
      PrimaryContact
      Email
      Telephone
      StreetAddress
      City
      State
      Zip
      WebAddress
    }
  }
`;