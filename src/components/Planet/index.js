import _ from "lodash"
import React, { Component } from "react"
import PropTypes from "prop-types"

import "./index.module.css"

class Planet extends Component {
  constructor(props) {
    super(props)

    this.hoveringAmplitude = _.random(-10, 10)
    this.hoveringDuration = _.random(0.5, 1.5)
  }

  componentDidMount() {
    this.container.style.setProperty(
      "--hovering-translate-y-end",
      this.hoveringAmplitude
    )
    this.container.style.setProperty(
      "--hovering-duration",
      this.hoveringDuration
    )
  }

  render() {
    console.log(this.props)
    const { color, hovering, size } = this.props

    return (
      <div
        ref={el => (this.container = el)}
        style={{ transform: `scale(${size / 100})` }}
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
