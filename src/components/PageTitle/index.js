import React from "react"
import classnames from "classnames"

import "./index.module.css"

const PageTitle = ({ children, regularFont }) => (
  <h1 styleName={classnames("root", { "regular-font": regularFont })}>
    {children}
  </h1>
)

export default PageTitle
