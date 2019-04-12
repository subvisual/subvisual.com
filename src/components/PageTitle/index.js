import React from "react"
import classnames from "classnames"

import "./index.module.css"

const PageTitle = ({ children, withTittle }) =>  (
  <h1 styleName={classnames("root", { "with-tittle": withTittle })}>
    {children}
  </h1>
)

export default PageTitle
