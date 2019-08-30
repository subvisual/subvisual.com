import React from "react"
import PropTypes from "prop-types"

import CallToAction from "../../call_to_action"
import HelpingWith from "./HelpingWith"
import LookingFor from "./LookingFor"
import Portfolio from "./Portfolio"
import Subtitle from "../../Subtitle"
import Text from "../../Text"
import Title from "../../Title"
import Universe from "./Universe"

import "./index.module.css"

const Ventures = ({ planetMorph }) => (
  <section styleName="root">
    <div styleName="content">
      <header styleName="header">
        <Title>Meaningful Ventures</Title>
      </header>
      <section styleName="section lookingFor">
        <Subtitle>Looking for</Subtitle>
        <LookingFor />
      </section>
      <section styleName="section helpingWith">
        <Subtitle>Helping with</Subtitle>
        <HelpingWith />
      </section>
      <div styleName="universe">
        <Universe subvisualPlanetMorph={planetMorph} />
      </div>
      <section styleName="section portfolio">
        <header styleName="portfolioHeader">
          <Subtitle>Portfolio</Subtitle>
        </header>
        <div styleName="portfolioContent">
          <Portfolio planetMorph={planetMorph} />
        </div>
      </section>
      <footer styleName="footer">
        <p>
          <Text size="large">Join our venture universe.</Text>
          <br />
          <CallToAction size="large">Let's talk.</CallToAction>
        </p>
      </footer>
    </div>
  </section>
)

Ventures.propTypes = {
  planetMorph: PropTypes.func,
}

Ventures.defaultProps = {
  planetMorph: () => {},
}

export default Ventures
