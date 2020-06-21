<template>
  <div id="about">
    <sui-container>
      <sui-header size="large" textAlign="center">About RiverDB</sui-header>
      <p>
        RiverDB is a new website helping NGOs and river organizations to display and
        store scientific data from river monitoring programs.
        It draws inspiration from and seeks to improve upon the Surface Water Ambient Monitoring Program's
        water quality database tools. In addition to providing public maps, charts, and tables of our member's data,
        RiverDB aims to optimize the experience of repetitive data entry, report generation, and data quality checking.
      </p>
      <sui-header size="medium">The Team</sui-header>

      <table>
        <tr>
          <td>
            <img class="bio-img" src="img/thomas.png" />
          </td>
          <td>
            <b>Thomas Spellman</b>
            <br />Thomas is a freelance software engineer and has worked with a broad
            range of businesses and non-profits. He's a life-long resident of the Yuba
            Watershed and has dedicated his skills to providing solutions to some of
            the data management challenges that citizen-science monitoring groups
            face on a regular basis. RiverDB is the result of learning from several
            previous designs, this time with a focus on benefiting a much wider range
            of water science organizations.
          </td>
        </tr>

        <tr>
          <td>
            <img class="bio-img" src="img/karl.png" />
          </td>
          <td>
            <b>Karl Ronning</b>
            <br />Karl is a hydrologist for the South Yuba River Citizens League (SYRCL), a
            non-profit organization in Nevada City, CA. SYRCL was founded in 1983 by
            grassroots activists determined to protect the South Yuba River from
            dams and eventually gained Wild and Scenic designation for the river. Karl
            manages SYRCL’s citizen science-based River Monitoring Program in
            addition to studying the impacts from legacy mining and conducting
            hydrological monitoring for SYRCL’s meadow restoration projects. Prior to
            SYRCL, Karl worked alongside the National Weather Service studying fire
            weather, weather forecasting for La Grande Weather Service in Oregon, and serving two years
            of AmeriCorps throughout California and Hawaii.
          </td>
        </tr>
        <tr>
          <td>
            <img class="bio-img" src="img/andreas.jpg" />
          </td>
          <td>
            <b>Andreas Groos</b>
            <br />Andreas is a full-stack software developer. After volunteering for SYRCL's water monitoring program he was happy to help out with building the data visualizations and mapping.
          </td>
        </tr>
      </table>
      <br />
      <br />
    </sui-container>
  </div>
</template>

<script>
export default {
  name: "About",
  metaInfo: {
    title: "About Us"
  }
};
</script>

<style lang="scss" scoped>

#about {
  width: 100%;
}
tr {
  vertical-align:top;
}
.bio-img {
  margin-right: 1rem;
  width: 180px;
}
</style>