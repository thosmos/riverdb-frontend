const organizations = [
  {
    name: "South Yuba River Citizens League",
    abbreviation: "SYRCL",
    URL: "http://yubariver.org/",
    river: "Yuba River",
    logoURL:
      "http://www.friendsoftheriver.org/wp-content/uploads/2016/01/SYRCL-Logo-Name-Color-21-300x300.jpg",
    location: {
      streetName: "313 Railroad Ave",
      city: "Nevada City, CA",
      ZIP: "95959"
    },
    phone: "(530) 265-5961",
    contactPerson: "Kyle McNeil",
    email: "kyle@yubariver.org",
    about: `The South Yuba River Citizens League (SYRCL - pronounced circle) was founded in 1983 by grassroots activists determined to protect the South Yuba River from dams. Ultimately, SYRCL won permanent protections for 39 miles of the South Yuba River under California' s Wild and Scenic Rivers Act.
Today, SYRCL is the central hub of community activism to protect, restore, and celebrate the Yuba River watershed. With over 34 years of achievements, 3,500 members and 1,300 active volunteers, SYRCL is doing great things for the Yuba watershed. We are working to restore wild salmon to their native waters. We are replanting the banks of the Goldfields with trees. We are inspiring activism across the globe with our environmental film festival. Together, we are extending our powerful coalition from the Sierra to the sea.`,
    missionStatement: `SYRCL unites the community to protect and restore the Yuba River. Motivated by our love for this watershed, we advocate powerfully, engage in active stewardship, educate the public, and inspire activism from the Sierra to the sea.`,
    tagLine: `United for the Yuba`,
    projects: [
      {
        title: "River Monitoring",
        dataBegins: `2001`,
        dataEnds: `present`,
        hasData: true,
        description: `SYRCL has a dedicated crew of volunteer river monitors who cover a large number of sites every month`
      }
      // {
      //   title: "Meadow Restoration",
      //   dataBegins: `2015`,
      //   dataEnds: `present`,
      //   hasData: false
      // },

      // {
      //   title: "Lower Yuba Restoration",
      //   dataBegins: `2004`,
      //   dataEnds: `present`,
      //   hasData: false
      // }
    ]
  },
  {
    name: "Sierra Streams Institute",
    abbreviation: "SSI",
    URL: "https://sierrastreamsinstitute.org/",
    river: "Deer Creek",
    logoURL: "https://res.cloudinary.com/riverdb/image/upload/v1580932695/SSI/SSI-logo.jpg",
    location: {
      streetName: "13075 Woolman Lane",
      city: "Nevada City, CA",
      ZIP: "95959"
    },
    phone: "530-477-7132 ext. 205",
    contactPerson: "Chloe Tremper",
    email: "chloe@sierrastreamsinstitute.org",
    about: `Sierra Streams Institute is a watershed monitoring, research, and restoration group based in Nevada City, 
    California, in the Sierra Nevada foothills. Our mission is to link water, science and people for the benefit of 
    human and environmental health. 
    
    Our volunteers are the backbone of our decades long and year
    round water quality monitoring programs on Deer Creek and Bear River. We
    provide the young and old within our community resources to become lifelong
    environmental stewards.`,
    missionStatement: `SSI's staff of scientists and dedicated community of citizen scientist
    volunteers work to monitor, restore, and research watersheds throughout the
    Sierra.`,
    tagLine: ``,
    projects: [
      {
        title: "Deer Creek Monitoring",
        dataBegins: `2005`,
        dataEnds: `present`,
        hasData: true,
        description: `Volunteers monitor many places along Deer Creek once per month`
      }
      // {
      //   title: "Benthic Macroinvertebrate Populations",
      //   dataBegins: `2007`,
      //   dataEnds: `2014`,
      //   hasData: false
      // }
    ]
  },
  {
    name: "Wolf Creek Community Alliance",
    abbreviation: "WCCA",
    URL: "http://www.wolfcreekalliance.org/",
    river: "Wolf Creek",
    logoURL:
      "http://www.wolfcreekalliance.org/image/wolf_banner_gray_670x250.png",
    location: {
      streetName: "P.O. Box 477",
      city: "Grass Valley, CA",
      ZIP: "95959"
    },
    phone: "(530) 272-2347",
    contactPerson: "Josie Crawford",
    email: "wolf@wolfcreekalliance.org",
    about: `WCCA exists to: 1) preserve and protect Wolf Creek and its watershed for the benefit of present and future generations; 2) engender community stewardship of the creek and its watershed; 3) restore the creek to a condition of optimal health and integrity; 4) monitor the physical, chemical, and biological condition of the creek; 5) thrive as an organization and thereby have a long-lasting presence and beneficial impact in the watershed.`,
    missionStatement: `WCCA is the only local group whose activities are focused primarily on cleaning up Wolf Creek and restoring this neglected community resource to a condition of optimal health and integrity.`,
    tagLine: `Imagine... a healthy, vibrant watershed.`,
    projects: [
      {
        title: "River Monitoring",
        dataBegins: `2007`,
        dataEnds: `2014`,
        hasData: true,
        description: ``
      }
      // {
      //   title: "Heavy Metal Testing",
      //   dataBegins: `2007`,
      //   dataEnds: `2014`,
      //   hasData: false
      // }
    ]
  }
];

export default organizations;
