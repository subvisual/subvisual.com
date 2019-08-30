import React from "react"
import PropTypes from "prop-types"

import CallToAction from "../call_to_action"
import Subtitle from "../Subtitle"
import Text from "../Text"
import Title from "../Title"
import HelpingWith from "./ventures_section/HelpingWith"
import LookingFor from "./ventures_section/LookingFor"
import Portfolio from "./ventures_section/Portfolio"
import Universe from "./ventures_section/Universe"

import styles from "./ventures_section.module.css"

const Ventures = ({ planetMorph }) => (
  <section className={styles.root}>
    <div className={styles.content}>
      <header className={styles.header}>
        <Title>Meaningful Ventures</Title>
      </header>
      <section className={[styles.section, styles.lookingFor].join(" ")}>
        <Subtitle>Looking for</Subtitle>
        <LookingFor />
      </section>
      <section className={[styles.section, styles.helpingWith].join(" ")}>
        <Subtitle>Helping with</Subtitle>
        <HelpingWith />
      </section>
      <div className={styles.universe}>
        <Universe subvisualPlanetMorph={planetMorph} />
      </div>
      <section className={[styles.section, styles.portfolio].join(" ")}>
        <header className={styles.portfolioHeader}>
          <Subtitle>Portfolio</Subtitle>
        </header>
        <div className={styles.portfolioContent}>
          <Portfolio planetMorph={planetMorph} />
        </div>
      </section>
      <footer className={styles.footer}>
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
