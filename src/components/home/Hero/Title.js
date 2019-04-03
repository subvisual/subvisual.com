import React from "react"

import PageTitle from "../../PageTitle"
import Planet from "../../Planet"

import "./Title.module.css"

const Title = () => (
  <PageTitle>
    We nurture{" "}
    <span styleName="ideas">
      ideas
      <span styleName="planet">
        <Planet size={12} color="blue" />
      </span>
    </span>{" "}
    that empower people
  </PageTitle>
)

export default Title
