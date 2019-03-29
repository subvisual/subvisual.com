import React from "react"

import Subtitle from "../../Subtitle"
import Text from "../../Text"
import Team from "../Team"
import Title from "../../Title"

import "./index.module.css"

const AboutSection = () => (
  <section styleName="root">
    <div styleName="content">
      <header styleName="header">
        <Title color="darkBlue">About</Title>
      </header>
      <div styleName="story">
        <section styleName="section">
          <div styleName="title">
            <Subtitle color="white">It started out of friendship</Subtitle>
          </div>
          <p>
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
          <p>
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

export default AboutSection
