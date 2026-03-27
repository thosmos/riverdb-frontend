import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import './About.scss'

const About = () => {
  return (
    <div id="about">
      <Container>
        <Header size="medium">The Team</Header>

        <table>
          <tbody>
            <tr>
              <td>
                <img className="bio-img" src="/img/thomas.png" alt="Thomas Spellman" />
              </td>
              <td>
                <b>Thomas Spellman</b>
                <br /> Thomas is a freelance software engineer and has worked with a broad range of businesses and non-profits. He's a life-long resident of the Yuba Watershed and has dedicated his skills to providing solutions to some of the data management challenges that citizen-science monitoring groups face on a regular basis. RiverDB is the result of learning from several previous designs, this time with a focus on benefiting a much wider range of water science organizations.
              </td>
            </tr>

            <tr>
              <td>
                <img className="bio-img" src="/img/karl.png" alt="Karl Ronning" />
              </td>
              <td>
                <b>Karl Ronning</b>
                <br /> Karl is a hydrologist for the South Yuba River Citizens League (SYRCL), a non-profit organization in Nevada City, CA. SYRCL was founded in 1983 by grassroots activists determined to protect the South Yuba River from dams and eventually gained Wild and Scenic designation for the river. Karl manages SYRCL’s citizen science-based River Monitoring Program in addition to studying the impacts from legacy mining and conducting hydrological monitoring for SYRCL’s meadow restoration projects. Prior to SYRCL, Karl worked alongside the National Weather Service studying fire weather, weather forecasting for La Grande Weather Service in Oregon, and serving two years of AmeriCorps throughout California and Hawaii.
              </td>
            </tr>
            <tr>
              <td>
                <img className="bio-img bio-border" src="/img/andreas.jpg" alt="Andreas Groos" />
              </td>
              <td>
                <b>Andreas Groos</b>
                <br /> Andreas is a full-stack software developer. After volunteering for SYRCL's water monitoring program he was happy to help out with building the data visualizations and mapping.
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
      </Container>
    </div>
  )
}

export default About
