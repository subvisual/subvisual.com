import React from "react"

import CallToAction from "../../CallToAction"
import HelpingWith from "./HelpingWith"
import LookingFor from "./LookingFor"
import Portfolio from "./Portfolio"
import Subtitle from "../../Subtitle"
import Text from "../../Text"
import Title from "../../Title"

import "./index.module.css"

const Ventures = () => (
  <section styleName="root">
    <div styleName="content">
      <header styleName="header">
        <Title>Meaningful Ventures</Title>
      </header>
      <section styleName="section rightHalf">
        <header styleName="subheader">
          <Subtitle>Looking for</Subtitle>
        </header>
        <LookingFor />
      </section>
      <section styleName="section rightHalf">
        <header styleName="subheader">
          <Subtitle>Helping with</Subtitle>
        </header>
        <HelpingWith />
      </section>
      <section styleName="section rightHalf">
        <header styleName="subheader">
          <Subtitle>Portfolio</Subtitle>
        </header>
        <Portfolio />
      </section>
      <footer styleName="footer rightHalf">
        <p>
          <Text size="large">Join our venture universe.</Text>
          <br />
          <CallToAction size="large">Let's talk</CallToAction>
        </p>
      </footer>
    </div>
  </section>
)

export default Ventures
