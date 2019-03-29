import React from "react"

import Text from "../../../Text"

import "./index.module.css"

const LookingFor = () => (
  <dl>
    <dt styleName="term">
      <Text bold>Product Vision</Text>
    </dt>
    <dd styleName="description">
      <Text>Ideas that solve a clear problem for real users</Text>
    </dd>
    <dt styleName="term">
      <Text bold>Business Strategy</Text>
    </dt>
    <dd styleName="description">
      <Text>With clear goals, aiming for sustainable growth</Text>
    </dd>
    <dt styleName="term">
      <Text bold>Founders & Culture</Text>
    </dt>
    <dd styleName="description">
      <Text>Backed by committed people, with the right values</Text>
    </dd>
  </dl>
)

export default LookingFor
