import React from "react"

import ViewableMonitor from "../ViewableMonitor"

import styles from "./viewable_monitor.module.css"

const PlanetViewableMonitor = ({ children }) => (
  <ViewableMonitor className={styles.root}>
    {isViewable => {
      if (!isViewable) return <div />

      return children
    }}
  </ViewableMonitor>
)

export default PlanetViewableMonitor
