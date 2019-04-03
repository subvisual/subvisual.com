import _ from "lodash"
import React, { Component } from "react"
import PropTypes from "prop-types"

import "./index.module.css"

class Planet extends Component {
  constructor(props) {
    super(props)

    this.hoveringAmplitude = _.random(-10, 10)
    console.log(this, this.hoveringAmplitude)
  }

  componentDidMount() {
    this.container.style.setProperty(
      "--hovering-translate-y-end",
      this.hoveringAmplitude
    )
  }

  render() {
    const { color, hovering, size } = this.props
    const hoveringAmplitude = this.hoveringAmplitude

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

Planet.propTypes = {
  hovering: false,
}

export default Planet
