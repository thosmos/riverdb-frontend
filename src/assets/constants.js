export const WS_API_IP = "178.128.68.123";
export const WS_API_PORT = 3010;
export const FLOW_API_IP = WS_API_IP;
export const FLOW_API_PORT = 3020;
export const IMAGE_SIZE = "w_640";
export const CLOUDINARY_URL = `https://res.cloudinary.com/riverdb/image/upload/${IMAGE_SIZE}/v1543968545`;

export const WP_USERS = {
  SYRCL: 2,
  SSI: 3,
  WCCA: 4
};

export const tribStyleWithName = {
  color: "#008080",
  weight: 2
};

export const tribStyleWithoutName = {
  color: "#008080",
  weight: 1
};

export const mainStemStyle = {
  color: "#008080",
  weight: 3
};
export const downstreamStyle = {
  color: "#008080",
  weight: 4
};
export const selectedStreamStyle = {
  color: "#ffcc00",
  weight: 4
};

export const unitsForParams = {
  H2O_Temp: "℃",
  Air_Temp: "℃",
  H2O_Cond: "µS/cm",
  H2O_DO: "mg/L",
  H2O_Turb: "NTU",
  H2O_pH: ""
};

export const parameterInfoObj = {
  H2O_Temp: [
    {
      value: 20,
      color: "grey",
      width: 2,
      label: {
        text: "too warm for salmonids",
        align: "right",
        style: {
          color: "red"
        }
      }
    }
  ],
  H2O_pH: [
    {
      value: 6.5,
      color: "grey",
      width: 2,
      label: {
        text: "very low ph",
        align: "right",
        style: {
          color: "red"
        }
      }
    },
    {
      value: 9,
      color: "grey",
      width: 2,
      label: {
        text: "very high ph",
        align: "right",
        style: {
          color: "red"
        }
      }
    }
  ]
};
