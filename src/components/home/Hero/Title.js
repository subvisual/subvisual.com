import React, { Component } from "react"

import PageTitle from "../../PageTitle"

import "./Title.module.css"

const Title = () => (
  <PageTitle>
    We nurture{" "}
    <span styleName="ideas">
      ideas
      <span styleName="planet" />
    </span>{" "}
    that empower people
  </PageTitle>
)

export default Title
