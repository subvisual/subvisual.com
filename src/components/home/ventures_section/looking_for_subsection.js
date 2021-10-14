import React from "react"

import Text from "~/src/components/text"

import * as styles from "./looking_for_subsection.module.css"

const LookingForSubsection = () => (
  <dl>
    <dt>
      <Text bold>Product Vision</Text>
    </dt>
    <dd className={styles.description}>
      <Text>Ideas that solve a clear problem for real users</Text>
    </dd>
    <dt>
      <Text bold>Business Strategy</Text>
    </dt>
    <dd className={styles.description}>
      <Text>With clear goals, aiming for sustainable growth</Text>
    </dd>
    <dt>
      <Text bold>Founders & Culture</Text>
    </dt>
    <dd className={styles.description}>
      <Text>Backed by committed people, with the right values</Text>
    </dd>
  </dl>
)

export default LookingForSubsection
