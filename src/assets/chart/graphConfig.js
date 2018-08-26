import { palette1 } from "./palettes.js";

const graphConfig = {
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

const yAxis = label => {
  return {
    yAxis: {
      title: {
        text: label
      }
    }
  };
};

const splinePlotOptions = {
  plotOptions: {
    spline: {
      marker: {
        enabled: true,
        radius: 3
      }
    },
    series: { animation: false }
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
