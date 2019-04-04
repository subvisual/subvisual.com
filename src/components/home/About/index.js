import React from "react"
import PropTypes from "prop-types"

import Icon from "../../Icon"
import Subtitle from "../../Subtitle"
import Text from "../../Text"
import Team from "../Team"
import Title from "../../Title"

import "./index.module.css"

const About = ({ planetMorph }) => (
  <section styleName="root">
    <div styleName="background" />
    <div styleName="content">
      <header styleName="header">
        <Title color="purple">About</Title>
        <div styleName="headerIcon">
          <Icon
            planetCodeName="aboutHeaderIconPlanet"
            planetMorph={planetMorph}
            color="purple"
          />
        </div>
      </header>
      <div styleName="story">
        <section styleName="section">
          <div styleName="title">
            <Subtitle color="white">It started out of friendship</Subtitle>
          </div>
          <p styleName="text">
            <Text color="white">
              By putting people first and never compromising on quality, we were
              able to shape a team culture that will embrace you and your ideas.
            </Text>
          </p>
        </section>
        <section styleName="section">
          <div styleName="title">
            <Subtitle color="white">And grew with craft</Subtitle>
          </div>
          <p styleName="text">
            <Text color="white">
              We'll challenge you to think further and help you do the heavy
              lifting of shaping your product's development.
            </Text>
          </p>
        </section>
      </div>
      <section>
        <div styleName="title">
          <Subtitle color="white">Team</Subtitle>
        </div>
        <Team />
      </section>
    </div>
  </section>
)

About.propTypes = {
  planetMorph: PropTypes.func,
}

About.defaultProps = {
  planetMorph: () => {},
}

export default About
