import _ from "lodash"
import React, { Component } from "react"
import PropTypes from "prop-types"

import "./index.module.css"

class Planet extends Component {
  constructor(props) {
    super(props)

    this.hoveringAmplitude = _.random(-10, 10)
    this.hoveringDelay = _.random(0, 3)
    this.hoveringDuration = _.random(0.8, 1.8)
  }

  render() {
    const { color, hovering } = this.props
    const style = {
      "--hovering-translate-y-end": this.hoveringAmplitude,
      "--hovering-delay": this.hoveringDelay,
      "--hovering-duration": this.hoveringDuration,
      "--size": this.props.size,
    }

    return (
      <div
        style={style}
        styleName={`root ${color} ${hovering ? "hovering" : ""}`}
      />
    )
  }
}

Planet.propTypes = {
  color: PropTypes.string.isRequired,
  hovering: PropTypes.bool,
  size: PropTypes.number.isRequired,
}

Planet.defaultProps = {
  hovering: false,
}

export default Planet
