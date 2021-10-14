import React from "react"
import PropTypes from "prop-types"

import CallToAction from "~/src/components/call_to_action"
import SectionTitle from "~/src/components/section_title"
import SubsectionTitle from "~/src/components/subsection_title"
import Text from "~/src/components/text"
import HelpingWithSubsection from "./ventures_section/helping_with_subsection"
import LookingForSubsection from "./ventures_section/looking_for_subsection"
import PortfolioSubsection from "./ventures_section/portfolio_subsection"
import Universe from "./ventures_section/universe"

import * as styles from "./ventures_section.module.css"

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
