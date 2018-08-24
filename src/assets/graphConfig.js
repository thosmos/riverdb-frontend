const graphConfig = {
  chart: {
    type: "boxplot",
    zoomType: 'xy"'
  },
  title: {
    text: "Boxplots"
  },
  legend: {
    enabled: false
  },
  xAxis: {
    // categories: ["1", "2", "3"],
    title: {
      text: "Stations"
    }
  },

  yAxis: {
    title: {
      text: "Temp C"
    }
  },
  plotOptions: {
    series: {
      animation: false
    }
  },
  series: [
    {
      name: "Observations",
      data: [
        // [760, 801, 848, 895, 965],
        // [733, 853, 939, 980, 1080],
        // [714, 762, 817, 870, 918]
      ],
      tooltip: {
        headerFormat: "<em>Station {point.key}</em><br/>"
      }
    }
  ]
};

export default graphConfig;
