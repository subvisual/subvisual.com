import React from "react"
import PropTypes from "prop-types"

import Icon from "./about_section/icon"
import SectionTitle from "~/src/components/section_title"
import SubsectionTitle from "~/src/components/subsection_title"
import TeamSubsection from "./about_section/team_subsection"
import Text from "~/src/components/text"

import * as styles from "./about_section.module.css"

const AboutSection = ({ planetMorph }) => (
  <section className={styles.root}>
    <div className={styles.background} />
    <div className={styles.content}>
      <header className={styles.header}>
        <SectionTitle color="purple">About</SectionTitle>
        <div className={styles.headerIcon}>
          <Icon planetMorph={planetMorph} color="purple" />
        </div>
      </header>
      <div className={styles.story}>
        <section className={styles.section}>
          <div className={styles.title}>
            <SubsectionTitle color="white">
              It started out of friendship
            </SubsectionTitle>
          </div>
          <p className={styles.text}>
            <Text>
              By putting people first and never compromising on quality, we were
              able to shape a team culture that will embrace you and your ideas.
            </Text>
          </p>
        </section>
        <section className={styles.section}>
          <div className={styles.title}>
            <SubsectionTitle color="white">And grew with craft</SubsectionTitle>
          </div>
          <p className={styles.text}>
            <Text>
              We&apos;ll challenge you to think further and help you do the
              heavy lifting of shaping your product&apos;s development.
            </Text>
          </p>
        </section>
      </div>
      <section>
        <div className={styles.title}>
          <SubsectionTitle color="white">Team</SubsectionTitle>
        </div>
        <TeamSubsection />
      </section>
    </div>
  </section>
)

AboutSection.propTypes = {
  planetMorph: PropTypes.func,
}

AboutSection.defaultProps = {
  planetMorph: () => {},
}

export default AboutSection
