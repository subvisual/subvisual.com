import React from "react"
import PropTypes from "prop-types"

import CallToAction from "src/components/CallToAction"
import SectionTitle from "src/components/SectionTitle"
import SubsectionTitle from "src/components/SubsectionTitle"
import Text from "src/components/Text"
import HelpingWithSubsection from "./VenturesSection/HelpingWithSubsection"
import LookingForSubsection from "./VenturesSection/LookingForSubsection"
import PortfolioSubsection from "./VenturesSection/PortfolioSubsection"
import Universe from "./VenturesSection/Universe"

import styles from "./VenturesSection.module.css"

const VenturesSection = ({ planetMorph }) => (
  <section className={styles.root}>
    <div className={styles.content}>
      <header className={styles.header}>
        <SectionTitle>Meaningful Ventures</SectionTitle>
      </header>
      <section className={[styles.section, styles.lookingFor].join(" ")}>
        <SubsectionTitle>Looking for</SubsectionTitle>
        <LookingForSubsection />
      </section>
      <section className={[styles.section, styles.helpingWith].join(" ")}>
        <SubsectionTitle>Helping with</SubsectionTitle>
        <HelpingWithSubsection />
      </section>
      <div className={styles.universe}>
        <Universe subvisualPlanetMorph={planetMorph} />
      </div>
      <section className={[styles.section, styles.portfolio].join(" ")}>
        <header className={styles.portfolioHeader}>
          <SubsectionTitle>Portfolio</SubsectionTitle>
        </header>
        <div className={styles.portfolioContent}>
          <PortfolioSubsection planetMorph={planetMorph} />
        </div>
      </section>
      <footer className={styles.footer}>
        <p>
          <Text size="large">Join our venture universe.</Text>
          <br />
          <CallToAction size="large">Let&apos;s talk.</CallToAction>
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
