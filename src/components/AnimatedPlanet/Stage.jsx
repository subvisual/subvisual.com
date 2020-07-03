import React from "react"
import PropTypes from "prop-types"

import Planet from "./Planet"

const Stage = ({ heroTittle, render }) => (
  <>
    {render()}
    <Planet heroTittle={heroTittle} />
  </>
)

Stage.propTypes = {
  heroTittle: PropTypes.object,
  render: PropTypes.func.isRequired,
}

export default Stage
