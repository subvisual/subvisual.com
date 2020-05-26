import React from "react"

import SectionTitle from "../section_title"
import SubsectionTitle from "../subsection_title"
import Text from "../text"
import academy from "../../images/careers/academy.svg"

import styles from "./academy_section.module.css"

const AcademySection = () => (
  <section className={styles.root}>
    <div>
      <img className={styles.academy} src={academy} alt="subvisual academy" />
    </div>
    <div className={styles.background} />
    <div className={styles.content}>
      <header className={styles.header}>
        <SectionTitle color="purple">Subvisual Academy</SectionTitle>
      </header>
      <div className={styles.story}>
        <section className={styles.apprenticeship}>
          <div className={styles.title}>
            <SubsectionTitle color="white">Apprenticeship</SubsectionTitle>
          </div>
          <p className={styles.text}>
            <Text>
              By putting people first and never compromising on quality, we were
              able to shape a team culture that will embrace you and your ideas.
            </Text>
          </p>
        </section>
        <section className={styles.summerCamp}>
          <div className={styles.title}>
            <SubsectionTitle color="white">Summer Camp</SubsectionTitle>
          </div>
          <p className={styles.text}>
            <Text>
              We&apos;ll challenge you to think further and help you do the
              heavy lifting of shaping your product&apos;s development.
            </Text>
          </p>
        </section>
      </div>
    </div>
  </section>
)

export default AcademySection
