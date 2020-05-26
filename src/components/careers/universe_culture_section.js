import React from "react"

import SectionTitle from "src/components/section_title"
import Text from "src/components/text"

import styles from "./universe_culture_section.module.css"

const UniverseCultureSection = () => (
  <section className={styles.root}>
    <div className={styles.content}>
      <header className={styles.header}>
        <SectionTitle>Universe Culture</SectionTitle>
      </header>

      <div>
        <p>
          <Text>
            We are a group of people from different companies with a shared
            culture
          </Text>
        </p>
      </div>
    </div>
  </section>
)

export default UniverseCultureSection
