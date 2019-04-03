import React, { Component } from "react"
import Observer from "react-intersection-observer"

import "./index.module.css"

export default class LoadPlaceholder extends Component {
  state = { loaded: false, visible: false }

  onLoad = () => this.setState({ loaded: true })

  handleChange = isIntersecting => {
    if (!isIntersecting) return

    return this.setState({ visible: true })
  }

  render() {
    const delay = this.props.delay || 0
    const dark = this.props.dark ? "dark" : ""
    const loaded = this.state.loaded ? "loaded" : ""

    return (
      <Observer onChange={this.handleChange}>
        <div styleName="root">
          <div
            style={{ transitionDelay: `${delay}s` }}
            styleName={`placeholder ${dark} ${
              this.state.visible ? loaded : ""
            }`}
          />
          {this.props.children(this.onLoad)}
        </div>
      </Observer>
    )
  }
}
