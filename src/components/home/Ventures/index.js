import React from "react"

import CallToAction from "../../CallToAction"
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
        <dl>
          <dt>Product Vision</dt>
          <dd>Ideas that solve a clear problem for real users</dd>
          <dt>Business Strategy</dt>
          <dd>With clear goals, aiming for sustainable growth</dd>
          <dt>Founders & Culture</dt>
          <dd>Backed by committed people, with the right values</dd>
        </dl>
      </section>
      <section styleName="section rightHalf">
        <header styleName="subheader">
          <Subtitle>Helping with</Subtitle>
        </header>
        <ul>
          <li>Seed investment & incubation</li>
          <li>Strong company culture</li>
          <li>Early stage product mentorship</li>
          <li>Strong international ecosystem</li>
        </ul>
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
