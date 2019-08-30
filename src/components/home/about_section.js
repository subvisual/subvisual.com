import React from "react"
import PropTypes from "prop-types"

import Icon from "./about_section/icon"
import Subtitle from "../Subtitle"
import Text from "../Text"
import Team from "./Team"
import Title from "../Title"

import styles from "./about_section.module.css"

const AboutSection = ({ planetMorph }) => (
  <section className={styles.root}>
    <div className={styles.background} />
    <div className={styles.content}>
      <header className={styles.header}>
        <Title color="purple">About</Title>
        <div className={styles.headerIcon}>
          <Icon
            planetCodeName="aboutHeaderIconPlanet"
            planetMorph={planetMorph}
            color="purple"
          />
        </div>
      </header>
      <div className={styles.story}>
        <section className={styles.section}>
          <div className={styles.title}>
            <Subtitle color="white">It started out of friendship</Subtitle>
          </div>
          <p className={styles.text}>
            <Text color="white">
              By putting people first and never compromising on quality, we were
              able to shape a team culture that will embrace you and your ideas.
            </Text>
          </p>
        </section>
        <section className={styles.section}>
          <div className={styles.title}>
            <Subtitle color="white">And grew with craft</Subtitle>
          </div>
          <p className={styles.text}>
            <Text color="white">
              We'll challenge you to think further and help you do the heavy
              lifting of shaping your product's development.
            </Text>
          </p>
        </section>
      </div>
      <section>
        <div className={styles.title}>
          <Subtitle color="white">Team</Subtitle>
        </div>
        <Team />
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
