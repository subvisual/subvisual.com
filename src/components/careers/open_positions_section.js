import React from "react"

import SectionTitle from "src/components/section_title"

import styles from "./open_positions_section.module.css"
import PositionList from "./open_positions_section/position_list"

const OpenPositionsSection = () => (
  <section className={styles.root}>
    <div className={styles.content}>
      <header className={styles.header}>
        <SectionTitle>Open Positions</SectionTitle>
      </header>

      <div className={styles.listPositions}>
        <PositionList />
      </div>
    </div>
  </section>
)

export default OpenPositionsSection
