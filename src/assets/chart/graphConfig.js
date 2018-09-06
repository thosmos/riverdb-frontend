import { palette1 } from "./palettes.js";
import { getUnit } from "../../utils/charts.js";
import names from "../parameterNames";

export const graphConfig = {
  legend: {
    enabled: true
  },
  plotOptions: {
    series: { animation: false }
  },
  colors: palette1,
  exporting: {
    showTable: false
  }
};

export default graphConfig;

const dateTimeAxis = {
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats: {
      month: "e%. b%",
      year: "%b"
    },
    title: {
      text: "Date"
    }
  }
};

export const monthsOnXAxis = {
  xAxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
  }
};

export const splinePlotOptions = {
  spline: {
    marker: {
      enabled: true,
      radius: 2.5,
      symbol: "circle"
    },
    lineWidth: 1.5
  },
  series: {
    animation: false
  }
};

export const singleStation = (stationName, param) => {
  return {
    ...graphConfig,
    title: {
      text: stationName
    },
    ...dateTimeAxis,
    yAxis: {
      title: {
        text: param
      }
    }
  };
};

export const multiStation = (loadedStations, param) => {
  return {
    title: {
      text: names[param].text + getUnit(param)
    }
  };
};

export const boxPlotOptions = {};
