import React from "react"
import PropTypes from "prop-types"

import CallToAction from "../call_to_action"
import Subtitle from "../Subtitle"
import Text from "../Text"
import Title from "../Title"
import HelpingWithSubsection from "./ventures_section/helping_with_subsection"
import LookingForSubsection from "./ventures_section/looking_for_subsection"
import PortfolioSubsection from "./ventures_section/portfolio_subsection"
import Universe from "./ventures_section/Universe"

import styles from "./ventures_section.module.css"

const VenturesSection = ({ planetMorph }) => (
  <section className={styles.root}>
    <div className={styles.content}>
      <header className={styles.header}>
        <Title>Meaningful Ventures</Title>
      </header>
      <section className={[styles.section, styles.lookingFor].join(" ")}>
        <Subtitle>Looking for</Subtitle>
        <LookingForSubsection />
      </section>
      <section className={[styles.section, styles.helpingWith].join(" ")}>
        <Subtitle>Helping with</Subtitle>
        <HelpingWithSubsection />
      </section>
      <div className={styles.universe}>
        <Universe subvisualPlanetMorph={planetMorph} />
      </div>
      <section className={[styles.section, styles.portfolio].join(" ")}>
        <header className={styles.portfolioHeader}>
          <Subtitle>Portfolio</Subtitle>
        </header>
        <div className={styles.portfolioContent}>
          <PortfolioSubsection planetMorph={planetMorph} />
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

VenturesSection.propTypes = {
  planetMorph: PropTypes.func,
}

VenturesSection.defaultProps = {
  planetMorph: () => {},
}

export default VenturesSection
