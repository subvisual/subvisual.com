import React from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"

const Stage = ({ children, heroTittle }) => (
  <>
    {children}
    <Planet heroTittle={heroTittle} />
  </>
)

Stage.propTypes = {
  children: PropTypes.node.isRequired,
  heroTittle: PropTypes.object,
}

export default Stage
