import React from "react"

import Subtitle from "../../subtitle"
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
            <Subtitle white>It started out of friendship</Subtitle>
          </div>
          <p styleName="p">
            <Text color="white">
              Subvisual was born out of friendship, with the ambition to become
              a company we'd love to work in.
            </Text>
          </p>
          <p styleName="p">
            <Text color="white">
              By putting people first and never compromising on quality, we were
              able to shape a team culture that will embrace you and nurture
              your ideas to fruition.
            </Text>
          </p>
        </section>
        <section styleName="section">
          <div styleName="title">
            <Subtitle white>And grew with craft</Subtitle>
          </div>
          <p styleName="p">
            <Text color="white">
              We're a small, but powerful team, that can help you make informed
              decisions throughout the process of building a digital product.
            </Text>
          </p>
          <p styleName="p">
            <Text color="white">
              We'll challenge you to think further and help you do the heavy
              lifting of shaping your product's development.
            </Text>
          </p>
        </section>
      </div>
      <section>
        <div styleName="title">
          <Subtitle white>Team</Subtitle>
        </div>
        <Team />
      </section>
    </div>
  </section>
)

export default AboutSection
