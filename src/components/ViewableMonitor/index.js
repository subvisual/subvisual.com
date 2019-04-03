import React, { Component } from "react"
import Observer from "react-intersection-observer"

export default class ViewableMonitor extends Component {
  state = {
    isIntersecting: false,
  }

  handleChange = isIntersecting => {
    this.setState({ isIntersecting })
  }

  render() {
    const { children, ...rest } = this.props

    return (
      <Observer {...rest} onChange={this.handleChange}>
        {children(this.state.isIntersecting)}
      </Observer>
    )
  }
}
