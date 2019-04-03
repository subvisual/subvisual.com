import _ from "lodash"
import React, { Component } from "react"
import PropTypes from "prop-types"

import "./index.module.css"

class Planet extends Component {
  constructor(props) {
    super(props)

    this.hoveringAmplitude = _.random(-10, 10)
    this.hoveringDuration = _.round(_.random(0.5, 1.5), 2)
  }

  render() {
    const { color, hovering } = this.props
    const style = {
      "--hovering-translate-y-end": this.hoveringAmplitude,
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
